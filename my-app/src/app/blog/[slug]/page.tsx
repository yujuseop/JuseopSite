import { getPostData, getAllPostIds } from "@/utils/mdUtils";
import { marked } from "marked";

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostData(params.slug);
  const contentHtml = marked(post.content);

  return (
    <article className="container mx-auto px-4 py-8 prose prose-lg">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <time className="text-gray-500 mb-8 block">{post.date}</time>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
