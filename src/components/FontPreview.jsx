export default function FontPreview({ font, sampleText }) {
  if (!font) return null;

  return (
    <div className="font-preview">
      <p className="font-preview-meta">{font.split(',')[0].replace(/['"]/g, '')}</p>
      <p className="font-preview-sample" style={{ fontFamily: font }}>
        {sampleText || 'Aa Bb Cc — 123'}
      </p>
    </div>
  );
}
