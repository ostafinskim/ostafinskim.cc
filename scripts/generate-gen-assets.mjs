import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, "public/assets/images/gen");

// One palette per hue family — the base gradient covers most of the image,
// so bases must differ in hue (not just accent) or everything reads as
// "blue blob with a neon splash".
const palettes = {
  cobaltLime: {
    base: "#0647ff",
    accent: "#ccff00",
  },
  heroBlueCyan: {
    base: "#073bff",
    accent: "#00e5ff",
  },
  sunsetCoral: {
    base: "#ff4d24",
    accent: "#ffd166",
  },
  grapePink: {
    base: "#7209b7",
    accent: "#f72585",
  },
  forestMint: {
    base: "#00875a",
    accent: "#a7ff83",
  },
  tealSand: {
    base: "#00a896",
    accent: "#f0f3bd",
  },
  crimsonRose: {
    base: "#d90429",
    accent: "#ffb3c1",
  },
  amberInk: {
    base: "#ff9f1c",
    accent: "#3a2004",
  },
  midnightAqua: {
    base: "#14213d",
    accent: "#00f5d4",
  },
  limeDeep: {
    base: "#9ef01a",
    accent: "#007f5f",
  },
  magentaGold: {
    base: "#b5179e",
    accent: "#ffd60a",
  },
  slateIce: {
    base: "#3d5a80",
    accent: "#e0fbfc",
  },
};

const assets = [
  ["hero.svg", 1600, 900, "heroBlueCyan", 0, "hero"],
  ["about.svg", 800, 1095, "sunsetCoral", 7],
  ["work-1.svg", 1200, 819, "grapePink", 13],
  ["work-2.svg", 1200, 819, "forestMint", 21],
  ["work-3.svg", 1200, 819, "crimsonRose", 34],
  ["blog.svg", 1200, 819, "tealSand", 55],
  ["blog-1.svg", 1200, 819, "cobaltLime", 2584],
  ["blog-2.svg", 1200, 819, "sunsetCoral", 4181],
  ["blog-3.svg", 1200, 819, "amberInk", 6765],
  ["blog-4.svg", 1200, 819, "forestMint", 10946],
  ["blog-5.svg", 1200, 819, "limeDeep", 17711],
  ["blog-6.svg", 1200, 819, "magentaGold", 28657],
  ["blog-7.svg", 1200, 819, "midnightAqua", 46368],
  ["bg-1.svg", 1600, 900, "slateIce", 89],
  ["bg-2.svg", 1600, 900, "midnightAqua", 144],
  ["bg-3.svg", 1600, 900, "grapePink", 233],
  ["shot-1.svg", 1200, 819, "tealSand", 377],
  ["shot-2.svg", 1200, 819, "crimsonRose", 610],
  ["shot-3.svg", 1200, 819, "limeDeep", 987],
  ["shot-4.svg", 1200, 819, "magentaGold", 1597],
];

function mulberry32(seed) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pct(value) {
  return `${value.toFixed(1)}%`;
}

// SMIL drift in the style of 21st.dev's SvgBlobAnimation: attribute eases
// there-and-back through a material spline. Runs inside <img>/background-image
// where CSS/JS animation cannot.
const SPLINE =
  'keyTimes="0;0.5;1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" repeatCount="indefinite"';

function drift(attr, from, to, dur) {
  return `<animate attributeName="${attr}" dur="${dur.toFixed(1)}s" values="${from};${to};${from}" ${SPLINE}/>`;
}

// Guaranteed-visible offset: 18–45% either direction, never a sub-pixel drift.
function swing(rand) {
  return (18 + rand() * 27) * (rand() < 0.5 ? -1 : 1);
}

// `animated: false` blobs render once under the expensive warp filter;
// animated ones must stay OUTSIDE any filter or the browser re-runs
// displacement+blur over the full raster every frame (the CPU killer).
function blob(id, color, rand, index, animated) {
  const cx = 4 + rand() * 92;
  const cy = 4 + rand() * 92;
  const r = 38 + rand() * 38;
  const solid = 0.18 + rand() * 0.1;
  const dx = swing(rand);
  const dy = swing(rand);
  const dur = 14 + rand() * 12;
  const animates = animated
    ? `
      ${drift("cx", pct(cx), pct(cx + dx), dur)}
      ${drift("cy", pct(cy), pct(cy + dy), dur * (0.8 + rand() * 0.5))}`
    : "";
  return `<radialGradient id="${id}_${index}" cx="${pct(cx)}" cy="${pct(cy)}" r="${pct(r)}">${animates}
      <stop offset="0" stop-color="${color}" stop-opacity="1"/>
      <stop offset="${solid.toFixed(2)}" stop-color="${color}" stop-opacity="0.86"/>
      <stop offset="0.78" stop-color="${color}" stop-opacity="0"/>
    </radialGradient>`;
}

