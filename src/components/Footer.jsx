"use client";

import React from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <motion.div
        className="py-8 px-4 sm:px-6 bg-gray-100 border-t border-gray-300"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            
            {/* Left Side - Logo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              {/* Replace this img tag with your actual logo */}
              <img 
                src="assets/Logo.png" 
                alt="Company Logo" 
                className="h-12 w-auto"
              />
              {/* Alternative: If you don't have a logo image yet, you can use text */}
              {/* <div className="text-2xl font-bold text-red-600">
                upGrad
              </div> */}
            </motion.div>

            {/* Right Side - Support Information */}
            <motion.div
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Support Text */}
              <div className="text-center sm:text-right">
                <h3 className="text-lg font-semibold mb-2">Support</h3>
                <div className="space-y-2">
                  
                  <div className="flex items-center justify-center sm:justify-end space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 text-sm">
                      Marketing@upgradsot.com
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Copyright */}
        
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;