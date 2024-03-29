// @ts-check
if (!process.env.WORDPRESS_API_URL) {
  throw new Error(`
    Please provide a valid WordPress instance URL.
    Add to your environment variables WORDPRESS_API_URL.
  `)
}


/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  basePath: '',
  async rewrites() {
    return [
      {
        source: '/:slug',
        destination: '/posts/:slug',
      },
      {
        source: "/vi/:slug",
        destination: "/posts/:slug",
      },
    ]
  },
}

module.exports = nextConfig
