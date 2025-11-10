import Link from "next/link";

type TechBadge = {
  label: string;
  href?: string;
};

export type FeedItem = {
  emoji: string;

  title: string;

  description: string;

  techStack: TechBadge[];

  href?: string;
};

interface FeedProps {
  items: FeedItem[];
  heading?: string;
  className?: string;
  onItemSelect?: (item: FeedItem) => void;
}

export default function Feed({
  items,
  heading,
  className = "",
  onItemSelect,
}: FeedProps) {
  return (
    <section className={`space-y-6 ${className}`}>
      {heading ? (
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
          <p className="text-sm text-muted-foreground">
            프로젝트를 간단하게 둘러보세요.
          </p>
        </header>
      ) : null}

      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.title}
            className={`rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
              onItemSelect ? "cursor-pointer focus-visible:outline-none" : ""
            }`}
            tabIndex={onItemSelect ? 0 : -1}
            role={onItemSelect ? "button" : undefined}
            aria-pressed={onItemSelect ? "false" : undefined}
            onClick={() => {
              onItemSelect?.(item);
            }}
            onKeyDown={(event) => {
              if (!onItemSelect) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onItemSelect(item);
              }
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden>
                {item.emoji}
              </span>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-tight">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-blue-600 transition hover:text-blue-500"
                    >
                      자세히 보기 →
                    </Link>
                  ) : null}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.techStack.map(({ label, href }) =>
                    href ? (
                      <Link
                        key={`${item.title}-${label}`}
                        href={href}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                      >
                        {label}
                      </Link>
                    ) : (
                      <span
                        key={`${item.title}-${label}`}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
