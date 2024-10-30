import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar/>
      <div className="">{children}</div>
      <Footer/>
    </>
  );
}
