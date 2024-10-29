import FloatingCard from "@/components/home/FloatingCard";
import * as motion from "framer-motion/client";
import { ArrowRightIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="grid md:grid-cols-2 grid-cols-1 overflow-hidden">
        <div className="flex border-r-4 border-black relative items-center">
          <div className="ml-10 mb-10">
            <h1 className="text-3xl font-bold">
              Create Your Custom QR-Linked <br />
              Cards with WizQR
            </h1>
            <p className="text-gray-800 mt-3 max-w-[500px]">
              Design unique, eye-catching cards that seamlessly connect your
              audience to your website with a simple QR scan. Customize every
              detail, add your personalized link, and watch your brand come to
              life on a card that’s just as unique as you are.
            </p>
            <div className="w-fit bg-black rounded">
              <button className="flex gap-4 px-4 py-2 bg-white text-xl transition-all translate-x-1 -translate-y-1 active:!translate-x-0 active:!translate-y-0 font-bold border-2 border-black rounded mt-5">
                <span>Get started</span>
                <ArrowRightIcon strokeWidth={2.5} className="mt-1" />
              </button>
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
      <section className="mx-10">
        <FloatingCard />
      </section>
    </>
  );
}
