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

/** Odhad času čítania z textu článku aj z blokov (200 slov za minútu). */
export function readingTime(post: Post): number {
  const blockText = JSON.stringify(post.data.blocks ?? []).replace(/"[a-zA-Z]+":/g, ' ');
  const words = `${post.body ?? ''} ${blockText}`.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const TYPE_LABELS = {
  pribeh: 'Príbeh',
  recept: 'Recept',
  recenzia: 'Recenzia',
  rozhovor: 'Rozhovor',
  navod: 'Návod',
  novinka: 'Novinka',
} as const;

export function formatDate(d: Date): string {
  return d.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const DEFAULT_POST_IMAGE = '/images/ilustracie/mixing.svg';
