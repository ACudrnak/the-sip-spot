// Všetky typy akcií, ktoré Sip Spot ponúka. Každá má vlastnú stránku /akcie/<slug>/.
// Polia s hodnotou null sa na webe zobrazia ako „Na vyžiadanie“ — doplniť, keď budú známe.

export interface Akcia {
  slug: string;
  title: string;
  kicker: string;
  short: string;
  intro: string[];
  forWho: string[];
  included: string[];
  steps: { title: string; text: string }[];
  format: {
    duration: string | null;
    capacity: string | null;
    price: string | null;
    location: string | null;
  };
  illustration: string;
  badge?: string;
  featured?: boolean;
}

export const akcie: Akcia[] = [
  {
    slug: 'mobilny-bar',
    title: 'Mobilný bar na event',
    kicker: 'Svadby · firmy · oslavy · festivaly',
    short: 'Privezieme bar, barmana aj drinky. Vy si užívate akciu.',
    intro: [
      'Sip Spot je mobilný nápojový catering, ktorý prináša barový zážitok tam, kde ho najviac potrebujete: na svadbu, firemnú párty, oslavu narodenín alebo festival.',
      'Pripravujeme klasiku, sezónne signature drinky aj nealko alternatívy, vždy z čerstvých surovín a s úsmevom.',
    ],
    forWho: ['Svadby', 'Firemné večierky', 'Oslavy a narodeniny', 'Festivaly a verejné akcie'],
    included: ['Bar', 'Barman', 'Ingrediencie a ľad', 'Poháre', 'Doprava'],
    steps: [
      { title: 'Napíšte nám', text: 'Kedy, kde, koľko hostí a aký typ akcie.' },
      { title: 'Pripravíme ponuku', text: 'Zdarma a nezáväzne, zvyčajne do 24 hodín.' },
      { title: 'Doladíme drinky', text: 'Menu podľa vašich chutí, aj signature drink na mieru.' },
      { title: 'Postavíme bar', text: 'Prídeme, rozložíme bar a postaráme sa o všetko.' },
    ],
    format: { duration: null, capacity: null, price: null, location: 'Celé Slovensko' },
    illustration: '/images/ilustracie/bar.svg',
    featured: true,
  },
  {
    slug: 'firemne-workshopy',
    title: 'Koktailový workshop pre firmy',
    kicker: 'Teambuilding',
    short: 'Váš tím sa naučí namiešať alko aj nealko drinky. Pod vedením barmana.',
    intro: [
      'Firemný večierok nemusí byť len o tom, že niekto mieša drinky za vás. Na koktailovom workshope si celý tím vyskúša prácu za barom a namieša vlastné drinky.',
      'Ukážeme základné techniky, klasické recepty aj nealko verzie, takže sa zapojí naozaj každý.',
    ],
    forWho: ['Firemné teambuildingy', 'Oslavy úspechov tímu', 'Onboarding nových kolegov', 'Vianočné a letné párty'],
    included: ['Barman, ktorý workshop vedie', 'Náčinie pre účastníkov', 'Suroviny a ľad', 'Poháre', 'Recepty na odnesenie'],
    steps: [
      { title: 'Dohodneme sa', text: 'Termín, miesto, počet ľudí a či chcete aj nealko verziu.' },
      { title: 'Privezieme všetko', text: 'Bar, náčinie, suroviny a poháre. Vy zabezpečíte priestor.' },
      { title: 'Miešate s nami', text: 'Každý si namieša svoje drinky pod vedením barmana.' },
      { title: 'Recept domov', text: 'Recepty si odnesiete, aby ste ich zvládli aj doma.' },
    ],
    format: { duration: null, capacity: null, price: null, location: null },
    illustration: '/images/ilustracie/workshop.svg',
    badge: 'Novinka',
  },
  {
    slug: 'tastingy',
    title: 'Tastingy',
    kicker: 'Lokálne aj súkromné',
    short: 'Ochutnávky vybraných spiritov alebo mixov s výkladom barmana.',
    intro: [
      'Na tastingu ochutnáte vybrané spirity alebo mixy a dozviete sa, čím sa líšia, ako sa vyrábajú a ako ich piť.',
      'Pripravíme ho pre partiu priateľov, firmu aj ako súčasť väčšej akcie.',
    ],
    forWho: ['Súkromné stretnutia', 'Firemné akcie', 'Oslavy', 'Klienti a partneri'],
    included: ['Výber spiritov alebo mixov', 'Výklad barmana', 'Poháre', 'Doprava'],
    steps: [
      { title: 'Vyberieme tému', text: 'Napríklad gin, rum, whisky alebo nealko mixy.' },
      { title: 'Dohodneme formát', text: 'Počet ľudí, miesto a dĺžku.' },
      { title: 'Ochutnávate', text: 'Barman vás prevedie každou vzorkou.' },
    ],
    format: { duration: null, capacity: null, price: null, location: null },
    illustration: '/images/ilustracie/tasting.svg',
    badge: 'Novinka',
  },
];
