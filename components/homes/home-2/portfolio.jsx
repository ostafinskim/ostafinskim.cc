import { portfolios2 } from "@/data/portfolio";
import OutlineTitle from "@/components/common/outline-title";
import PortfolioCard from "@/components/portfolio/portfolio-card";

export default function Portfolio() {
  return (
    <div className="container">
      <div className="row mb-90 mb-md-40">
        <div className="col-lg-5 mb-md-30">
          <OutlineTitle text="Work & Projects" />
          <p className="section-text mb-0">
            Selected projects across the public sector, culture and e-commerce
            — from high-traffic platforms to type-safe APIs.
          </p>
        </div>
      </div>
      <div id="isotope" className="mb-n100 mb-sm-n50">
        {portfolios2.map((item, index) => (
          <PortfolioCard key={item.id} item={item} reverse={index % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