function heroSvg({ name, width, height, paletteName, seed }) {
  const palette = palettes[paletteName];
  const id = name.replace(/[^a-z0-9]/gi, "");
  const rand = mulberry32(seed + 1);
  const edgeDrift = (cx, cy, r) => {
    const dur = 10 + rand() * 8;
    return [
      drift("cx", pct(cx), pct(cx + swing(rand) * 0.6), dur),
      drift("cy", pct(cy), pct(cy + swing(rand) * 0.6), dur * (0.8 + rand() * 0.5)),
      drift("r", pct(r), pct(r * (0.72 + rand() * 0.5)), dur * (1.1 + rand() * 0.5)),
    ].join("\n      ");
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="base${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0714b8"/>
      <stop offset="0.38" stop-color="${palette.base}"/>
      <stop offset="1" stop-color="#03106d"/>
    </linearGradient>
    <radialGradient id="edgeA${id}" cx="92%" cy="18%" r="48%">
      ${edgeDrift(92, 18, 48)}
      <stop offset="0" stop-color="${palette.accent}" stop-opacity="0.95"/>
      <stop offset="0.38" stop-color="${palette.accent}" stop-opacity="0.48"/>
      <stop offset="0.82" stop-color="${palette.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="edgeB${id}" cx="5%" cy="84%" r="52%">
      ${edgeDrift(5, 84, 52)}
      <stop offset="0" stop-color="${palette.accent}" stop-opacity="0.82"/>
      <stop offset="0.34" stop-color="${palette.accent}" stop-opacity="0.36"/>
      <stop offset="0.82" stop-color="${palette.accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="edgeC${id}" cx="84%" cy="91%" r="34%">
      ${edgeDrift(84, 91, 34)}
      <stop offset="0" stop-color="${palette.base}" stop-opacity="1"/>
      <stop offset="0.74" stop-color="${palette.base}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="read${id}" cx="50%" cy="50%" r="38%">
      <stop offset="0" stop-color="#050a36" stop-opacity="0.46"/>
      <stop offset="0.58" stop-color="#050a36" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#050a36" stop-opacity="0"/>
    </radialGradient>
    <filter id="grain${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="3" stitchTiles="stitch" seed="${seed}" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.38"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#base${id})"/>
  <rect width="${width}" height="${height}" fill="url(#edgeA${id})"/>
  <rect width="${width}" height="${height}" fill="url(#edgeB${id})"/>
  <rect width="${width}" height="${height}" fill="url(#edgeC${id})" opacity="0.62"/>
  <rect width="${width}" height="${height}" fill="url(#read${id})"/>
  <rect width="${width}" height="${height}" filter="url(#grain${id})" opacity="0.22"/>
</svg>
`;
}

function svg({ name, width, height, paletteName, seed, variant }) {
  if (variant === "hero") {
    return heroSvg({ name, width, height, paletteName, seed });
  }

  const palette = palettes[paletteName];
  const rand = mulberry32(seed);
  const id = name.replace(/[^a-z0-9]/gi, "");
  const ANIMATED = 2; // blobs 5–6 drift, outside the warp filter
  const gradients = Array.from({ length: 7 }, (_, index) =>
    blob(
      `g${id}`,
      index % 2 === 0 ? palette.accent : palette.base,
      rand,
      index,
      index >= 7 - ANIMATED,
    ),
  ).join("");

  const rect = (index) => {
    const opacity = index < 2 ? 0.94 : 0.72;
    return `<rect width="${width}" height="${height}" fill="url(#g${id}_${index})" opacity="${opacity}"/>`;
  };
  const staticRects = Array.from({ length: 7 - ANIMATED }, (_, i) =>
    rect(i),
  ).join("");
  const animatedRects = Array.from({ length: ANIMATED }, (_, i) =>
    rect(7 - ANIMATED + i),
  ).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="base${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${palette.base}"/>
      <stop offset="0.45" stop-color="${palette.accent}" stop-opacity="0.82"/>
      <stop offset="1" stop-color="${palette.base}"/>
    </linearGradient>
    ${gradients}
    <filter id="warp${id}" x="-12%" y="-12%" width="124%" height="124%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="${seed}" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G"/>
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    <filter id="grain${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.42"/>
      </feComponentTransfer>
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#base${id})"/>
  <g filter="url(#warp${id})">${staticRects}</g>
  ${animatedRects}
  <rect width="${width}" height="${height}" fill="${palette.accent}" opacity="0.08"/>
  <rect width="${width}" height="${height}" filter="url(#grain${id})" opacity="0.28"/>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

for (const [name, width, height, paletteName, seed, variant] of assets) {
  writeFileSync(
    join(outDir, name),
    svg({ name, width, height, paletteName, seed, variant }),
  );
}
