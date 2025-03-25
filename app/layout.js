import Navbar from "@/components/Static/Navbar";
import "./globals.css";
import Footer from "@/components/Static/Footer";
export const metadata = {
  title: "WELCOME TO ANNEX GLOBAL CONFERENCES ",
  description:
    "Exploring New Realms, Challenging Constraints, Fostering Collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> 
        <Navbar />
       {children}     
            <Footer />
       
      </body>
    </html>
  );
}
