import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav";
import ConvexClientProvider from "@/components/convex-provider";
import { Toaster } from "@/components/ui/sonner";
// import { SearchCommand } from "@/components/docs/search-command";
// import  ConvexClientProvider  from "@/lib/convex-provider";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <div className="h-full dark:bg-[#1F1F1F]">
            {children}
            <Toaster />
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
