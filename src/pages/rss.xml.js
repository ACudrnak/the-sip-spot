import rss from '@astrojs/rss';
import { getPosts } from '../lib/blog';
import { site } from '../data/site';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: 'Sip Spot — blog',
    description: site.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: `/blog/${p.id}/`,
      categories: [p.data.category, ...p.data.tags],
    })),
    customData: '<language>sk</language>',
  });
}
