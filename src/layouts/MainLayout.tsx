import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import type { layouts } from "../types/layouts.ts";

const MainLayout = ({ children }: layouts) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
