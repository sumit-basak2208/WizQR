import Account from "./Account";

export default function Navbar() {
    return (
      <nav className="flex justify-between items-center sticky top-0 bg-white px-4 py-2 shadow">
        <h1 style={{ fontFamily: "cursive" }} className="text-lg font-bold">WizQR</h1>
        <Account isLoggedIn={true} />
      </nav>
    );
}
