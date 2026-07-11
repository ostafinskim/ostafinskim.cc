import { techStack } from "@/data/steps";
import React from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiMongodb,
  SiDirectus,
  SiPayloadcms,
  SiWordpress,
  SiCraftcms,
  SiTailwindcss,
  SiSass,
  SiVite,
  SiGit,
  SiJest,
} from "react-icons/si";
import { TbInfinity } from "react-icons/tb";
import { FaUniversalAccess } from "react-icons/fa6";
import {
  HonoIcon,
  BunIcon,
  BetterAuthIcon,
  TurborepoIcon,
  PlaywrightIcon,
} from "./tech-icons";

// { Icon, color, desc } — color omitted = brand mark is black/white, so inherit
// the theme text colour via currentColor to stay legible on dark and light.
// desc renders inside the card so recruiters can see how each tool is used.
const tech = {
  TypeScript: {
    Icon: SiTypescript,
    color: "#3178C6",
    desc: "Typed JavaScript — my default language across front and back end.",
  },
  React: {
    Icon: SiReact,
    color: "#61DAFB",
    desc: "Component-driven UIs with hooks, context and modern patterns.",
  },
  "Next.js": {
    Icon: SiNextdotjs,
    desc: "React framework — server components, SSR/SSG and routing.",
  },
  "Node.js": {
    Icon: SiNodedotjs,
    color: "#5FA04E",
    desc: "JavaScript runtime for building APIs and server-side tooling.",
  },
  Hono: {
    Icon: HonoIcon,
    color: "#E36002",
    desc: "Lightweight, fast web framework for type-safe API routes.",
  },
  Bun: {
    Icon: BunIcon,
    desc: "Fast JS runtime, bundler and package manager.",
  },
  "Better Auth": {
    Icon: BetterAuthIcon,
    desc: "TypeScript-first authentication — sessions, OAuth and RBAC.",
  },
  "Express.js": {
    Icon: SiExpress,
    desc: "Minimal Node.js framework for REST APIs and web servers.",
  },
  Laravel: {
    Icon: SiLaravel,
    color: "#FF2D20",
    desc: "PHP framework used on server-rendered and legacy platforms.",
  },
  PHP: {
    Icon: SiPhp,
    color: "#777BB4",
    desc: "Server-side language for CMS and legacy application work.",
  },
  PostgreSQL: {
    Icon: SiPostgresql,
    color: "#4169E1",
    desc: "Relational database — schema design, queries and performance.",
  },
  MongoDB: {
    Icon: SiMongodb,
    color: "#47A248",
    desc: "Document database for flexible, schema-light data models.",
  },
  Directus: {
    Icon: SiDirectus,
    color: "#6644FF",
    desc: "Headless CMS layered over a SQL database.",
  },
  Payload: {
    Icon: SiPayloadcms,
    desc: "TypeScript-native headless CMS and application framework.",
  },
  WordPress: {
    Icon: SiWordpress,
    color: "#21759B",
    desc: "CMS work — custom themes and content-managed sites.",
  },
  "Craft CMS": {
    Icon: SiCraftcms,
    color: "#E5422B",
    desc: "Flexible PHP CMS for content-rich marketing sites.",
  },
  "Tailwind CSS": {
    Icon: SiTailwindcss,
    color: "#06B6D4",
    desc: "Utility-first CSS for building responsive UIs quickly.",
  },
  SCSS: {
    Icon: SiSass,
    color: "#CC6699",
    desc: "CSS preprocessor for structured, maintainable styling.",
  },
  Turborepo: {
    Icon: TurborepoIcon,
    color: "#EF4444",
    desc: "Monorepo build system with caching for multi-app codebases.",
  },
  Vite: {
    Icon: SiVite,
    color: "#646CFF",
    desc: "Fast dev server and build tool for modern web apps.",
  },
  Git: {
    Icon: SiGit,
    color: "#F05032",
    desc: "Version control with branch-based, review-driven workflows.",
  },
  Playwright: {
    Icon: PlaywrightIcon,
    desc: "End-to-end browser testing across engines.",
  },
  Jest: {
    Icon: SiJest,
    color: "#C21325",
    desc: "Unit and integration testing for JavaScript/TypeScript.",
  },
  "CI/CD": {
    Icon: TbInfinity,
    desc: "Automated build, test and deploy pipelines.",
  },
  WCAG: {
    Icon: FaUniversalAccess,
    desc: "Accessibility guidelines — semantic markup and AA-level practices.",
  },
};

export default function Services() {
  return (
    <div className="tech-grid">
      {techStack.map((name) => {
        const entry = tech[name];
        const Icon = entry?.Icon;
        return (
          <div key={name} className="tech-tile" title={entry?.desc}>
            {Icon ? (
              <Icon
                className="tech-tile-icon"
                style={entry.color ? { color: entry.color } : undefined}
                aria-hidden="true"
              />
            ) : null}
            <div className="tech-tile-name text-gray">{name}</div>
          </div>
        );
      })}
    </div>
  );
}
