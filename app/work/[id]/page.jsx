import { portfolios2 } from "@/data/portfolio";
import WorkView from "@/components/portfolio/work-view";

export function generateStaticParams() {
  return portfolios2.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const item =
    portfolios2.find((elm) => elm.id == params.id) || portfolios2[0];
  return {
    title: `${item.title} — Miro Ostafinski`,
    description: item.description,
    alternates: { canonical: `/work/${item.id}` },
  };
}

export default async function WorkSinglePage(props) {
  const params = await props.params;
  const item =
    portfolios2.find((elm) => elm.id == params.id) || portfolios2[0];
  return <WorkView item={item} />;
}
