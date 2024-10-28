import { Input } from "@/components/ui/input";
import { LogInIcon } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Login() {
  return (
    <main className="grid md:grid-cols-2 grid-cols-1">
      <div className="hidden md:block h-[calc(100dvh-46px)] overflow-hidden relative">
        <motion.div
          animate={{ x: 200, y: 115.5 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 4 }}
          className="design-container absolute inset-0 -top-[250px] -left-[250px]"
        ></motion.div>
      </div>
      <div className="flex-col flex items-center gap-2 justify-center h-[calc(100dvh-46px)]">
        <h1 className="text-4xl font-bold mb-5">Login</h1>
        <div>
          <label className="text-gray-600 text-xs ml-1">
            Username or email
          </label>
          <input
            className="max-w-full w-80 block p-2 rounded-sm border"
            placeholder="Username or email"
          />
        </div>
        <div>
          <label className="text-gray-600 text-xs ml-1">Password</label>
          <input
            type="password"
            className="max-w-full w-80 block p-2 rounded-sm border"
            placeholder="password"
          />
        </div>
        <button
          className="bg-white text-center w-80 rounded-lg mt-5 h-12 relative text-black hover:text-white transition-colors text-xl font-semibold group border"
          type="button"
        >
          <p className="-translate-x-2">Login</p>

          <div className="bg-purple-400 rounded-xl h-12 w-1/4 flex items-center text-white justify-center absolute right-0 top-0 group-hover:w-80 z-10 duration-500">
            <LogInIcon />
          </div>
        </button>
        <p className="text-gray-600 text-sm mt-4">
          Dont have an account? <button className="text-purple-400 hover:underline font-semibold">Sign up!</button>
        </p>
      </div>
    </main>
  );
}
