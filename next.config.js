/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/reports',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
