import { getPosts, getPost } from "@/utils/posts";
import { get } from "@/utils/apiClient";
import type { Comment } from "@/types/api";
import CommentSection from "@/components/ui/CommentSection";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getPosts("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, comments] = await Promise.all([
    getPost("blog", slug),
    get<Comment[]>(`/api/comments/${slug}`).catch(() => []),
  ]);

  if (!post) notFound();

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4 lg:text-3xl">{post.title}</h1>

      <div className="mb-8">
        <time className="text-gray-500 dark:text-gray-400 text-xs lg:text-sm">
          {post.date}
        </time>
      </div>

      <div
        className="prose prose-sm lg:prose-base dark:prose-invert max-w-none text-black dark:text-white"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <hr className="my-12 border-border" />

      <CommentSection slug={slug} initialComments={comments} />
    </article>
  );
}
