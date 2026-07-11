import { notFound } from "next/navigation";
import { portfolios2 } from "@/data/portfolio";
import WorkView from "@/components/portfolio/work-view";

export function generateStaticParams() {
  return portfolios2.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const item = portfolios2.find((elm) => elm.slug === params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — Miro Ostafinski`,
    description: item.description,
    alternates: { canonical: `/work/${item.slug}` },
  };
}

export default async function WorkSinglePage(props) {
  const params = await props.params;
  const item = portfolios2.find((elm) => elm.slug === params.slug);
  if (!item) notFound();
  return <WorkView item={item} />;
}
