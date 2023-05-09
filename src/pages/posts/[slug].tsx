import { styled } from "@mui/material";
import { getAllPostSlugs, getPostAndMorePosts } from "../../../lib/api";
import SEOHead from "@/components/seohead";

export default function Blog({ blogs }: { blogs: any }) {
  return (
    <>
      <SEOHead
        slugCurrent={blogs.slug}
        title={blogs.title}
        languageCurent={blogs.language}
        description={blogs.excerpt}
        translations={blogs.translations}
      />
      <Main>
        <div>
          <h1>{blogs.title}</h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogs.content }} />
      </Main>
    </>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  const data = await getPostAndMorePosts(params.slug);
  return {
    props: { blogs: data },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPostSlugs();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

const Main = styled("div")`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 15px;
  .post-div {
    margin-top: 4rem;
  }
`;
