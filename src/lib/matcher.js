import { concepts } from '../data/concepts.js';
import { dictionaries, tagDictionaries, supportedLanguages } from '../data/index.js';

// Eenvoudige normalisatie: kleine letters, leestekens weg, witruimte opschonen.
// Arabisch heeft geen hoofdletters maar wel diakritische tekens (tashkeel) die we verwijderen.
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '') // Arabische diakritische tekens
    .replace(/[.,!?;:"'()،؛؟]/g, '')
    .trim();
}

// Lichte stemming voor Latijnse talen: strip veelvoorkomende suffixen zodat
// "calming", "calme", "calmo" e.d. nog steeds matchen op het basiswoord "calm".
// Geen stemming voor Arabisch (andere morfologie, zou te veel false positives geven).
// Strip eerst grotere, betekenisvolle suffixen, daarna tot twee trailing-letters
// (voor verbuigingen als "warmes", "warme", "calma", "calmo").
function stem(word) {
  let result = word.replace(/(ing|ness|ful|ish|lich|isch|esse|eza|eur|eux)$/i, '');
  for (let i = 0; i < 2; i++) {
    result = result.replace(/(es|en|er|em|os|as)$/i, '').replace(/(s|n|e|o|a)$/i, '');
  }
  return result;
}

// Minimale lengte na stemming om te voorkomen dat korte, toevallige reststrings
// (bv. "has" -> "h") matchen tegen een evenzo korte dictionary-key.
const MIN_STEM_LENGTH = 3;

function tokenize(text) {
  return normalize(text).split(/\s+/).filter(Boolean);
}

// Matcht tokens tegen een specifiek taalwoordenboek. Probeert eerst exacte match,
// dan gestemde match — dit voorkomt dat stemming te agressief precieze treffers verstoort.
// De fallback (key zelf stemmen en vergelijken) is beperkt tot stems van voldoende lengte,
// anders ontstaan false positives op korte, betekenisloze reststrings.
function matchAgainstLanguage(tokens, dict) {
  const hits = [];
  for (const token of tokens) {
    if (dict[token]) {
      hits.push(dict[token]);
      continue;
    }
    const stemmed = stem(token);
    if (stemmed.length < MIN_STEM_LENGTH) continue;
    if (dict[stemmed]) {
      hits.push(dict[stemmed]);
      continue;
    }
    const fallback = Object.keys(dict).find(key => stem(key) === stemmed);
    if (fallback) hits.push(dict[fallback]);
  }
  return hits;
}

// Analyseert vrije tekst in om het even welke ondersteunde taal (of een mix).
// Geeft het best matchende concept terug plus een score-overzicht voor transparantie.
export function analyzeMood(text) {
  if (!text || !text.trim()) return null;

  const tokens = tokenize(text);
  const conceptScores = {};
  // Houdt per concept bij welke taal de meeste hits opleverde, zodat de tag
  // in de taal van de daadwerkelijke match getoond kan worden (niet een willekeurige taal).
  const conceptLangCounts = {};

  for (const lang of supportedLanguages) {
    const hits = matchAgainstLanguage(tokens, dictionaries[lang]);
    for (const conceptId of hits) {
      conceptScores[conceptId] = (conceptScores[conceptId] || 0) + 1;
      conceptLangCounts[conceptId] = conceptLangCounts[conceptId] || {};
      conceptLangCounts[conceptId][lang] = (conceptLangCounts[conceptId][lang] || 0) + 1;
    }
  }

  const ranked = Object.entries(conceptScores).sort((a, b) => b[1] - a[1]);

  if (ranked.length === 0) {
    return { matched: false, concept: null, conceptId: null, tag: null, runnerUps: [] };
  }

  const [topConceptId] = ranked[0];
  const langCounts = conceptLangCounts[topConceptId] || {};
  const detectedLang = Object.entries(langCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'en';

  return {
    matched: true,
    conceptId: topConceptId,
    concept: concepts[topConceptId],
    tag: tagDictionaries[detectedLang]?.[topConceptId] || tagDictionaries.en[topConceptId],
    detectedLanguages: Object.keys(langCounts),
    runnerUps: ranked.slice(1, 4).map(([id]) => id),
  };
}

// Combineert meerdere concept-resultaten (bv. "rustig" + "herfst") tot één gemengd palet.
// Wordt gebruikt wanneer de tekst meerdere sterke concepten oplevert i.p.v. één duidelijke winnaar.
export function blendConcepts(conceptIds) {
  if (conceptIds.length === 0) return null;
  if (conceptIds.length === 1) return concepts[conceptIds[0]];

  // Pak de kleuren van het top concept, maar mix er 1-2 kleuren van het tweede concept in
  // voor een gelaagder palet, zonder de samenhang te verliezen.
  const primary = concepts[conceptIds[0]];
  const secondary = concepts[conceptIds[1]];
  if (!secondary) return primary;

  const blendedColors = [
    primary.colors[0],
    primary.colors[1],
    secondary.colors[2],
    primary.colors[3],
    secondary.colors[4],
  ];

  return { colors: blendedColors, font: primary.font };
}
