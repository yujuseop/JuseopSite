import Link from "next/link";

export default function Navibar() {
  return (
    <nav className="p-6 flex gap-3 text-sm font-bold lg:text-lg">
      <Link
        href="/blog"
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        Blog
      </Link>
      <Link
        href="/troubleShooting"
        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
      >
        Trouble Shooting
      </Link>
    </nav>
  );
}
