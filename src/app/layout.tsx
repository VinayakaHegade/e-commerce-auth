import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import Header from "./components/header";
import OfferBar from "./components/offer-bar";
import { Toaster } from "./components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "E-Commerce Auth",
  description:
    "E-commerce website where users can mark the categories that they are interested in.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header />
        <OfferBar />
        <TRPCReactProvider>
          <main className="mx-auto max-w-[1440px] px-4">{children}</main>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
