import React, { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

import SignUp from "./SignUp";

export default function Login({ setLogin }) {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blurred Background */}
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-scale-in">

        {/* Close Button */}
        <button
          aria-label="Close"
          className="
            absolute top-4 right-4
            rounded-full p-2
            text-navy-500
            hover:bg-navy-100 hover:text-navy-900
            transition
          "
          onClick={() => { setLogin(false) }}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-h3 font-bold text-navy-900">
            Welcome back
          </h1>
          <p className="mt-2 text-body text-navy-500">
            Log in to your FlowFunds account
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          <div>
            <label className="block text-body-sm font-medium text-navy-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                mt-2 w-full rounded-xl border border-navy-200
                px-4 py-2
                focus:border-primary-500 focus:ring-2 focus:ring-primary-500
                outline-none
              "
            />
          </div>

          <div>
            <label className="block text-body-sm font-medium text-navy-700">
              Password
            </label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-navy-200 px-4 py-2 pr-12
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-navy-500 hover:text-navy-900 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-body-sm">
            <label className="flex items-center gap-2 text-navy-600">
              <input type="checkbox" className="rounded border-navy-300" />
              Remember me
            </label>
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="
              w-full rounded-2xl bg-primary-600 px-6 py-3
              text-white font-semibold
              hover:bg-primary-500 transition
            "
          >
            Log in
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-navy-200" />
          <span className="text-body-xs text-navy-400">OR</span>
          <div className="h-px flex-1 bg-navy-200" />
        </div>

        {/* Social Login */}
        <button
          className="
            w-full rounded-2xl border border-navy-200
            px-6 py-3 font-semibold text-navy-700
            hover:bg-navy-100 transition
          "
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-body-sm text-navy-500">
          Don’t have an account?
          <a href={<SignUp />} className="ml-1 text-primary-600 hover:text-primary-500">
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}
