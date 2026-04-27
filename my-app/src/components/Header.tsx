import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/about", label: "소개" },
  { href: "/skills", label: "기술" },
  { href: "/career", label: "경력" },
  { href: "/projects", label: "프로젝트" },
  { href: "/blog", label: "블로그" },
  { href: "/troubleShooting", label: "트러블슈팅" },
] as const;

export default function Header() {
  return (
    <header className="flex p-3 items-center text-blue-600 dark:text-white transition-colors duration-200">
      <Link href="/" className="font-bold text-3xl lg:text-5xl mr-auto">
        Y-NOTE
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:text-base font-medium mr-3">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-blue-400 transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="rounded-full border border-blue-400 px-3 py-1 text-xs lg:text-sm hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
        >
          연락하기
        </Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
