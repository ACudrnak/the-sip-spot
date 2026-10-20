import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blogové články: jeden .md súbor = jeden článok v src/content/blog/.
// Názov súboru je adresa článku (paloma-historia-a-recept.md → /blog/paloma-historia-a-recept/).
// Tento formát musí dodržať aj n8n workflow, ktorý články generuje. Popis všetkých polí je v README.md.

export const BLOG_CATEGORIES = [
  'Drinky doma',
  'Recenzie barov',
  'Rozhovory',
  'Novinky',
  'História',
  'Techniky',
] as const;

/** Typ článku = šablóna. Určuje, čo sa zvýrazní v úvode článku. */
export const POST_TYPES = ['pribeh', 'recept', 'recenzia', 'rozhovor', 'navod', 'novinka'] as const;
/** Variant úvodu článku. */
export const HERO_VARIANTS = ['split', 'fullbleed', 'typo'] as const;
/** Farebný akcent článku. */
export const ACCENTS = ['zelena', 'bezova', 'tmava', 'grapefruit'] as const;

const text = z.object({ type: z.literal('text'), md: z.string() });

const recipe = z.object({
  type: z.literal('recipe'),
  title: z.string().default('Recept'),
  time: z.string().optional(),
  servings: z.string().optional(),
  glass: z.string().optional(),
  difficulty: z.enum(['ľahké', 'stredné', 'náročné']).optional(),
  ingredients: z.array(z.string()).min(1),
  steps: z.array(z.string()).min(1),
  quick: z.string().optional(),
  nonAlcoholic: z.string().optional(),
  video: z.string().url().optional(),
});

const timeline = z.object({
  type: z.literal('timeline'),
  title: z.string().optional(),
  items: z.array(z.object({ year: z.string(), text: z.string() })).min(2),
});

const myths = z.object({
  type: z.literal('myths'),
  title: z.string().default('Mýty a fakty'),
  items: z.array(z.object({ myth: z.string(), truth: z.string() })).min(1),
});

const quote = z.object({ type: z.literal('quote'), text: z.string(), author: z.string().optional() });

const facts = z.object({
  type: z.literal('facts'),
  title: z.string().optional(),
  items: z.array(z.object({ value: z.string(), label: z.string() })).min(2).max(6),
});

const tips = z.object({
  type: z.literal('tips'),
  title: z.string().default('Tipy od barmana'),
  items: z.array(z.object({ title: z.string(), text: z.string() })).min(1),
});

const steps = z.object({
  type: z.literal('steps'),
  title: z.string().optional(),
  items: z.array(z.object({ title: z.string(), text: z.string() })).min(2),
});

const dosDonts = z.object({
  type: z.literal('dosDonts'),
  title: z.string().default('Častá chyba vs. správne'),
  items: z.array(z.object({ wrong: z.string(), right: z.string() })).min(1),
});

const rating = z.object({
  type: z.literal('rating'),
  title: z.string().default('Naše hodnotenie'),
  items: z.array(z.object({ label: z.string(), score: z.number().min(0).max(5) })).min(1),
  verdict: z.string().optional(),
});

const place = z.object({
  type: z.literal('place'),
  name: z.string(),
  area: z.string().optional(),
  address: z.string().optional(),
  hours: z.string().optional(),
  price: z.string().optional(),
  order: z.array(z.string()).optional(),
  mapUrl: z.string().url().optional(),
  web: z.string().url().optional(),
  instagram: z.string().optional(),
});

const profile = z.object({
  type: z.literal('profile'),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string().optional(),
});

const qa = z.object({
  type: z.literal('qa'),
  title: z.string().optional(),
  items: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
});

const podcast = z.object({
  type: z.literal('podcast'),
  episode: z.string().optional(),
  title: z.string(),
  duration: z.string().optional(),
  url: z.string().url().optional(),
  platforms: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
});

const gallery = z.object({
  type: z.literal('gallery'),
  title: z.string().optional(),
  images: z.array(z.object({ src: z.string(), alt: z.string() })).min(2),
});

const product = z.object({
  type: z.literal('product'),
  kicker: z.string().default('Odporúčame'),
  title: z.string(),
  text: z.string(),
  price: z.string().optional(),
  url: z.string(),
  cta: z.string().default('Pozrieť'),
  image: z.string().optional(),
});

const callout = z.object({
  type: z.literal('callout'),
  title: z.string().optional(),
  text: z.string(),
  tone: z.enum(['info', 'pozor', 'tip']).default('info'),
});

const sources = z.object({
  type: z.literal('sources'),
  items: z.array(z.object({ title: z.string(), url: z.string().url().optional() })).min(1),
});

export const blockSchema = z.discriminatedUnion('type', [
  text, recipe, timeline, myths, quote, facts, tips, steps, dosDonts,
  rating, place, profile, qa, podcast, gallery, product, callout, sources,
]);
export type Block = z.infer<typeof blockSchema>;

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    date: z.coerce.date(),
    category: z.enum(BLOG_CATEGORIES),
    typ: z.enum(POST_TYPES).default('pribeh'),
    hero: z.enum(HERO_VARIANTS).default('split'),
    accent: z.enum(ACCENTS).default('zelena'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    author: z.string().default('Sip Spot'),
    tags: z.array(z.string()).default([]),
    video: z.string().url().optional(),
    blocks: z.array(blockSchema).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
