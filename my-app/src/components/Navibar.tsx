import Link from "next/link";

export default function Navibar() {
  return (
    <nav className="p-6 flex gap-3 text-3xl font-bold">
      <Link href="/blog" className="hover:text-blue-600">
        Blog
      </Link>
      <Link href="/troubleShooting" className="hover:text-blue-600">
        Trouble Shooting
      </Link>
    </nav>
  );
}
