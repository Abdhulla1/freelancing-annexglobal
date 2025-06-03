import "./globals.css";
import "boxicons/css/boxicons.min.css";
import Providers from "./providers";
import Script from "next/script";
import 'quill/dist/quill.snow.css';

export const metadata = {
  title: "WELCOME TO ANNEX GLOBAL CONFERENCES ",
  description:
    "Exploring New Realms, Challenging Constraints, Fostering Collaboration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <Script src="https://www.paypal.com/sdk/js?client-id=ARsR9u8OH0MhJ3HKVsF02EMUjtOFd6Ev-jdWBtrUhwAGgNAD8GD11hYUPtcpf1IvsO1mhad-ozu0KEp8" />
        <div suppressHydrationWarning>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
