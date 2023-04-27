import { Post } from "@/interfaces/posts.interface";

const API_WP = "http://localhost/wordpress/index.php?graphql";

export async function fetchApi(
  query: string,
  { variable }: { variable?: string } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    query,
    variable,
  };
  const res = await fetch(API_WP, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variable,
    }),
  });

  const json = await res.json();
  return json.data;
}

export async function getAllPostSlugs(): Promise<Post[]> {
  const data = await fetchApi(`
    {
        posts(first:10 where: {orderby: {field: DATE, order: DESC}}) {
            edges {
                node {
                    slug	
                }
            }
        }
    }
    `);
  return data.posts.edges.map((edge: any) => edge.node);
}

export async function getAllPostHome(): Promise<Post[]> {
  const data = await fetchApi(`
      {
        posts(first:10 where: {orderby: {field: DATE, order: DESC}}) {
          edges {
            node {
              slug
              title
              content(format: RENDERED)
              date
            }
          }
        }
      }
    `);
  return data.posts.edges.map((edge: any) => edge.node);
}
