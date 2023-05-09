// @ts-check

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
