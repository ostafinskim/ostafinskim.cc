import { OG_CONTENT_TYPE, OG_SIZE, renderCardImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Miro Ostafinski — miro-codes.com";

export default function Image() {
  return renderCardImage();
}
