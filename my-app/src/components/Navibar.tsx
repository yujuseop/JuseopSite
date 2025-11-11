import Link from "next/link";

export default function Navibar() {
  return (
    <div className="text-center">
      <h1 className="text-xl font-bold lg:text-2xl text-blue-600">
        블로그 및 트러블 슈팅
      </h1>
      <nav className="px-3 flex gap-3  text-sm font-bold lg:text-lg">
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
    </div>
  );
}
