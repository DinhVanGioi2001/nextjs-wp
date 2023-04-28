import { Post } from "@/interfaces/posts.interface";

const API_WP = "http://localhost/wp-graphql/index.php?graphql";

export async function fetchApi(
  query: string,
  // { variable }: { variable?: object } = {}
  { variables }: { variables?: { id: string; idType: string } } = {}
) {
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    query,
    variables,
  };
  const res = await fetch(API_WP, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
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

export async function getAllPosts() {
  const data = await fetchApi(`
  {
    posts(first: 1000) {
        edges {
            node {
                title
                excerpt
                slug
                date
                featuredImage {
                    node {
                        sourceUrl
                    }
                }
                categories {
                    nodes {
                        name
                        slug
                    }
                }
            }
        }
    }
  }
  `);
  return data?.posts.edges;
}

export async function getPostAndMorePosts(slug_require: string) {
  const data = await fetchApi(
    `
    query SinglePost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        title
        date
        content
        slug
      }
  }`,
    {
      variables: {
        id: slug_require,
        idType: "SLUG",
      },
    }
  );

  return data?.post;
}
