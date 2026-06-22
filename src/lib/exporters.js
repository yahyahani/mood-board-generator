export function buildCssVariables(colors, font) {
  const lines = colors.map((hex, i) => `  --mood-color-${i + 1}: ${hex};`);
  lines.push(`  --mood-font: ${font};`);
  return `:root {\n${lines.join('\n')}\n}`;
}

export function copyCssToClipboard(colors, font) {
  const css = buildCssVariables(colors, font);
  navigator.clipboard.writeText(css);
  return css;
}

// Tekent het moodboard (kleurenstroken + tag-tekst) op een canvas en triggert een PNG-download.
// Bewust eenvoudig gehouden: vlakke kleurenstroken zijn voldoende voor het doel (snel kleurreferentie delen).
export function exportAsPng(colors, tag) {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 500;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const swatchHeight = height * 0.8;
  const swatchWidth = width / colors.length;
  colors.forEach((hex, i) => {
    ctx.fillStyle = hex;
    ctx.fillRect(i * swatchWidth, 0, swatchWidth, swatchHeight);
  });

  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, swatchHeight, width, height - swatchHeight);
  ctx.fillStyle = '#ffffff';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(tag || '', width / 2, swatchHeight + (height - swatchHeight) / 2 + 8);

  const link = document.createElement('a');
  link.download = `moodboard-${(tag || 'export').replace(/\s+/g, '-')}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
