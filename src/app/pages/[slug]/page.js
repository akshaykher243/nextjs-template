// app/pages/[slug]/page.js

import Link from 'next/link';

async function fetchPage(slug) {
  try {
    const response = await fetch(`${process.env.PAYLOAD_URL}/api/pages?where[slug][equals]=${slug}`, {
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
  const page = await fetchPage(params.slug);
  
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
  const page = await fetchPage(params.slug);
  
  return {
    title: page ? page.title : 'Page Not Found',
  };
}
