import Link from "next/link";
import { getPosts } from "@/utils/posts";

export default function TroubleShootingPage() {
  const posts = getPosts("troubleShooting");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 lg:text-3xl">트러블슈팅</h1>
      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/troubleShooting/${post.slug}`}
            className="hover:text-blue-600"
          >
            <article className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold mb-2 lg:text-xl">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm lg:text-base">
                {post.description}
              </p>
              <time className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">
                {post.date}
              </time>
            </article>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            아직 게시글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
