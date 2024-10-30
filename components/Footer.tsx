import { GithubIcon, Linkedin, LinkedinIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 py-2 flex justify-between items-center bg-black/90 text-white z-50">
      <Link
        href="/"
        style={{ fontFamily: "cursive" }}
        className="text-lg font-bold"
      >
        WizQR
      </Link>
      <div className="flex gap-4">
        <GithubIcon />
        <LinkedinIcon />
      </div>
    </footer>
  );
}
