// Section heading rendered as three stacked outline layers; only the last
// copy is exposed to screen readers.
export default function OutlineTitle({ text, className = "mt-20 mb-50 mb-md-30" }) {
  return (
    <h2 className={`section-title-medium font-alt text-outline-cont ${className}`}>
      <span className="text-outline-2" aria-hidden="true">
        {text}
      </span>
      <span className="text-outline-1" aria-hidden="true">
        {text}
      </span>
      <span className="text-outline">{text}</span>
    </h2>
  );
}
