import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payload Admin',
  description: 'Payload CMS Admin Panel',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
