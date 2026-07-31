import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

// Shared OG image renderer. Every opengraph-image route calls this so the
// social cards stay visually consistent. Output is a 1200x630 PNG — the format
// social scrapers (Facebook, LinkedIn, X) actually render (SVG is ignored).
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Satori (next/og) has no built-in fonts, so every glyph must resolve to a
// supplied font. Clash Display (the site's heading font) carries the body text;
// Fascinate Inline renders the "M" mark, matching the site logo (.logo-mark).
const fontPath = (p) => path.join(process.cwd(), "public/assets/webfonts", p);
const fascinate = fs.readFileSync(
  fontPath("fascinate-inline/FascinateInline-Regular.ttf")
);
const clashRegular = fs.readFileSync(
  fontPath("clash-display/ClashDisplay-Regular.woff")
);
const clashMedium = fs.readFileSync(
  fontPath("clash-display/ClashDisplay-Medium.woff")
);

export function renderOgImage({ title, subtitle, eyebrow }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "88px",
          background: "linear-gradient(135deg, #0b0b0f 0%, #16161d 100%)",
          color: "#ffffff",
          fontFamily: "Clash Display",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <span
            style={{ fontFamily: "Fascinate Inline", fontSize: "72px", lineHeight: 1 }}
          >
            M
          </span>
          <span style={{ fontSize: "28px", fontWeight: 500 }}>Miro Ostafinski</span>
          {eyebrow ? (
            <span
              style={{
                marginLeft: "8px",
                padding: "8px 20px",
                borderRadius: "999px",
                border: "2px solid #2a2a33",
                fontSize: "20px",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#b5b5bf",
              }}
            >
              {eyebrow}
            </span>
          ) : null}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 500,
              lineHeight: 1.1,
              maxWidth: "1024px",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {title}
          </span>
          {subtitle ? (
            <span
              style={{
                fontSize: "28px",
                lineHeight: 1.35,
                color: "#b5b5bf",
                maxWidth: "1024px",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {subtitle}
            </span>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "40px",
            borderTop: "2px solid #2a2a33",
            fontSize: "24px",
            color: "#8b8b96",
          }}
        >
          <span>miro-codes.com</span>
          <span>github.com/ostafinskim</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: ogFonts }
  );
}

const ogFonts = [
  { name: "Clash Display", data: clashRegular, weight: 400, style: "normal" },
  { name: "Clash Display", data: clashMedium, weight: 500, style: "normal" },
  { name: "Fascinate Inline", data: fascinate, weight: 400, style: "normal" },
];

// Homepage card — reads like a business card: M mark + name up top, a divider,
// then a labelled contact block. No tagline, no marketing copy.
export function renderCardImage() {
  const contacts = [
    ["Web", "miro-codes.com"],
    ["Email", "ostafinskim@gmail.com"],
    ["GitHub", "github.com/ostafinskim"],
    ["LinkedIn", "linkedin.com/in/ostafinskim"],
  ];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "56px",
          padding: "88px",
          background: "linear-gradient(135deg, #0b0b0f 0%, #16161d 100%)",
          color: "#ffffff",
          fontFamily: "Clash Display",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
            <span
              style={{
                fontFamily: "Fascinate Inline",
                fontSize: "132px",
                lineHeight: 1,
              }}
            >
              M
            </span>
            <span style={{ fontSize: "88px", fontWeight: 500, lineHeight: 1 }}>
              Miro Ostafinski
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "28px",
              letterSpacing: "2px",
              color: "#8b8b96",
              paddingLeft: "4px",
            }}
          >
            {["TypeScript", "React", "Next.js", "Node", "PostgreSQL"].map(
              (t, i) => (
                <span key={t} style={{ display: "flex", gap: "20px" }}>
                  {i > 0 ? <span style={{ color: "#3a3a44" }}>/</span> : null}
                  {t}
                </span>
              )
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            paddingTop: "48px",
            borderTop: "2px solid #2a2a33",
          }}
        >
          <div style={{ display: "flex", gap: "96px" }}>
            {contacts.slice(0, 2).map(([label, value]) => (
              <ContactCell key={label} label={label} value={value} />
            ))}
          </div>
          <div style={{ display: "flex", gap: "96px" }}>
            {contacts.slice(2).map(([label, value]) => (
              <ContactCell key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: ogFonts }
  );
}

function ContactCell({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "480px" }}>
      <span
        style={{
          fontSize: "20px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#6f6f7a",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "32px", color: "#e6e6ec" }}>{value}</span>
    </div>
  );
}
