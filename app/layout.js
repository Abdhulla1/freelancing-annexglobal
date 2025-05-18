import "./globals.css";
import 'boxicons/css/boxicons.min.css';
export const metadata = {
  title: "WELCOME TO ANNEX GLOBAL CONFERENCES ",
  description:
    "Exploring New Realms, Challenging Constraints, Fostering Collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body> 
         {children}
      </body>
    </html>
  );
}
