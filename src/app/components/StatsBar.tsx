"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Articles Today", value: "12", icon: "📰" },
  { label: "Data Sources", value: "2", icon: "🔗" },
  { label: "Last Refresh", value: "Live", icon: "🔄" },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
          className="glass-card rounded-xl px-4 py-3 flex items-center gap-3"
        >
          <span className="text-2xl">{stat.icon}</span>
          <div>
            <p className="text-lg font-bold text-white leading-none">
              {stat.value}
            </p>
            <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
