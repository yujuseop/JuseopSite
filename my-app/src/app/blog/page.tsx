import Link from "next/link";
import { getAllPosts } from "@/utils/mdUtils";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className=" font-bold mb-6 text-2xl lg:text-3xl">블로그</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="hover:text-blue-600"
          >
            <article className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className=" font-semibold mb-2 text-sm lg:text-xl">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-2 text-sm lg:text-xl">
                {post.description}
              </p>
              <time className=" text-gray-500 text-xs lg:text-base">
                {post.date}
              </time>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
