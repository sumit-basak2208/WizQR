import dynamic from "next/dynamic";

const Account = dynamic(() => import("./Account"), {
  loading: () => <></>,
  ssr: false
});

export default function Navbar() {
    return (
      <nav className="flex justify-between items-center sticky top-0 bg-white px-4 py-2 border-b-2 border-black">
        <h1 style={{ fontFamily: "cursive" }} className="text-lg font-bold">WizQR</h1>
        <Account />
      </nav>
    );
}
