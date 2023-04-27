import { Post } from "@/interfaces/posts.interface";
import { GetStaticProps } from "next";
import { getAllPostHome } from "../../lib/api";
import { CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Main>
        <div>
          <h1>Pte-magic Blog</h1>
          <p>Blog example</p>
        </div>
        <div>
          <h2>Blog</h2>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={3} md={2}>
                <CardActionArea
                  style={{ background: "#999999", borderRadius: "10px" }}
                  key={post.slug}
                >
                  <CardActionArea sx={{ maxWidth: 345, minHeight: 200 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Link href={`/blogs/` + post.slug} passHref>
                        {post.title}
                      </Link>
                    </CardContent>
                  </CardActionArea>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </div>
      </Main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getAllPostHome();
  return {
    props: { posts },
  };
};

const Main = styled("div")`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 15px;
  .post-div {
    margin-top: 4rem;
  }
`;
