import { words as en } from './translations/en.js';
import { words as nl } from './translations/nl.js';
import { words as ar } from './translations/ar.js';
import { words as fr } from './translations/fr.js';
import { words as de } from './translations/de.js';
import { words as es } from './translations/es.js';

import { tags as enTags } from './translations/en.js';
import { tags as nlTags } from './translations/nl.js';
import { tags as arTags } from './translations/ar.js';
import { tags as frTags } from './translations/fr.js';
import { tags as deTags } from './translations/de.js';
import { tags as esTags } from './translations/es.js';

// Alle woordenboeken samengevoegd in één platte structuur.
// Bij overlap (zeldzaam, woorden zijn taal-specifiek) wint de eerst gevonden taal niet:
// de matcher doorzoekt per taal, dus duplicaten over talen heen zijn geen probleem.
export const dictionaries = { en, nl, ar, fr, de, es };
export const tagDictionaries = { en: enTags, nl: nlTags, ar: arTags, fr: frTags, de: deTags, es: esTags };

export const supportedLanguages = ['en', 'nl', 'ar', 'fr', 'de', 'es'];
