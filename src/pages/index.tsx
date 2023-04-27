import { Post } from '@/interfaces/posts.interface'
import { GetStaticProps } from 'next'
import { getAllPostHome } from '../../lib/api'

interface HomeProps {
  posts: Post[];
}
export default function Home({ posts }: HomeProps) {
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <p>{post.slug}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}


export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const posts = await getAllPostHome();
  return {
    props: { posts },
  };
};