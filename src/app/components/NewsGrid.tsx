"use client";

import { motion } from "framer-motion";
import NewsCard from "./NewsCard";
import { NewsArticle } from "@/app/lib/types";

interface NewsGridProps {
  articles: NewsArticle[];
  error?: string;
}

export default function NewsGrid({ articles, error }: NewsGridProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <span className="text-5xl mb-4">📰</span>
        <p className="text-white/60 text-sm">{error}</p>
      </motion.div>
    );
  }

  if (!articles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-10 h-10 border-2 border-violet-400/40 border-t-violet-400 rounded-full animate-spin" />
        <p className="text-white/40 text-sm mt-4">Loading articles…</p>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-violet-500 rounded-full" />
          <h2 className="text-xl font-bold text-white">Latest News</h2>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="text-sm text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5"
        >
          See all →
        </motion.button>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <NewsCard key={article.id} article={article} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
