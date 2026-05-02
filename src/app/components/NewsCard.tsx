"use client";

import { motion } from "framer-motion";
import { NewsArticle } from "@/app/lib/types";

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "from-blue-500/20 to-cyan-500/10 border-blue-500/20",
  Science: "from-violet-500/20 to-purple-500/10 border-violet-500/20",
  Business: "from-emerald-500/20 to-green-500/10 border-emerald-500/20",
  Health: "from-rose-500/20 to-pink-500/10 border-rose-500/20",
  Sports: "from-orange-500/20 to-amber-500/10 border-orange-500/20",
  Entertainment: "from-pink-500/20 to-fuchsia-500/10 border-pink-500/20",
  World: "from-sky-500/20 to-blue-500/10 border-sky-500/20",
  Politics: "from-red-500/20 to-orange-500/10 border-red-500/20",
};

const CATEGORY_BADGE: Record<string, string> = {
  Technology: "bg-blue-500/20 text-blue-300",
  Science: "bg-violet-500/20 text-violet-300",
  Business: "bg-emerald-500/20 text-emerald-300",
  Health: "bg-rose-500/20 text-rose-300",
  Sports: "bg-orange-500/20 text-orange-300",
  Entertainment: "bg-pink-500/20 text-pink-300",
  World: "bg-sky-500/20 text-sky-300",
  Politics: "bg-red-500/20 text-red-300",
};

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export default function NewsCard({ article, index }: NewsCardProps) {
  const colorClass =
    CATEGORY_COLORS[article.category] ??
    "from-white/5 to-white/2 border-white/10";
  const badgeClass =
    CATEGORY_BADGE[article.category] ?? "bg-white/10 text-white/60";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group relative rounded-2xl border bg-gradient-to-br ${colorClass} p-5 flex flex-col gap-3 cursor-pointer overflow-hidden`}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

      {/* Category + read time */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}
        >
          {article.category}
        </span>
        <span className="text-xs text-white/40 flex items-center gap-1">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
            />
          </svg>
          {article.readTime} min read
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors duration-200">
        {article.title}
      </h3>

      {/* Body preview */}
      <p className="text-white/50 text-sm leading-relaxed line-clamp-3 flex-1">
        {article.body}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-[10px] font-bold">
            {article.userId}
          </div>
          <span className="text-white/40 text-xs">Author {article.userId}</span>
        </div>
        <motion.span
          whileHover={{ x: 3 }}
          className="text-white/40 group-hover:text-white/70 transition-colors duration-200 text-xs flex items-center gap-1"
        >
          Read more
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.span>
      </div>
    </motion.article>
  );
}
