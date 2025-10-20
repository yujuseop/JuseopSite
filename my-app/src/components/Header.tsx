import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Navibar from "./Navibar";

export default function Header() {
  return (
    <header className="flex p-5 sticky bg-gray-200 top-0 left-0 right-0 items-center  p-left-6 dark:bg-gray-800 text-black dark:text-white text-3xl text-left transition-colors duration-200 lg:text-5xl">
      <Link href="/" className="font-bold">
        {" "}
        JS World
      </Link>
      <Navibar />
      <ThemeToggle />
    </header>
  );
}
