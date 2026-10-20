# Sip Spot — web 2.0

Nový web [sipspotbar.sk](https://www.sipspotbar.sk) postavený na [Astro](https://astro.build). Výsledkom je obyčajný statický web (HTML, CSS, obrázky), ktorý beží zadarmo na GitHub Pages.

## Spustenie na počítači

Jednorazovo nainštaluj [Node.js](https://nodejs.org) (verzia 22 LTS alebo novšia). Potom v Termináli:

```bash
cd ~/work/the-sip-spot
npm install        # stiahne potrebné balíčky (len prvýkrát alebo po zmene package.json)
npm run dev        # spustí náhľad na http://localhost:4321
```

Náhľad sa obnovuje sám pri každom uložení súboru. Zastavíš ho klávesmi `Ctrl + C`.

Ďalšie príkazy:

| Príkaz | Čo robí |
| --- | --- |
| `npm run build` | Zostaví hotový web do priečinka `dist/` (presne to, čo pôjde na internet) |
| `npm run preview` | Ukáže zostavený web z `dist/` |

## Čo kde nájdeš

```
src/
  data/site.ts          kontakty, IČO, menu, referencie, fotky eventov (public/images/eventy/)
  data/akcie.ts         všetky akcie (bar, workshopy, tastingy) – texty, formát, cena
  content/blog/*.md     blogové články (jeden súbor = jeden článok)
  content.config.ts     pravidlá pre články (povinné polia, kategórie)
  pages/                stránky webu (adresa = cesta k súboru)
  components/           opakujúce sa časti (hlavička, pätička, formulár, karty)
  styles/global.css     farby, písma, celý vzhľad
public/                 obrázky, písma, PDF one-pagery, CNAME (kopíruje sa bez zmeny)
.github/workflows/      automatické nasadenie na GitHub Pages
```

### Stránky

| Adresa | Súbor |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/akcie/` | `src/pages/akcie/index.astro` |
| `/akcie/mobilny-bar/`, `/akcie/firemne-workshopy/`, `/akcie/tastingy/` | `src/pages/akcie/[slug].astro` + `src/data/akcie.ts` |
| `/blog/` a `/blog/<nazov-clanku>/` | `src/pages/blog/` + `src/content/blog/` |
| `/zasady-cookies/` | `src/pages/zasady-cookies.astro` |
| `/rss.xml`, `/sitemap-index.xml` | generujú sa automaticky |

## Ako doplniť ceny a detaily akcií

V súbore `src/data/akcie.ts` má každá akcia časť `format`:

```ts
format: { duration: null, capacity: null, price: null, location: 'Celé Slovensko' },
```

Hodnota `null` sa na webe zobrazí ako „Na vyžiadanie“. Stačí ju nahradiť textom, napr. `price: 'od 45 € / osoba'`.
Novú akciu pridáš skopírovaním jedného bloku `{ ... }` a zmenou `slug` (ten bude v adrese).

## Blog: formát článku

Článok je súbor `src/content/blog/<adresa-clanku>.md`. Názov súboru = adresa (malé písmená, bez diakritiky, slová oddelené pomlčkou).
**Tento formát musí dodržať aj n8n workflow, ktorý bude články generovať.**

```markdown
---
title: "Nadpis článku"
description: "Krátky perex do 220 znakov. Zobrazí sa v zozname aj vo vyhľadávači."
date: 2027-01-15
category: "Drinky doma"   # Drinky doma | Recenzie barov | Rozhovory | Novinky | História | Techniky
image: "/images/ilustracie/mojito.svg"   # nepovinné, cesta k obrázku v priečinku public/
imageAlt: "Popis obrázka"                # nepovinné
author: "Sip Spot"                       # nepovinné
tags: ["rum", "recept"]                  # nepovinné
video: "https://youtube.com/..."         # nepovinné, zobrazí tlačidlo s videom
draft: true                              # true = na živom webe sa nezobrazí
---

Text článku v Markdowne. ## Nadpis, **tučné**, *kurzíva*, zoznamy, > citát.
```

- `draft: true` – článok vidíš v lokálnom náhľade (`npm run dev`), ale na živom webe nie je.
- Dátum v budúcnosti – článok sa na živom webe zobrazí až po najbližšom nasadení po tomto dátume.
- Ak chýba povinné pole alebo je zlá kategória, `npm run build` skončí chybou a povie, čo je zle. Živý web ostane na poslednej funkčnej verzii.

### Plánovaný tok s n8n

1. n8n (s Claude) vygeneruje `.md` súbor v tomto formáte.
2. Cez GitHub API vytvorí novú vetvu, pridá súbor a otvorí **pull request**.
3. Človek si článok prečíta (GitHub ukáže text aj zmeny) a klikne **Merge**, alebo PR zavrie.
4. Po Merge do `main` sa web sám zostaví a nasadí (cca 1–2 minúty).

## Dopytový formulár

Formulár je v `src/components/InquiryForm.astro`.

- Bez nastavenia otvorí návštevníkovi e-mail na `martin.sipspot@gmail.com` s vyplnenými údajmi.
- Keď bude hotový n8n webhook, nastav ho v GitHube: **Settings → Secrets and variables → Actions → Variables → `PUBLIC_INQUIRY_ENDPOINT`**. Formulár potom pošle údaje ako JSON na túto adresu.
- Lokálne sa dá vyskúšať cez súbor `.env` (pozri `.env.example`).

## Nasadenie (keď bude web hotový)

Web sa vyvíja vo vetve `novy-web`. Živý web na `main` sa medzitým nemení.

1. V GitHube: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Zlúčiť `novy-web` do `main` (pull request → Merge).
3. Workflow „Nasadenie webu“ zostaví a nasadí web. Doména ostáva vďaka `public/CNAME`.

Staré adresy: `zasady-cookies.html` presmeruje na `/zasady-cookies/`.

## Otvorené body (TODO)

- [ ] Doplniť formát a ceny workshopov a tastingov (`src/data/akcie.ts`).
- [ ] Po prechode na s.r.o. aktualizovať firmu, IČO a adresu (`src/data/site.ts`).
- [ ] Overiť prevádzkovateľa v zásadách cookies – pôvodný web uvádza Ravello s. r. o., čo nesedí s kontaktom.
- [ ] Skontrolovať a zverejniť článok o Palome (`draft: false`).
- [ ] Nastaviť n8n webhook pre formulár.
- [ ] Fotky z workshopov a tastingov namiesto ilustrácií, keď budú.
