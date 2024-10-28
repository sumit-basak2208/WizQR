"use client";
import { LogInIcon } from "lucide-react";
import { useState } from "react";

export default function SignIn() {
    const [isLogIn, setIsLogIn] = useState(true);

  const login = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
    } catch (err: any) {
      console.log(err);
    }
  };
  const register = async (ev: React.FormEvent) => {
    ev.preventDefault();
    try {
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-3">
        {isLogIn ? "Login" : "Register"}
      </h1>
      <form onSubmit={(ev) => (isLogIn ? login(ev) : register(ev))}>
        {isLogIn ? (
          <>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">
                Username or email
              </label>
              <input
                name="username"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="Username or email"
                required
              />
            </div>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Password</label>
              <input
                name="password"
                type="password"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="password"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Username</label>
              <input
                name="username"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="Username"
                required
              />
            </div>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Email</label>
              <input
                name="email"
                type="email"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="Email"
                required
              />
            </div>
            <div className="mt-2">
              <label className="text-gray-600 text-xs ml-1">Password</label>
              <input
                name="password"
                type="password"
                className="max-w-full w-80 block p-2 rounded-sm border"
                placeholder="password"
                required
              />
            </div>
          </>
        )}
        <button className="bg-white text-center w-80 rounded-lg mt-5 h-12 relative text-black hover:text-white transition-colors text-xl font-semibold group border">
          <p className="-translate-x-2">{isLogIn ? "Login" : "Register"}</p>

          <div className="bg-purple-400 rounded-lg h-12 w-1/4 flex items-center text-white justify-center absolute right-0 top-0 group-hover:w-80 z-10 duration-500">
            <LogInIcon strokeWidth={2.5} />
          </div>
        </button>
      </form>
      {isLogIn ? (
        <p className="text-gray-600 text-sm mt-4">
          Dont have an account?{" "}
          <button
            onClick={() => setIsLogIn(false)}
            className="text-purple-400 hover:underline font-semibold"
          >
            Sign up!
          </button>
        </p>
      ) : (
        <p className="text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <button
            onClick={() => setIsLogIn(true)}
            className="text-purple-400 hover:underline font-semibold"
          >
            Sign in!
          </button>
        </p>
      )}
    </>
  );
}
