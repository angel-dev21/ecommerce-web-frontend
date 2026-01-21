import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import type { layouts } from "../types/layouts.ts";
import { AuthProvider } from "../contexts/AuthContext.tsx";

const MainLayout = ({ children }: layouts) => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
