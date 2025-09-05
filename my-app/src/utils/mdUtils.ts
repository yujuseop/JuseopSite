import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/posts/blog");
const troubleDirectory = path.join(process.cwd(), "src/posts/troubleShooting");

export interface PostData {
  id: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

// 블로그 포스트 관련 함수들
export function getAllPostIds() {
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: slug,
    title: data.title,
    date: data.date,
    description: data.description,
    content: content,
  };
}

export function getAllPosts(): PostData[] {
  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getPostData(slug);
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 트러블 슈팅 관련 함수들
export function getAllTroubleShootingIds() {
  const fileNames = fs.readdirSync(troubleDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getTroubleShootingData(slug: string): PostData {
  const fullPath = path.join(troubleDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    id: slug,
    title: data.title,
    date: data.date,
    description: data.description,
    content: content,
  };
}

export function getAllTroubleShootings(): PostData[] {
  const fileNames = fs.readdirSync(troubleDirectory);
  const allTroubleData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    return getTroubleShootingData(slug);
  });

  return allTroubleData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
