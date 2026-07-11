"use client";
// Re-export directly: jarallax only runs inside useEffect (client), so the
// markup itself is safe to server-render. The previous `dynamic(..., { ssr:
// false })` wrapper client-rendered the whole hero — no <h1> in the HTML,
// CLS ~1.0 when the section popped in, and no hero content for crawlers.
export { default } from "@/components/common/parallax";
