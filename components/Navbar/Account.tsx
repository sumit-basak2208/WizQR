"use client";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { deleteCookie, hasCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Account() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkStatus = useCallback(() => setIsLoggedIn(hasCookie("token")), []);

  useEffect(() => {
    checkStatus();
  });

  const logout = () => {
    deleteCookie("token");
    toast.success("Logout successfull!");
    checkStatus();
    router.refresh();
    router.push("/");
  };
  return (
    <div>
      {!isLoggedIn ? (
        <Link
          href="/login"
          // onClick={() => signIn("google", { callbackUrl: "/chat" })}
          className="overflow-hidden border-l-[3px] border-black group flex bg-black items-center font-semibold gap-2 px-4 py-2 transition-all relative after:absolute after:inset-0 after:translate-x-[calc(-100%-10px)] hover:after:translate-x-0 after:bg-white after:transition-all"
        >
          <span className="group-hover:font-bold group-hover:text-black text-white mb-1 relative z-10">
            Login
          </span>
          <LogIn
            className="group-hover:stroke-2 group-hover:text-black text-white mb-1 relative z-10"
            size={20}
          />
        </Link>
      ) : (
        <div className="px-4 py-2">
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative flex rounded-full p-1 border border-double text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <User />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1 w-40">
              {/* <Link href="/profile" className="block px-4 py-1 text-sm">
                Your Profile
              </Link> */}
              <Link href="/dashboard" className="block px-4 py-1 text-sm">
                Dashboard
              </Link>
              <button
                onClick={() => logout()}
                className="block px-4 py-1 text-sm"
              >
                Sign out
              </button>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
