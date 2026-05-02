import { NewsArticle } from "./types";

const CATEGORIES = [
  "Technology",
  "Science",
  "Business",
  "Health",
  "Sports",
  "Entertainment",
  "World",
  "Politics",
];

function getCategory(userId: number): string {
  return CATEGORIES[userId % CATEGORIES.length];
}

function getReadTime(body: string): number {
  const words = body.match(/\b\w+\b/g)?.length ?? 0;
  return Math.max(1, Math.ceil(words / 200));
}

export async function fetchNews(): Promise<NewsArticle[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=12",
    { next: { revalidate: 300 } }
  );
  if (!response.ok) throw new Error("News API request failed");

  const posts: Array<{ id: number; title: string; body: string; userId: number }> =
    await response.json();

  return posts.map((post) => ({
    id: post.id,
    title: post.title
      .split(" ")
      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    body: post.body.replace(/\n/g, " "),
    userId: post.userId,
    category: getCategory(post.userId),
    readTime: getReadTime(post.body),
  }));
}
