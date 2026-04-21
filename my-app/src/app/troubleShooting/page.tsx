import Link from "next/link";
import { get } from "@/utils/apiClient";
import type { PageResponse, PostSummary } from "@/types/api";

export const revalidate = 60;

async function fetchPosts() {
  try {
    return await get<PageResponse<PostSummary>>(
      "/api/posts?type=troubleShooting&size=50"
    );
  } catch {
    return null;
  }
}

export default async function TroubleShootingPage() {
  const data = await fetchPosts();
  const posts = data?.content ?? [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 lg:text-3xl">트러블 슈팅</h1>
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
              <div className="flex items-center justify-between">
                <time className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">
                  {post.publishedAt}
                </time>
                <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                  <span>👁 {post.viewCount}</span>
                  <span>❤️ {post.likeCount}</span>
                  <span>💬 {post.commentCount}</span>
                </div>
              </div>
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
