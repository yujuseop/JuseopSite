"use client";

import { useState } from "react";
import { post } from "@/utils/apiClient";
import type { Comment } from "@/types/api";

interface Props {
  slug: string;
  initialComments: Comment[];
}

export default function CommentSection({ slug, initialComments }: Props) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const newComment = await post<Comment>(`/api/comments/${slug}`, {
        authorName: authorName.trim(),
        content: content.trim(),
      });
      setComments((prev) => [...prev, newComment]);
      setAuthorName("");
      setContent("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">
        댓글 <span className="text-sm font-normal text-muted-foreground">{comments.length}개</span>
      </h3>

      {/* 댓글 목록 */}
      <ul className="space-y-4">
        {comments.map((c) => (
          <li
            key={c.id}
            className="rounded-xl border border-border bg-card p-4 space-y-1"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{c.authorName}</span>
              <time className="text-xs text-muted-foreground">
                {new Date(c.createdAt).toLocaleDateString("ko-KR")}
              </time>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {c.content}
            </p>
          </li>
        ))}
        {comments.length === 0 && (
          <li className="text-center text-sm text-muted-foreground py-6">
            첫 댓글을 남겨보세요!
          </li>
        )}
      </ul>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="이름"
          maxLength={100}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력하세요..."
          maxLength={1000}
          rows={3}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting || !authorName.trim() || !content.trim()}
          className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "등록 중..." : "댓글 등록"}
        </button>
      </form>
    </section>
  );
}
