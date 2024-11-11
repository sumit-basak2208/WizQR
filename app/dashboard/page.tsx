import DashboardCardList from "@/components/DashboardCardList";
import { BadgePlus } from "lucide-react";
import Link from "next/link";


export default async function Dashboard() {
  return (
    <main className="relative">
      <nav className="-mx-3 -mt-2 px-3 py-2 flex justify-between items-center sticky top-0 bg-white border-b-2 border-black z-50">
        <h2 style={{ fontFamily: "cursive" }} className="text-lg font-bold">
          WizQRs
        </h2>
        <div className="w-fit h-fit bg-black rounded">
          <Link
            href="/dashboard/card"
            title="Add card"
            className="flex items-center gap-2 px-1 py-1 bg-white transition-all translate-x-0.5 -translate-y-0.5 hover:-translate-y-1 hover:translate-x-1 active:!translate-x-0 active:!translate-y-0 font-bold border-2 border-black rounded"
          >
            <BadgePlus strokeWidth={2.5} size={18} className="mt-0.5" />
            <span>Card</span>
          </Link>
        </div>
      </nav>
        <DashboardCardList />
    </main>
  );
}
