import { redirect } from 'next/navigation';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

// /book is a friendly URL that redirects to the configured booking URL.
// Useful for sharing as a CTA ("/book" is shorter than a Cal.com URL).
export const metadata = buildMetadata({
  title: 'Book a growth call',
  description: '30 minutes with a senior partner. We review your funnel, channels, and unit economics.',
  path: '/book',
  noindex: true,
});

export default function BookPage() {
  redirect(site.bookingUrl);
}
