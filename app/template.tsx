import Navbar from "@/components/Navbar/Navbar";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <div className="h-[calc(100dvh-52px)]">{children}</div>
    </>
  );
}
