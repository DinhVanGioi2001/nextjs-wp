import { Post } from "@/interfaces/posts.interface";
import { GetStaticProps } from "next";
import { getAllPostHome } from "../../lib/api";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";

interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: { posts: any }) {
  return (
    <div>
      {posts.map((post: any) => (
        <Card key={post.slug}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Link href={`/${post.slug}`} passHref>
              Read More
            </Link>
          </CardContent>
        </Card>
      ))}
      <Card key="dmo">
        <CardContent>
          <Link href={`/en/demo`} passHref>
            EN
          </Link>
        </CardContent>
        <CardContent>
          <Link href="/vi/demo">Go to demo page</Link>
        </CardContent>
      </Card>
    </div>
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
