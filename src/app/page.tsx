import Link from 'next/link'

export default function Home() {
  return (
    <main className="container">
      <h1>Payload CMS</h1>
      <p>Welcome to your Payload CMS application.</p>
      <p>
        Visit <Link href="/admin">/admin</Link> to access the admin panel.
      </p>
    </main>
  )
}
