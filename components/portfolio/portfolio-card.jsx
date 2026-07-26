import Image from "next/image";
import Link from "next/link";
import AnimatedLink from "@/components/common/animated-link";

// One portfolio row. `reverse` puts the text column first on md+ screens;
// the image always comes first on mobile.
export default function PortfolioCard({ item, reverse = false }) {
  return (
    <div
      className={`portfolio-2-item mb-100 mb-sm-50 mix ${item.categories.join(
        " "
      )}`}
    >
      <div className="row">
        <div
          className={`col-md-8 mb-sm-30 ${
            reverse ? "order-first order-md-last" : "order-md-first"
          }`}
        >
          <div className="portfolio-2-image">
            <Link href={`/work/${item.slug}`}>
              <Image
                width={1200}
                height={819}
                src={item.imageUrl}
                alt={item.title}
              />
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <hr className="black thick mt-0 mb-20 d-none d-md-block" />
          <h3 className="portfolio-2-title font-alt mb-20">
            <Link href={`/work/${item.slug}`}>{item.title}</Link>
          </h3>
          <p className="portfolio-2-descr">{item.description}</p>
          <div>
            <AnimatedLink href={`/work/${item.slug}`}>View Project</AnimatedLink>
          </div>
          {item.links?.[0] && (
            <div className="mt-10 small">
              <a
                href={item.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live site
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
