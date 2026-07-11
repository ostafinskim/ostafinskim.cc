import Link from "next/link";

// Underlined link with the template's hover animation: the label is rendered
// twice (unhovered/hovered layers), second copy hidden from screen readers.
// Same-page anchors ("#...") render a plain <a> so local-scroll handles them.
export default function AnimatedLink({ href, children, className = "" }) {
  const Tag = href.startsWith("#") ? "a" : Link;
  return (
    <Tag
      href={href}
      className={`link-hover-anim underline align-middle ${className}`.trim()}
      data-link-animate="y"
    >
      <span className="link-strong link-strong-unhovered">{children}</span>
      <span className="link-strong link-strong-hovered" aria-hidden="true">
        {children}
      </span>
    </Tag>
  );
}
