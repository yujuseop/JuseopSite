import { getPostData, getAllPostIds } from "@/utils/mdUtils";
import { marked } from "marked";

export function generateStaticParams() {
  return getAllPostIds();
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostData(slug);
  const contentHtml = marked(post.content);

  return (
    <article className="container mx-auto px-4 py-8 prose-content">
      <h1 className="text-2xl font-bold mb-4 lg:text-3xl">{post.title}</h1>
      <div
        className="text-black dark:text-white text-sm lg:text-base"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
      <time className="text-gray-500 mb-8 block text-right dark:text-white-500 text-xs lg:text-base">
        {post.date}
      </time>
    </article>
  );
}
