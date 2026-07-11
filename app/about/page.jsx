import AboutView from "@/components/about/about-view";

export const metadata = {
  title: "About — Miro Ostafinski",
  description:
    "Full-stack TypeScript developer with 4+ years of commercial experience building modern web applications end to end.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
