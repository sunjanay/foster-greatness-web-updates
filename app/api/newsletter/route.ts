import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID

  if (!apiKey || !publicationId) {
    return NextResponse.json({ error: 'Missing Beehiiv configuration' }, { status: 500 })
  }

  try {
    // Fetch posts published to both email AND web
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts?status=confirmed&platform=both&limit=10&order_by=publish_date&direction=desc`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    )

    if (!response.ok) {
      throw new Error(`Beehiiv API error: ${response.status}`)
    }

    const data = await response.json()
    const now = Math.floor(Date.now() / 1000) // Current time in Unix seconds

    // Filter for only actually published posts (publish_date in the past)
    const publishedPosts = (data.data || []).filter(
      (post: { publish_date: number }) => post.publish_date && post.publish_date <= now
    )

    if (publishedPosts.length === 0) {
      return NextResponse.json({ error: 'No published newsletters found' }, { status: 404 })
    }

    // Return up to 3 newsletters
    const newsletters = publishedPosts.slice(0, 3).map((post: { id: string; title: string; subtitle: string; thumbnail_url: string; web_url: string; publish_date: number }) => ({
      id: post.id,
      title: post.title,
      subtitle: post.subtitle,
      thumbnail_url: post.thumbnail_url,
      web_url: post.web_url,
      publish_date: post.publish_date,
    }))

    return NextResponse.json(newsletters)
  } catch (error) {
    console.error('Error fetching newsletter:', error)
    return NextResponse.json({ error: 'Failed to fetch newsletter' }, { status: 500 })
  }
}
