// For App Router (app directory)
// app/page.js

import Link from 'next/link';

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

async function fetchPages() {
  try {
    // Use fallback URL for build time when env var might not be available
    const baseUrl = process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/pages`, {
      cache: 'no-store', // Disable caching for fresh data
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

export default async function HomePage() {
  let pages = [];
  
  try {
    pages = await fetchPages();
  } catch (error) {
    console.error('Failed to fetch pages during build:', error);
    // Return empty pages array for build time
    pages = [];
  }
  
  console.log('Fetched pages:', pages);
  
  return (
    <main style={{ padding: '20px' }}>
      <h1>Welcome to My Next.js Site!</h1>
      <p>Content fetched from Payload CMS:</p>
      <ul>
        {pages.length > 0 ? (
          pages.map((page) => (
            <li key={page.id}>
              <Link href={`/pages/${page.slug}`}>
                {page.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No pages found. Add some in Payload CMS!</li>
        )}
      </ul>
      <p>
        Go to <a href={`${process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'}/admin`} target="_blank" rel="noopener noreferrer">Payload CMS Admin</a> to add content.
      </p>
    </main>
  );
}