import React from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import { getAllPostSlugs } from "../../lib/api";

const EXTERNAL_DATA_URL = "https://nextjs-wp-xi.vercel.app";

function Sitemap({ posts }: any) {
  return (
    <>
      <Main>
        <Head>
          <title>XML Sitemap</title>
        </Head>
        <h1>XML Sitemap</h1>
        <p className="expl">
          Generated by
          <a href="https://ptemagic.com/"> PTE Magic</a>, this is an XML
          Sitemap, meant for consumption by search engines.
          <br />
          <br />
          You can find more information about XML sitemaps on
          <a href="https://sitemaps.org/"> sitemaps.org</a>
        </p>
        <p className="expl">This XML Sitemap Index file contains 4 sitemaps.</p>
        <table id="sitemap" cellPadding={3}>
          <thead>
            <tr>
              <th style={{ width: "75%" }}>Sitemap</th>
              <th style={{ width: "25%" }}>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: any) => (
              <>
                <tr>
                  <td>
                    <a href={`${EXTERNAL_DATA_URL}/${post.slug}`}>
                      {EXTERNAL_DATA_URL}/{post.slug}
                    </a>
                  </td>
                  <td>{post.date}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </Main>
    </>
  );
}

export default Sitemap;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPostSlugs();
  return {
    props: { posts },
    revalidate: 10,
  };
};

const Main = styled("div")`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 15px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #545353;

  table {
    border: none;
    border-collapse: collapse;
  }
  #sitemap {
    width: 80%;
  }
  #sitemap tr:nth-child(odd) td {
    background-color: #eee !important;
  }
  #sitemap tbody tr:hover td {
    background-color: #ccc;
  }
  #sitemap tbody tr:hover td,
  #sitemap tbody tr:hover td a {
    color: #000;
  }
  .expl {
    margin: 18px 3px;
    line-height: 1.2em;
  }
  .expl a {
    color: #da3114;
    font-weight: 600;
  }
  .expl a:visited {
    color: #da3114;
  }
  a {
    color: #000;
    text-decoration: none;
  }
  a:visited {
    color: #777;
  }
  a:hover {
    text-decoration: underline;
  }
  td {
    font-size: 11px;
  }
  th {
    text-align: left;
    padding-right: 30px;
    font-size: 11px;
  }
  thead th {
    border-bottom: 1px solid #000;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
`;
