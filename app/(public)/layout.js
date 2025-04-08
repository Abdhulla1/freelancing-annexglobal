import Navbar from "@/components/Static/Navbar";
import Footer from "@/components/Static/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
