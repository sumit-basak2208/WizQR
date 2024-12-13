"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

function Toast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("login")) {
      toast("Please login first!", {
        icon: "⚠️",
      });
      router.push("/");
    }
  }, [searchParams]);
  return <></>;
}

export default function ToastSuspense() {
  return (
    <Suspense>
      <Toast />
    </Suspense>
  );
}
