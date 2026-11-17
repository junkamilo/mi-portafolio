import Link from "next/link";
import { cn } from "@/lib/utils";

export function ShineButton({
  href,
  children,
  variant = "primary",
  download,
  onClick,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "glass";
  download?: string | boolean;
  onClick?: () => void;
  className?: string;
}) {
  const cls = cn(
    "shine inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-shadow duration-300",
    variant === "primary"
      ? "bg-white text-ink-950 hover:shadow-[0_0_40px_-6px_rgb(139_92_246/0.8)]"
      : "glass text-white hover:shadow-[0_0_30px_-8px_rgb(34_211_238/0.7)]",
    className,
  );

  if (href) {
    return (
      <Link href={href} download={download} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
