import React from 'react';
import { X, Eye, EyeOff } from "lucide-react";
import { useState } from 'react';

import Login from './Login';

const SignUp = ({ setSignUp }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Blurred Background */}
      <div className="absolute inset-0 bg-navy-900/30 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-scale-in">

        {/* Close Button */}
        <button
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full p-2 text-navy-500 hover:bg-navy-100 transition"
          onClick={() => { setSignUp(false) }}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-h3 font-bold text-navy-900">
            Create your
            <span className="text-primary-600"> FlowFunds</span> account
          </h1>
          <p className="mt-2 text-body text-navy-500">
            Start managing your finances in minutes
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">

          {/* Name */}
          <div>
            <label className="block text-body-sm font-medium text-navy-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-body-sm font-medium text-navy-700">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-navy-200 px-4 py-2
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
            />
          </div>

          {/* Password */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-body-sm font-medium text-navy-700">
              Confirm Password
            </label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-navy-200 px-4 py-2 pr-12
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-500 hover:text-navy-900"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 text-body-sm text-navy-600">
            <input type="checkbox" className="mt-1 rounded border-navy-300" />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-primary-600 px-6 py-3
                       text-white font-semibold hover:bg-primary-500 transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-body-sm text-navy-500">
          Already have an account?
          <a href={<Login />} className="ml-1 text-primary-600 hover:text-primary-500">
            Log in
          </a>
        </p>
      </div>
    </section>
  )
}

export default SignUp;