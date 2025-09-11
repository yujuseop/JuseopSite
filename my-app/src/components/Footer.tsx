export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-6 bg-blue-200 dark:bg-gray-800 text-white transition-colors duration-200">
      <p>&copy; {new Date().getFullYear()} Juseop World!</p>
    </footer>
  );
}
