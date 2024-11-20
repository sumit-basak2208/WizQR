"use client";
import { Loader, LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const login = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        return;
      }
      toast.success("Login successfull!");
      router.refresh();
      router.push("/dashboard");
    } catch (error: unknown) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };
  return (
    <>
      <h1 className="text-4xl font-bold mb-3">Login</h1>
      <form onSubmit={login}>
        <div className="mt-2">
          <label className="text-gray-600 text-xs ml-1">
            Username or email
          </label>
          <input
            onChange={(ev) => setUsername(ev.target.value)}
            value={username}
            name="user name"
            className="max-w-full w-80 block p-2 rounded-sm border"
            placeholder="Username or email"
            required
            disabled={isLoading}
          />
        </div>
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
        <p className="cursor-pointer font-semibold hover:underline text-right text-sm text-purple-400">
          Forgot password?
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-white text-center w-80 rounded-lg mt-5 h-12 relative text-black hover:text-white transition-colors text-xl font-semibold group border"
        >
          <p className="-translate-x-2">Login</p>

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
        Dont have an account?{" "}
        <Link
          href="/sign-up"
          // onClick={() => setIsLogIn(false)}
          className="text-purple-400 hover:underline font-semibold"
        >
          Sign up!
        </Link>
      </p>
    </>
  );
}
