import { User } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function Account({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
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
        <a
          href="#"
          className="block px-4 py-1 text-sm"
        >
          Your Profile
        </a>
        <a
          href="#"
          className="block px-4 py-1 text-sm"
        >
          Dashboard
        </a>
        <a
          href="#"
          className="block px-4 py-1 text-sm"
        >
          Sign out
        </a>
      </PopoverContent>
    </Popover>
  );
}
