"use client";
import { Loader, LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword({
  isOTP,
  token,
}: {
  isOTP: boolean;
  token?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // Values
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  const resetPassword = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/user/reset-password", {
        method: "POST",
        body: JSON.stringify({ password, token }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }
      toast.success("Password changed successfully");
      router.refresh();
      router.push("/login");
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  const forgotPassword = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/user/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }
      toast.success(
        "Password reset link sent successfully! Please check your mail"
      );
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-3">
        {isOTP ? "Reset password" : "Forgot password"}
      </h1>
      <form onSubmit={(ev) => (isOTP ? resetPassword(ev) : forgotPassword(ev))}>
        {isOTP ? (
          <>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Password</label>
              <input
                min={8}
                max={12}
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                name="password"
                type="password"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="password"
                required
                disabled={isLoading}
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Email</label>
              <input
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                name="email"
                type="email"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="Email"
                required
                disabled={isLoading}
              />
            </div>
          </>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-center w-80 rounded-lg mt-5 h-12 relative text-black hover:text-white transition-colors font-semibold group border"
        >
          <p className="-translate-x-2">Reset password</p>

          <div
            className={`bg-purple-400 rounded-lg h-12 ${
              isLoading ? "w-80" : "w-1/4"
            } flex items-center text-white justify-center absolute right-0 top-0 group-hover:w-80 z-10 duration-500`}
          >
            {isLoading ? (
              <Loader className="animate-spin" strokeWidth={2.5} />
            ) : (
              <LogInIcon strokeWidth={2.5} />
            )}
          </div>
        </button>
      </form>
      <p className="text-gray-600 text-sm mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-purple-400 hover:underline font-semibold"
        >
          Sign in!
        </Link>
      </p>
    </>
  );
}
