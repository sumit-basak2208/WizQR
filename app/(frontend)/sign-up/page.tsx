import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import * as motion from "framer-motion/client";

export default function Login() {
  return (
    <main className="grid md:grid-cols-2 grid-cols-1">
      <div className="hidden md:!block h-[calc(100dvh-46px)] overflow-hidden relative">
        <motion.div
          animate={{ x: 200, y: 115.5 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 4 }}
          className="design-container absolute inset-0 -top-[250px] -left-[250px]"
        ></motion.div>
      </div>
      <div className="flex-col flex items-center gap-2 justify-center h-[calc(100dvh-46px)]">
        <SignUp/>
      </div>
    </main>
  );
}
