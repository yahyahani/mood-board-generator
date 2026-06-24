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
          className="color-swatch"
          style={{ backgroundColor: hex }}
          onClick={() => handleCopy(hex, index)}
          aria-label={`Kopieer kleurcode ${hex}`}
          type="button"
        >
          <span className="color-swatch-label">
            {copiedIndex === index ? 'Gekopieerd' : hex}
          </span>
        </button>
      ))}
    </div>
  );
}
