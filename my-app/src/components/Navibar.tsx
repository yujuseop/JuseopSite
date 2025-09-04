import Link from "next/link";

export default function Navibar() {
  return (
    <nav className="p-6 flex gap-3 text-3xl font-bold">
      <Link href="/blog">Blog</Link>
    </nav>
  );
}
