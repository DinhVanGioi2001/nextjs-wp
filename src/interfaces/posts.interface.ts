interface Post {
  slug: string;
  date: string;
  title: string;
}

interface PostData {
  edges: { node: Post }[];
}
export type { Post, PostData};