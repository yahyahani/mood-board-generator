export default function FontPreview({ font, sampleText }) {
  if (!font) return null;

  const fontName = font.split(',')[0].replace(/['"]/g, '').trim();

  return (
    <div className="font-preview">
      <p className="font-preview-meta">{fontName}</p>
      <p className="font-preview-sample" style={{ fontFamily: font }}>
        {sampleText || 'Aa Bb Cc — 123'}
      </p>
    </div>
  );
}
