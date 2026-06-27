import { useState } from 'react';

export default function ColorPalette({ colors }) {
  const [copiedIndex, setCopiedIndex] = useState(null);

  function handleCopy(hex, index) {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  }

  if (!colors || colors.length === 0) return null;

  return (
    <div className="color-palette">
      {colors.map((hex, index) => (
        <button
          key={hex + index}
          type="button"
          className="color-swatch"
          style={{
            backgroundColor: hex,
            animationDelay: `${index * 0.07}s`,
          }}
          onClick={() => handleCopy(hex, index)}
          aria-label={`Kopieer ${hex}`}
        >
          <span className="color-swatch-highlight" aria-hidden="true" />

          {copiedIndex === index ? (
            <span className="color-swatch-copied-overlay">✓</span>
          ) : (
            <>
              <span className="color-swatch-copy-hint" aria-hidden="true">↗</span>
              <span className="color-swatch-label">{hex}</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
