export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-6 bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors duration-200">
      <p>&copy; {new Date().getFullYear()} Welcome toJuseop World!</p>
    </footer>
  );
}
