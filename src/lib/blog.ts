import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Publikované články, najnovšie prvé.
 * Na živom webe sa nezobrazia články s draft: true ani s dátumom v budúcnosti.
 * Pri lokálnom náhľade (npm run dev) sa zobrazia všetky, aby sa dali skontrolovať.
 */
export async function getPosts(): Promise<Post[]> {
  const now = new Date();
  const showAll = import.meta.env.DEV;
  const posts = await getCollection('blog', ({ data }) => showAll || (!data.draft && data.date <= now));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const DEFAULT_POST_IMAGE = '/images/ilustracie/mixing.svg';
