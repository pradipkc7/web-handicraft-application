export default function Footer() {
  return (
    <footer className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
      <p className="text-xs tracking-[0.5px] text-gray-400">
        © {new Date().getFullYear()} My App — Admin
      </p>
      <p className="text-xs tracking-[0.5px] text-gray-400">EN · Global</p>
    </footer>
  );
}
