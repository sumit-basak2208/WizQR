"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import toast from "react-hot-toast";

function Toast() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("login"))
      toast("Please login first!", {
        icon: "⚠️",
      });
  }, []);
  return <></>;
}

export default function ToastSuspense() {
  return (
    <Suspense>
      <Toast />
    </Suspense>
  );
}
