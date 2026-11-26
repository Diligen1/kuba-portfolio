/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/kuba-portfolio",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
