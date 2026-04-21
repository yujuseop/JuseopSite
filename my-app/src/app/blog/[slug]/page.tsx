import { get } from "@/utils/apiClient";
import type { Post } from "@/types/api";
import { marked } from "marked";
import ViewCounter from "@/components/ui/ViewCounter";
import LikeButton from "@/components/ui/LikeButton";
import CommentSection from "@/components/ui/CommentSection";

export const revalidate = 60;

async function fetchPost(slug: string): Promise<Post | null> {
  try {
    return await get<Post>(`/api/posts/${slug}`);
  } catch {
    return null;
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-400">
        포스트를 불러올 수 없습니다.
      </div>
    );
  }

  const contentHtml = await marked(post.content);

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 lg:text-3xl">{post.title}</h1>

      <div className="flex items-center justify-between mb-8">
        <time className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">
          {post.publishedAt}
        </time>
        <div className="flex items-center gap-3">
          <ViewCounter slug={slug} initialCount={post.viewCount} />
          <LikeButton slug={slug} initialCount={post.likeCount} />
        </div>
      </div>

      <div
        className="prose prose-sm lg:prose-base dark:prose-invert max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <hr className="my-12 border-border" />

      <CommentSection slug={slug} initialComments={[]} />
    </article>
  );
}
