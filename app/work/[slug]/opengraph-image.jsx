import { portfolios2 } from "@/data/portfolio";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Project — Miro Ostafinski";

export default async function Image(props) {
  const { slug } = await props.params;
  const item = portfolios2.find((elm) => elm.slug === slug);
  return renderOgImage({
    eyebrow: "Work",
    title: item?.title ?? "Project",
    subtitle: item?.description,
  });
}
