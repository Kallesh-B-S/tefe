import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import StoreProvider from "./reduxToolKit/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// Define the layout component
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Check if the current path is the root
  // console.log(Boolean(slug));
  

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${roboto.variable} antialiased`}
      >
          {/* Conditionally render Navbar based on the current path */}
          {<Navbar />}
          <StoreProvider>
          {children}
          </StoreProvider>
      </body>
    </html>
  );
}