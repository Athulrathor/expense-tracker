import React from 'react';
import { Twitter, Linkedin, Github } from "lucide-react";

const Footer = ({logo}) => {
  return (
    <footer className="bg-navy-900 text-navy-300">
      <div className="mx-auto max-w-7xl px-4 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="FlowFunds Logo" className="w-8 h-8" />
              <span className="text-h4 font-bold text-white">
                FlowFunds
              </span>
            </a>
            <p className="mt-4 text-body text-navy-400 max-w-sm">
              Smart financial tools to help you track, manage, and grow your money
              with confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-body font-semibold text-white">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-body-sm">
              <li><a href="#features" className="hover:text-primary-400 transition">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-400 transition">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Security</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-body font-semibold text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-body-sm">
              <li><a href="#" className="hover:text-primary-400 transition">About</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Blog</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-primary-400 transition">Careers</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-body font-semibold text-white">
              Follow Us
            </h4>
            <div className="mt-4 flex gap-4">
              <a className="hover:text-primary-400 transition" href="#">
                <Twitter className="h-5 w-5" />
              </a>
              <a className="hover:text-primary-400 transition" href="#">
                <Linkedin className="h-5 w-5" />
              </a>
              <a className="hover:text-primary-400 transition" href="#">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-navy-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-body-sm text-navy-400">
            © {new Date().getFullYear()} FlowFunds. All rights reserved.
          </p>

          <div className="flex gap-6 text-body-sm">
            <a href="#" className="hover:text-primary-400 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-400 transition">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer