import { Post } from "@/interfaces/posts.interface";
const API_URL = process.env.WORDPRESS_API_URL as string;

export async function fetchApi(
  query: string,
  { variables }: { variables?: any } = {}
) {
  const headers = new Headers();

  headers.append("Content-Type", "application/json");
  headers.append("crossDomain", "true");

  // if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
  //   headers.append(
  //     "Authorization",
  //     `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  //   );
  // }
  const res = await fetch(API_URL, {
    method: "POST",
    headers: headers,
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

export async function getAllPostLanguage(lang: string) {
  const data = await fetchApi(
    `
  query MyEnglishPosts($language: LanguageCodeFilterEnum = EN) {
    posts(first: 10, where: {language: $language}) {
      nodes {
        id
        slug
        title
      }
    }
  }`,
    {
      variables: {
        language: lang,
      },
    }
  );
  return data?.posts.nodes;
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
    `query MyEnglishPosts($id: ID = "", $idType: PostIdType = SLUG) {
      post(idType: $idType, id: $id) {
        title
        date
        content
        slug
        excerpt
        language {
          name
          locale
          slug
        }
        translations {
          slug
          language {
            code
            slug
            locale
            name
          }
        }
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
