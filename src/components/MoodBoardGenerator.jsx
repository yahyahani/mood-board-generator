import { useState, useMemo, useEffect } from 'react';
import ColorPalette from './ColorPalette.jsx';
import FontPreview from './FontPreview.jsx';
import MoodTag from './MoodTag.jsx';
import { analyzeMood, blendConcepts } from '../lib/matcher.js';
import { copyCssToClipboard, exportAsPng } from '../lib/exporters.js';

const EXAMPLES = [
  { text: 'rustig café in de herfst, warm licht', lang: 'nl' },
  { text: 'cozy autumn cafe with warm light',      lang: 'en' },
  { text: 'كافيه هادئ في الخريف، ضوء دافئ',        lang: 'ar' },
  { text: 'café tranquille en automne, lumière chaude', lang: 'fr' },
  { text: 'ruhiges Café im Herbst, warmes Licht',  lang: 'de' },
];

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"     x2="12" y2="3" />
      <line x1="12" y1="21"    x2="12" y2="23" />
      <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12"    x2="3"  y2="12" />
      <line x1="21" y1="12"    x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path className="icon-moon" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function MoodBoardGenerator() {
  const [input, setInput]               = useState('');
  const [exportMessage, setExportMessage] = useState('');
  const [darkMode, setDarkMode]         = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const result      = useMemo(() => analyzeMood(input), [input]);
  const isRtl       = useMemo(() => /[؀-ۿ]/.test(input), [input]);

  const displayConcept = useMemo(() => {
    if (!result?.matched) return null;
    if (result.runnerUps.length > 0) return blendConcepts([result.conceptId, result.runnerUps[0]]);
    return result.concept;
  }, [result]);

  function handleExportCss() {
    if (!displayConcept) return;
    copyCssToClipboard(displayConcept.colors, displayConcept.font);
    setExportMessage('CSS gekopieerd ✓');
    setTimeout(() => setExportMessage(''), 2200);
  }

  function handleExportPng() {
    if (!displayConcept) return;
    exportAsPng(displayConcept.colors, result.tag);
  }

  return (
    <>
      <button
        type="button"
        className="mbg-theme-toggle"
        onClick={() => setDarkMode((d) => !d)}
        aria-label={darkMode ? 'Naar lichte modus' : 'Naar donkere modus'}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="mbg-container">
        <header className="mbg-header">
          <h1 className="mbg-heading">Mood Board</h1>
          <p className="mbg-subheading">
            Beschrijf een sfeer — wij vertalen het naar kleur en typografie.
          </p>
        </header>

        <div className="mbg-input-section">
          <label className="mbg-label" htmlFor="mood-input">
            Beschrijf een sfeer
          </label>
          <textarea
            id="mood-input"
            className="mbg-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={EXAMPLES[0].text}
            rows={2}
            dir={isRtl ? 'rtl' : 'ltr'}
          />

          <div className="mbg-examples" role="list">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.text}
                type="button"
                role="listitem"
                className="mbg-example-chip"
                onClick={() => setInput(ex.text)}
                lang={ex.lang}
              >
                <span className="mbg-example-chip-arrow" aria-hidden="true">
                {ex.lang === 'ar' ? '←' : '→'}
              </span>
                {ex.text}
              </button>
            ))}
          </div>
        </div>

        {input.trim() && !result?.matched && (
          <p className="mbg-empty-state">
            Geen sfeerwoorden herkend — probeer &ldquo;rustig&rdquo;, &ldquo;warm&rdquo; of &ldquo;industrieel&rdquo;.
          </p>
        )}

        {displayConcept && (
          <div className="mbg-board" dir={isRtl ? 'rtl' : 'ltr'}>
            <ColorPalette colors={displayConcept.colors} />

            <div className="mbg-board-divider" />

            <FontPreview font={displayConcept.font} sampleText={input} />

            <div className="mbg-board-divider" />

            <MoodTag tag={result.tag} runnerUps={result.runnerUps} />

            <div className="mbg-export-row">
              <button type="button" className="mbg-btn mbg-btn-primary" onClick={handleExportCss}>
                CSS exporteren
              </button>
              <button type="button" className="mbg-btn mbg-btn-secondary" onClick={handleExportPng}>
                PNG exporteren
              </button>
              {exportMessage && (
                <span className="mbg-export-message" role="status">{exportMessage}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
