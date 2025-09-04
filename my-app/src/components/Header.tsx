import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-center items-center p-6 bg-blue-200 text-white text-4xl">
      <Link href="/">🧑🏻‍💻Juseop World</Link>
      <ThemeToggle />
    </header>
  );
}
