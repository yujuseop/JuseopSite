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
    <article className="container mx-auto px-4 py-8 prose prose-lg">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500 mb-8 block">{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
