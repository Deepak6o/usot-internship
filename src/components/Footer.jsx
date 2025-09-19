"use client";

import React from "react";
import {
  Phone,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

// Custom X (Twitter) icon
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-700 dark:text-white relative">
      <motion.div
        className="  py-8 px-4 sm:px-6  bg-gray-100 dark:bg-[#18191A] border border-gray-300 dark:border-gray-800 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Footer Content */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5">
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Admissions", "Curriculum", "Scholarships", "FAQs"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5">
                Company
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {["Blog", "About us", "Contact us", "Careers"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5">
                Contact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-300 text-sm sm:text-base">
                    +91 95633 23566
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-colors duration-300 text-sm sm:text-base">
                    info@upgrad.com
                  </span>
                </div>
              </div>
            </div>

            {/* Follow us */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5">
                Follow us
              </h3>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {[Linkedin, XIcon, Facebook, Instagram, Youtube].map(
                  (Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 dark:bg-gray-700 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-white" />
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="border-t border-gray-300 dark:border-gray-700 pt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-3 md:space-y-0">
              {/* Copyright */}
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                © 2015-2025 upGrad Education Private Limited. All rights
                reserved
              </p>

              {/* Footer Links */}
              <div className="flex space-x-3 sm:space-x-5">
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-red-600 text-xs sm:text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-red-600 text-xs sm:text-sm transition-colors duration-300"
                >
                  Terms & Conditions
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
