import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">블로그</h1>
      <div className="grid gap-6">
        {/* 여기에 블로그 포스트 목록을 매핑하세요 */}
        <article className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">
            <Link href="/blog/first-post" className="hover:text-blue-600">
              첫 번째 블로그 포스트
            </Link>
          </h2>
          <p className="text-gray-600">블로그 포스트 미리보기 내용</p>
        </article>
      </div>
    </div>
  );
}
