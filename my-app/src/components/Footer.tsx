export default function Footer() {
  return (
    <footer className="flex justify-center items-center p-6 bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition-colors duration-200">
      <p className="text-center">
        &copy; {new Date().getFullYear()} JS World! <br /> 궁금하신 점이
        있으시면 언제든 연락주세요.
      </p>
    </footer>
  );
}
