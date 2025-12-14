import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import type { layouts } from "../types/layouts.ts";

const MainLayout = ({ children }: layouts) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
