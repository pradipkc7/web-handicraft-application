import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="mx-auto w-full max-w-[1440px] flex-1">{children}</div>
      <Footer />
    </div>
  );
}
