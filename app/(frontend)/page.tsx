import FloatingCard from "@/components/home/FloatingCard/FloatingCard";
import * as motion from "framer-motion/client";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="grid md:grid-cols-2 grid-cols-1 overflow-hidden">
        <div className="flex md:border-r-4 border-0 border-black relative items-center md:min-h-max min-h-[100dvh]">
          <div className="md:ml-16 md:mr-4 mb-10 md:px-0 px-3 md:grow-0 grow md:text-left text-center md:block flex flex-col items-center justify-center">
            <h1 className="xl:text-3xl md:text-2xl xs:text-3xl text-2xl font-bold">
              Create Your Custom QR-Linked <br className="sm:block hidden" />
              Cards with WizQR
            </h1>
            <p className="text-gray-800 mt-3 xl:text-base md:text-sm xs:text-base text-sm max-w-[500px]">
              Design unique, eye-catching cards that seamlessly connect your
              audience to your website with a simple QR scan. Customize every
              detail, add your personalized link, and watch your brand come to
              life on a card that’s just as unique as you are.
            </p>
            <div className="h-fit w-fit mt-5 bg-black rounded">
              <Link
                href="/dashboard/card"
                className="flex gap-4 px-4 py-2 bg-white xl:text-xl md:text-lg xs:text-xl text-lg transition-all translate-x-1 -translate-y-1 hover:-translate-y-1.5 hover:translate-x-1.5 active:!translate-x-0 active:!translate-y-0 font-bold border-2 border-black rounded"
              >
                <span>Get started</span>
                <ArrowRightIcon strokeWidth={2.5} className="mt-1" />
              </Link>
            </div>
          </div>
          <div className="w-16 h-16 absolute border-t-4 bg-white -bottom-[34px] -right-[31.5px] z-20 border-black rotate-[50deg]"></div>
        </div>
        <div className="hidden md:block h-[calc(100dvh-46px)] overflow-hidden relative border-b-4 border-black">
          <motion.div
            animate={{ x: 200, y: 115.5 }}
            transition={{ ease: "linear", repeat: Infinity, duration: 4 }}
            className="design-container absolute inset-0 -top-[250px] -left-[250px]"
          ></motion.div>
        </div>
      </main>
      <section className="overflow-hidden">
        <FloatingCard />
      </section>
    </>
  );
}
