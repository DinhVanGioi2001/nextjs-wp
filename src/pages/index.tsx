import { Post } from "@/interfaces/posts.interface";
import { GetStaticProps } from "next";
import { getAllPostLanguage } from "../../lib/api";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import { useState } from "react";

interface HomeProps {
  posts: Post[];
  posts2: Post[];
}

export default function Home({ posts, posts2 }: { posts: any; posts2: any }) {
  const [showEn, setShowEn] = useState(true);
  const [showVi, setShowVi] = useState(false);
  const handleClick = (lang: string) => {
    if (lang === "en") {
      setShowEn(true);
      setShowVi(false);
    } else {
      setShowEn(false);
      setShowVi(true);
    }
  };

  return (
    <Main>
      <ButtonGroup color="secondary" aria-label="medium secondary button group">
        <Button onClick={() => handleClick("en")}>EN</Button>
        <Button onClick={() => handleClick("vi")}>VI</Button>
      </ButtonGroup>
      {showEn ? (
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
        </div>
      ) : (
        <div></div>
      )}
      {showVi ? (
        <div>
          {posts2.map((post: any) => (
            <Card key={post.slug}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Link href={`/vi/${post.slug}`} passHref>
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </Main>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getAllPostLanguage("EN");
  const posts2 = await getAllPostLanguage("VI");
  return {
    props: { posts, posts2 },
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
