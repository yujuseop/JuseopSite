import Link from "next/link";
import { getAllPosts } from "@/utils/mdUtils";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="hover:text-blue-600"
          >
            <article className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.description}</p>
              <time className="text-sm text-gray-500">{post.date}</time>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
