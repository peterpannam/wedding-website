import { Great_Vibes, Lora, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";

export const metadata = {
  title: "Peter and Sophie get Hitched",
  description: "Join Peter and Sophie in celebration at St Marys by the Sea at Port Douglas on June 20 2026.",
  robots: "noindex, nofollow",
};

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-great-vibes" });
const lora = Lora({ subsets: ["latin"], weight: "400", variable: "--font-lora" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400", variable: "--font-montserrat" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${lora.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
