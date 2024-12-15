import ForgotPassword from "@/components/ForgotPassword";
import HomeBannerCard from "@/components/home/HomeBannerCard/HomeBannerCard";
import * as motion from "framer-motion/client";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { token } = await searchParams;
  return (
    <main className="grid md:grid-cols-2 grid-cols-1">
      <div className="hidden md:!block h-[calc(100dvh-46px)] overflow-hidden relative">
        <motion.div
          animate={{ x: 200, y: 115.5 }}
          transition={{ ease: "linear", repeat: Infinity, duration: 4 }}
          className="design-container absolute inset-0 -top-[250px] -left-[250px]"
        ></motion.div>
        <HomeBannerCard />
      </div>
      <div className="flex-col flex items-center gap-2 justify-center h-[calc(100dvh-46px)]">
              <ForgotPassword isOTP={Boolean(token)} token={token} />
      </div>
    </main>
  );
}
