// app/pages/[slug]/page.js

import Link from 'next/link';

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

async function fetchPage(slug) {
  try {
    // Use fallback URL for build time when env var might not be available
    const baseUrl = process.env.PAYLOAD_URL || process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/pages?where[slug][equals]=${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    
    const data = await response.json();
    return data.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function PageDetail({ params }) {
  let page = null;
  
  try {
    page = await fetchPage(params.slug);
  } catch (error) {
    console.error('Failed to fetch page during build:', error);
    // Return null for build time
    page = null;
  }
  
  if (!page) {
    return (
      <main style={{ padding: '20px' }}>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link href="/">← Back to Home</Link>
      </main>
    );
  }
  
  return (
    <main style={{ padding: '20px' }}>
      <h1>{page.title}</h1>
      {page.content && (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      )}
      <br />
      <Link href="/">← Back to Home</Link>
    </main>
  );
}

export async function generateMetadata({ params }) {
  let page = null;
  
  try {
    page = await fetchPage(params.slug);
  } catch (error) {
    console.error('Failed to fetch page metadata during build:', error);
    page = null;
  }
  
  return {
    title: page ? page.title : 'Page Not Found',
  };
}
