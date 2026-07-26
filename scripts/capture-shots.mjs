// Capture real screenshots of live project sites for the portfolio.
//
// Run manually — never in the build. It hits the public internet, so it is
// slow and flaky by nature; the committed .webp files are the build input.
//
//   node scripts/capture-shots.mjs             # all projects
//   node scripts/capture-shots.mjs kinship     # one project (by key)
//
// Uses the locally installed Google Chrome (channel: "chrome") so no extra
// browser download is needed; falls back to Playwright's own chromium.

import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public/assets/images/work");

// Portfolio images are rendered at 1200x819 (see portfolio-card.jsx and
// work-view.jsx). Shoot at 1.2x that in the same aspect ratio, then downscale —
// keeps text crisp without shipping a 2x payload.
const OUT = { width: 1200, height: 819 };
const VIEWPORT = { width: 1440, height: 983 };

// One entry per portfolio item. A project can span several hosts — the UK
// Parliament work covers three separate estate sites.
const projects = {
  parliament: [
    ["parliament-cover", "https://www.ukparliamentweek.org/en/"],
    ["parliament-1", "https://www.ukparliamentweek.org/en/resources/"],
    ["parliament-2", "https://learning.parliament.uk/en/"],
    // pds.blog.parliament.uk answers 403 even to a real window — its WAF is
    // stricter than the rest of the estate. Using the UKPW about page instead.
    ["parliament-3", "https://www.ukparliamentweek.org/en/about/"],
  ],
  fitzwilliam: [
    ["fitzwilliam-cover", "https://fitzmuseum.cam.ac.uk/"],
    ["fitzwilliam-1", "https://fitzmuseum.cam.ac.uk/plan-your-visit"],
    ["fitzwilliam-2", "https://fitzmuseum.cam.ac.uk/plan-your-visit/exhibitions"],
    ["fitzwilliam-3", "https://fitzmuseum.cam.ac.uk/support-us"],
  ],
  kinship: [
    ["kinship-cover", "https://kinship.org.uk/"],
    ["kinship-1", "https://kinship.org.uk/support-and-advice/"],
    ["kinship-2", "https://kinship.org.uk/our-work-and-impact/our-impact/"],
    ["kinship-3", "https://kinship.org.uk/get-involved/"],
  ],
  hs2: [
    ["hs2-cover", "https://www.hs2.org.uk/"],
    ["hs2-1", "https://www.hs2.org.uk/about-us/"],
    ["hs2-2", "https://www.hs2.org.uk/benefits/"],
    // Everything past the safety hub's front page is behind a login wall.
    ["hs2-3", "https://safety.hs2.org.uk/"],
  ],
  syrris: [
    ["syrris-cover", "https://www.syrris.com/"],
    ["syrris-1", "https://www.syrris.com/products/"],
    ["syrris-2", "https://www.syrris.com/applications/"],
    ["syrris-3", "https://www.syrris.com/about-us/"],
  ],
  barcham: [
    ["barcham-cover", "https://www.barcham.co.uk/"],
    // /trees redirects into a guide article and /carbon-calculator is a dated
    // third-party embed — the shop is the actual work worth showing.
    ["barcham-1", "https://www.barcham.co.uk/store/"],
    ["barcham-2", "https://www.barcham.co.uk/store/products/betula-ermanii"],
    ["barcham-3", "https://www.barcham.co.uk/store/accessories"],
  ],
};

// Cookie banners are the single biggest wrecker of marketing-site screenshots.
// Click the accept control if one shows up, then give the overlay time to leave.
const ACCEPT_PATTERNS = [
  /accept additional cookies/i, // GOV.UK / parliament.uk house style
  /accept all/i,
  /allow all/i,
  /accept cookies/i,
  /accept analytics/i,
  /^accept$/i,
  /^i agree$/i,
  /^got it$/i,
];

async function dismissCookieBanner(page) {
  for (const pattern of ACCEPT_PATTERNS) {
    // Some banners use links, not buttons — try both roles.
    for (const role of ["button", "link"]) {
      const control = page.getByRole(role, { name: pattern }).first();
      try {
        if (await control.isVisible({ timeout: 800 })) {
          await control.click({ timeout: 2000 });
          await page.waitForTimeout(600);
          return true;
        }
      } catch {
        // not this pattern — try the next
      }
    }
  }
  return false;
}

