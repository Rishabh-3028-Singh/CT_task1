"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="mt-auto border-t border-white/5 py-6 text-center"
    >
      <p className="text-white/30 text-sm">
        Built with{" "}
        <span className="text-rose-400">♥</span>{" "}
        using{" "}
        <span className="text-white/50">Next.js</span>,{" "}
        <span className="text-white/50">Tailwind CSS</span> &{" "}
        <span className="text-white/50">Framer Motion</span>
      </p>
      <p className="text-white/20 text-xs mt-1">
        Weather data: Open-Meteo • News data: JSONPlaceholder
      </p>
    </motion.footer>
  );
}
