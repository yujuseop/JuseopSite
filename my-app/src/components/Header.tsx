import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Navibar from "./Navibar";

export default function Header() {
  return (
    <header className="flex justify-between sticky bg-blue-200 top-0 left-0 right-0 items-center p-3 p-left-6 dark:bg-gray-800 text-white text-4xl text-left transition-colors duration-200">
      <Link href="/">🧑🏻‍💻 Juseop World</Link>
      <Navibar />
      <ThemeToggle />
    </header>
  );
}
