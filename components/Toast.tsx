"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Toast() {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("login"))
      toast("Please login first!", {
        icon: "⚠️",
      });
  }, []);
  return <></>;
}
