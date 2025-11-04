import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    remotePatterns:
      process.env.S3_ENABLED === 'true'
        ? [
            {
              protocol: 'https',
              hostname: '**.r2.cloudflarestorage.com',
            },
          ]
        : [],
  },
}

export default withPayload(nextConfig)
