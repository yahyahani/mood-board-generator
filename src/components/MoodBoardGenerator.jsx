import { useState, useMemo } from 'react';
import ColorPalette from './ColorPalette.jsx';
import FontPreview from './FontPreview.jsx';
import MoodTag from './MoodTag.jsx';
import { analyzeMood, blendConcepts } from '../lib/matcher.js';
import { copyCssToClipboard, exportAsPng } from '../lib/exporters.js';

const PLACEHOLDER_EXAMPLES = [
  'rustig café in de herfst, warm licht',
  'cozy autumn cafe with warm light',
  'كافيه هادئ في الخريف، ضوء دافئ',
  'café tranquille en automne, lumière chaude',
  'ruhiges Café im Herbst, warmes Licht',
];

export default function MoodBoardGenerator() {
  const [input, setInput] = useState('');
  const [exportMessage, setExportMessage] = useState('');

  const result = useMemo(() => analyzeMood(input), [input]);
  const isRtl = useMemo(() => /[\u0600-\u06FF]/.test(input), [input]);

  const displayConcept = useMemo(() => {
    if (!result || !result.matched) return null;
    if (result.runnerUps.length > 0) {
      return blendConcepts([result.conceptId, result.runnerUps[0]]);
    }
    return result.concept;
  }, [result]);

  function handleExportCss() {
    if (!displayConcept) return;
    copyCssToClipboard(displayConcept.colors, displayConcept.font);
    setExportMessage('CSS variabelen gekopieerd naar klembord');
    setTimeout(() => setExportMessage(''), 2000);
  }

  function handleExportPng() {
    if (!displayConcept) return;
    exportAsPng(displayConcept.colors, result.tag);
  }

  return (
    <div className="mbg-container">
      <label className="mbg-label" htmlFor="mood-input">
        Beschrijf een sfeer
      </label>
      <textarea
        id="mood-input"
        className="mbg-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER_EXAMPLES[0]}
        rows={2}
        dir={isRtl ? 'rtl' : 'ltr'}
      />

      <div className="mbg-examples">
        {PLACEHOLDER_EXAMPLES.map((example) => (
          <button
            key={example}
            type="button"
            className="mbg-example-chip"
            onClick={() => setInput(example)}
          >
            {example}
          </button>
        ))}
      </div>

      {input.trim() && !result?.matched && (
        <p className="mbg-empty-state">
          Geen bekende sfeerwoorden gevonden. Probeer woorden zoals "rustig", "warm" of "industrieel".
        </p>
      )}

      {displayConcept && (
        <div className="mbg-board" dir={isRtl ? 'rtl' : 'ltr'}>
          <ColorPalette colors={displayConcept.colors} />
          <FontPreview font={displayConcept.font} sampleText={input} />
          <MoodTag tag={result.tag} runnerUps={result.runnerUps} />

          <div className="mbg-export-row">
            <button type="button" onClick={handleExportCss}>
              Exporteer als CSS
            </button>
            <button type="button" onClick={handleExportPng}>
              Exporteer als PNG
            </button>
            {exportMessage && <span className="mbg-export-message">{exportMessage}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
