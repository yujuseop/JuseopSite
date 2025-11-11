import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex p-3  items-center text-center  text-blue-600 dark:text-white text-3xl transition-colors duration-200 lg:text-5xl">
      <Link href="/" className="font-bold mx-auto">
        Y J S
      </Link>
      <ThemeToggle />
    </header>
  );
}
