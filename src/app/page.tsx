import Footer from "@/components/footer";
import Heading from "@/components/heading";
import Hero from "@/components/hero";
import { Navbar } from "@/components/nav";

export default function Page() {
  return (
    <>
      <main className="h-full pt-40">
        <Navbar />
        <div className="min-h-screen flex flex-col dark:bg-[#1F1F1F]">
          <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
            <Heading />
            <Hero />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}
