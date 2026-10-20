// Základné údaje o Sip Spote. Keď sa niečo zmení (napr. firma na s.r.o.), stačí upraviť tu.
export const site = {
  name: 'Sip Spot',
  tagline: 'Mobile bar catering · Bratislava',
  description:
    'Mobilný bar, tastingy a koktailové workshopy pre firmy. Nápoje, servis a atmosféra na mieru, po celom Slovensku.',
  url: 'https://www.sipspotbar.sk',
  phone: '+421 907 912 498',
  phoneHref: 'tel:+421907912498',
  email: 'martin.sipspot@gmail.com',
  instagram: { handle: '@sip.spotbar', url: 'https://www.instagram.com/sip.spotbar' },
  company: {
    // TODO: po prechode na s.r.o. aktualizovať obchodné meno, IČO a adresu.
    name: 'Martin Čudrnák Peller',
    ico: '55136982',
    address: ['Plynárenská 19566/8', '821 09 Bratislava-Ružinov'],
  },
};

export const nav = [
  { label: 'Akcie', href: '/akcie/' },
  { label: 'O nás', href: '/#onas' },
  { label: 'Blog', href: '/blog/' },
];

// Referencie zo súčasného webu.
export const testimonials = [
  { quote: 'Perfektný servis a výborné drinky. Boli ste highlight nášho večierka!', author: 'Anna K., marketing, CreativeCo' },
  { quote: 'Profesionálny a zároveň priateľský prístup. Určite využijeme znovu.', author: 'Peter D., Event manager, Triexpo' },
  { quote: 'Na našej svadbe ste vytvorili tú najlepšiu atmosféru. Ďakujeme!', author: 'Lucia a Ján, svadobný pár' },
];

// Fotky z eventov v public/images/eventy/ (event01.jpg … event17.jpg).
export const eventPhotos = Array.from({ length: 17 }, (_, i) => ({
  src: `/images/eventy/event${String(i + 1).padStart(2, '0')}.jpg`,
  alt: 'Sip Spot na evente',
}));
