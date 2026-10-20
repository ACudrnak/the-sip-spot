import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blogové články: jeden .md súbor = jeden článok v src/content/blog/.
// Názov súboru je adresa článku (paloma-historia-a-recept.md → /blog/paloma-historia-a-recept/).
// Tento formát musí dodržať aj n8n workflow, ktorý články generuje.
export const BLOG_CATEGORIES = [
  'Drinky doma',
  'Recenzie barov',
  'Rozhovory',
  'Novinky',
  'História',
  'Techniky',
] as const;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    date: z.coerce.date(),
    category: z.enum(BLOG_CATEGORIES),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Sip Spot'),
    tags: z.array(z.string()).default([]),
    video: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
