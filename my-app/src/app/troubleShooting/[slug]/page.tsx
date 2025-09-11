import {
  getTroubleShootingData,
  getAllTroubleShootings,
} from "@/utils/mdUtils";
import { marked } from "marked";

export function generateStaticParams() {
  return getAllTroubleShootings();
}

export default async function TroubleShootingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getTroubleShootingData(slug);
  const contentHtml = marked(post.content);

  return (
    <article className="container mx-auto px-4 py-8 prose-content">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      <time className="text-gray-500 mb-8 block text-right">{post.date}</time>
    </article>
  );
}