// Accepting often swaps the banner for a "you've accepted cookies" bar, and
// support-chat bubbles sit on top of the content. Neither belongs in a
// portfolio shot, so hide the usual suspects outright.
const HIDE_SELECTORS = [
  '[class*="cookie" i]',
  '[id*="cookie" i]',
  '[class*="consent" i]',
  '[id*="consent" i]',
  "#onetrust-banner-sdk",
  "#CybotCookiebotDialog",
  "#hs-eu-cookie-confirmation",
  "#intercom-container",
  ".intercom-lightweight-app",
  "#drift-widget",
  "#tawkchat-container",
  "#launcher", // Zendesk
  "#hubspot-messages-iframe-container",
  '[id*="livechat" i]',
  '[class*="chat-widget" i]',
];

// Sites lazy-load below the fold and animate on scroll. Walk down the page to
// trigger everything, then return to the top so the shot is deterministic.
async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
  // Lazy images that are still in flight leave holes in the shot.
  await page
    .waitForFunction(
      () => Array.from(document.images).every((img) => img.complete),
      { timeout: 12000 },
    )
    .catch(() => {});
  // Kill CSS animation/transition jitter before the shutter, and drop the
  // consent/chat furniture.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
${HIDE_SELECTORS.join(",")}{display:none!important}`,
  });

  // Chat bubbles and accessibility toolbars are usually injected by a script
  // with generated class names, so selectors can't catch them. Their shape is
  // the tell: fixed, small, pinned to a bottom corner. Hide anything matching.
  await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    for (const el of document.body.querySelectorAll("*")) {
      const style = getComputedStyle(el);
      if (style.position !== "fixed" || style.display === "none") continue;
      const box = el.getBoundingClientRect();
      const smallEnough = box.width < vw * 0.45 && box.height < vh * 0.35;
      const nearBottom = box.bottom > vh - 40;
      if (smallEnough && nearBottom && box.width > 0) {
        el.style.setProperty("display", "none", "important");
      }
    }
  });
}

// Headed by default: parliament.uk's WAF answers headless Chrome with a flat
// 403, and a real window sails through. A visible browser is fine for a script
// you run by hand. HEADLESS=1 to override.
const headless = process.env.HEADLESS === "1";

async function launch() {
  try {
    return await chromium.launch({ channel: "chrome", headless });
  } catch {
    return await chromium.launch({ headless });
  }
}

const keys = process.argv.slice(2);
const selected = keys.length ? keys : Object.keys(projects);

for (const key of selected) {
  if (!projects[key]) {
    console.error(`unknown project: ${key}`);
    process.exitCode = 1;
  }
}

mkdirSync(outDir, { recursive: true });

const browser = await launch();
const context = await browser.newContext({
  viewport: VIEWPORT,
  deviceScaleFactor: 2,
  colorScheme: "light",
  reducedMotion: "reduce",
  locale: "en-GB",
});

for (const key of selected) {
  const project = projects[key];
  if (!project) continue;

  const page = await context.newPage();
  // Cookie consent is per-origin, so re-run the dismiss when the host changes.
  let dismissedHost = null;

  for (const [index, [name, url]] of project.entries()) {
    // WAFs (the parliament.uk estate especially) throttle back-to-back
    // navigations with a 403. Pace the requests instead of hammering.
    if (index > 0) await page.waitForTimeout(4000);
    try {
      // domcontentloaded, not networkidle: big public sites keep analytics and
      // long-poll sockets open forever, so networkidle never fires. settle()
      // below does the real waiting.
      const load = async () => {
        const response = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 45000,
        });
        await page
          .waitForLoadState("load", { timeout: 15000 })
          .catch(() => {}); // late third-party asset — the page is usable anyway
        return response?.status() ?? 0;
      };

      let status = await load();
      if (status === 403 || status === 429) {
        await page.waitForTimeout(12000); // one backoff retry, then give up
        status = await load();
      }
      if (status >= 400) {
        console.error(`skip ${name}: ${status} ${url}`);
        continue;
      }

      const host = new URL(url).host;
      if (dismissedHost !== host) {
        if (await dismissCookieBanner(page)) dismissedHost = host;
      }
      await settle(page);

      const png = await page.screenshot({ type: "png" });
      const file = join(outDir, `${name}.webp`);
      await sharp(png)
        .resize(OUT.width, OUT.height, { fit: "cover", position: "top" })
        .webp({ quality: 82 })
        .toFile(file);

      console.log(`${name}.webp <- ${url}`);
    } catch (error) {
      console.error(`skip ${name}: ${error.message.split("\n")[0]}`);
    }
  }

  await page.close();
}

await context.close();
await browser.close();
