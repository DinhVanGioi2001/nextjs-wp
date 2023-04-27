import { getAllPostSlugs } from '../../../lib/api';

export default function Blog() {
    return (
        <div>
            hello
        </div>
    )
}

// export async function getStaticPaths() {
//     const posts = await getAllPostSlugs();

//     const paths = posts.map((post) => ({
//         params: { slug: post.slug },
//     }))
//     const { params } = paths;
//     console.log(params)
//     return { paths, fallback: false }
// }
