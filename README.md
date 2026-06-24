# Mood Board Generator

Beschrijf een sfeer in tekst — bijvoorbeeld "rustig café in de herfst, warm licht" —
en krijg direct een passend kleurenpalet, lettertype en sfeer-tag.

Werkt in zes talen: Engels, Nederlands, Arabisch, Frans, Duits en Spaans.
De tool herkent sfeerwoorden ongeacht de taal en koppelt ze aan een gedeeld
systeem van ~40 visuele concepten (cozy, calm, industrial, romantic, ...).

## Hoe het werkt

1. **Concepten** (`src/data/concepts.js`) — taalonafhankelijke definities:
   elk concept heeft een kleurenpalet en een lettertype.
2. **Vertalingen** (`src/data/translations/{en,nl,ar,fr,de,es}.js`) — per taal
   een lijst woorden/synoniemen die naar een concept verwijzen, plus vertaalde
   sfeer-tags.
3. **Matcher** (`src/lib/matcher.js`) — normaliseert en tokeniseert de invoer,
   matcht woorden (met lichte stemming voor verbuigingen) tegen alle taalwoordenboeken,
   en kiest het concept met de meeste treffers.

## Starten

```bash
npm install
npm run dev
```

## Bouwen

```bash
npm run build
```

## Een nieuw concept toevoegen

1. Voeg het concept toe aan `src/data/concepts.js` (kleuren + font).
2. Voeg in elk taalbestand onder `src/data/translations/` de bijbehorende
   woorden en een vertaalde tag toe.

## Een nieuwe taal toevoegen

1. Maak `src/data/translations/{taalcode}.js` met een `words`- en `tags`-object,
   naar het voorbeeld van de bestaande bestanden.
2. Importeer en registreer de taal in `src/data/index.js`.
