/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/website',
        destination: 'https://sasja-antwerpen.be',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
