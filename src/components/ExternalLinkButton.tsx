import { ArrowUpRight } from "lucide-react";
import React from "react";

type ExternalLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function ExternalLinkButton({
  href,
  children,
  variant = "ghost",
  className = ""
}: ExternalLinkButtonProps) {
  const classes =
    variant === "primary"
      ? "border-rose bg-rose text-white hover:border-ember hover:bg-ember hover:text-canvas"
      : "border-line bg-surface-soft text-ink hover:border-ember hover:text-ember";

  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className={`inline-flex min-h-11 items-center justify-center gap-2 border px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${classes} ${className}`}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}
