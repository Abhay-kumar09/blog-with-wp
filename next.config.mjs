/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow loading images from the WordPress host used in dev/production
    domains: [
      'dev-blog-with-wp.pantheonsite.io',
      'blog-with-wp.vercel.app',
    ],
  },
};

export default nextConfig;
