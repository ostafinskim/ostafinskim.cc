import { portfolios2 } from "@/data/portfolio";
import PortfolioCard from "@/components/portfolio/portfolio-card";

export default function RelatedProject9({ currentId }) {
  // Show the project after the current one, wrapping to the first.
  const currentIndex = portfolios2.findIndex((p) => p.id == currentId);
  const nextItem = portfolios2[(currentIndex + 1) % portfolios2.length];

  return (
    <div className="container">
      <h2 className="section-title-medium font-alt text-outline-cont mt-20 mb-50 mb-md-30">
        <span className="text-outline">Next Project</span>
      </h2>
      <PortfolioCard item={nextItem} />
    </div>
  );
}
