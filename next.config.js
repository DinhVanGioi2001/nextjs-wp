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
        source: "/vi/demo",
        destination: "/listpost/list",
      },
      {
        source: "/en/demo",
        destination: "/listpost/list",
      },
    ]
  },
}

module.exports = nextConfig
