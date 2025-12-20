// This component is now responsible for redirecting from the root to /en
// It satisfies the Next.js build requirement for a root page.

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/en');
}
