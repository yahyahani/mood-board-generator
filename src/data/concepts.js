// Elk concept is taalonafhankelijk: een idee, geen woord.
// Vertaalbestanden (zie src/data/translations/) koppelen woorden in elke taal aan een concept-id.
// kleuren: 5 hexwaarden, van donker naar licht, voor het moodboard-palet.
// font: een CSS font-stack die de "stem" van het concept weergeeft.
// tag: een korte sfeer-omschrijving, los vertaald per taal in translations/{lang}.js -> tags.

export const concepts = {
  cozy: {
    colors: ['#4A1B0C', '#854F0B', '#BA7517', '#EF9F27', '#FAEEDA'],
    font: "'Georgia', 'Times New Roman', serif",
  },
  autumn: {
    colors: ['#712B13', '#993C1D', '#D85A30', '#F0997B', '#FAECE7'],
    font: "'Georgia', serif",
  },
  warm: {
    colors: ['#633806', '#854F0B', '#BA7517', '#EF9F27', '#FAC775'],
    font: "'Palatino Linotype', serif",
  },
  calm: {
    colors: ['#042C53', '#0C447C', '#185FA5', '#85B7EB', '#E6F1FB'],
    font: "'Helvetica Neue', Arial, sans-serif",
  },
  quiet: {
    colors: ['#2C2C2A', '#5F5E5A', '#888780', '#B4B2A9', '#F1EFE8'],
    font: "'Helvetica Neue', Arial, sans-serif",
  },
  minimal: {
    colors: ['#2C2C2A', '#444441', '#888780', '#D3D1C7', '#F1EFE8'],
    font: "'Helvetica Neue', Arial, sans-serif",
  },
  ocean: {
    colors: ['#042C53', '#0C447C', '#378ADD', '#85B7EB', '#E6F1FB'],
    font: "'Avenir', 'Century Gothic', sans-serif",
  },
  cold: {
    colors: ['#042C53', '#185FA5', '#378ADD', '#85B7EB', '#E6F1FB'],
    font: "'Helvetica Neue', sans-serif",
  },
  forest: {
    colors: ['#173404', '#27500A', '#3B6D11', '#639922', '#C0DD97'],
    font: "'Garamond', serif",
  },
  wood: {
    colors: ['#412402', '#633806', '#854F0B', '#BA7517', '#EF9F27'],
    font: "'Rockwell', 'Courier New', serif",
  },
  earthy: {
    colors: ['#4A1B0C', '#712B13', '#993C1D', '#D85A30', '#F0997B'],
    font: "'Garamond', serif",
  },
  bold: {
    colors: ['#501313', '#791F1F', '#A32D2D', '#E24B4A', '#F09595'],
    font: "'Arial Black', 'Helvetica', sans-serif",
  },
  energetic: {
    colors: ['#4A1B0C', '#D85A30', '#EF9F27', '#E24B4A', '#FAC775'],
    font: "'Futura', 'Arial Black', sans-serif",
  },
  vibrant: {
    colors: ['#4B1528', '#993556', '#D4537E', '#ED93B1', '#F4C0D1'],
    font: "'Futura', sans-serif",
  },
  romantic: {
    colors: ['#4B1528', '#72243E', '#D4537E', '#ED93B1', '#FBEAF0'],
    font: "'Playfair Display', 'Georgia', serif",
  },
  elegant: {
    colors: ['#26215C', '#3C3489', '#534AB7', '#AFA9EC', '#EEEDFE'],
    font: "'Playfair Display', serif",
  },
  luxurious: {
    colors: ['#2C2C2A', '#412402', '#854F0B', '#EF9F27', '#F1EFE8'],
    font: "'Didot', 'Playfair Display', serif",
  },
  fresh: {
    colors: ['#173404', '#3B6D11', '#639922', '#97C459', '#EAF3DE'],
    font: "'Avenir', sans-serif",
  },
  spring: {
    colors: ['#27500A', '#639922', '#97C459', '#ED93B1', '#FBEAF0'],
    font: "'Century Gothic', sans-serif",
  },
  summer: {
    colors: ['#0C447C', '#378ADD', '#EF9F27', '#F0997B', '#E6F1FB'],
    font: "'Futura', sans-serif",
  },
  winter: {
    colors: ['#042C53', '#2C2C2A', '#5F5E5A', '#85B7EB', '#F1EFE8'],
    font: "'Helvetica Neue', sans-serif",
  },
  night: {
    colors: ['#26215C', '#042C53', '#3C3489', '#534AB7', '#7F77DD'],
    font: "'Garamond', serif",
  },
  dark: {
    colors: ['#2C2C2A', '#444441', '#26215C', '#501313', '#5F5E5A'],
    font: "'Helvetica Neue', sans-serif",
  },
  bright: {
    colors: ['#412402', '#EF9F27', '#FAC775', '#FAEEDA', '#FFFFFF'],
    font: "'Futura', sans-serif",
  },
  industrial: {
    colors: ['#2C2C2A', '#444441', '#5F5E5A', '#888780', '#B4B2A9'],
    font: "'Bebas Neue', 'Arial Narrow', sans-serif",
  },
  urban: {
    colors: ['#2C2C2A', '#444441', '#D85A30', '#888780', '#B4B2A9'],
    font: "'Helvetica Neue', sans-serif",
  },
  vintage: {
    colors: ['#412402', '#712B13', '#BA7517', '#F0997B', '#FAEEDA'],
    font: "'Courier New', monospace",
  },
  retro: {
    colors: ['#633806', '#993556', '#D85A30', '#EF9F27', '#D4537E'],
    font: "'Futura', 'Century Gothic', sans-serif",
  },
  modern: {
    colors: ['#2C2C2A', '#0C447C', '#444441', '#85B7EB', '#F1EFE8'],
    font: "'Helvetica Neue', sans-serif",
  },
  futuristic: {
    colors: ['#042C53', '#26215C', '#378ADD', '#534AB7', '#85B7EB'],
    font: "'Eurostile', 'Helvetica Neue', sans-serif",
  },
  playful: {
    colors: ['#993C1D', '#D85A30', '#EF9F27', '#D4537E', '#ED93B1'],
    font: "'Comic Sans MS', 'Century Gothic', sans-serif",
  },
  childlike: {
    colors: ['#185FA5', '#378ADD', '#EF9F27', '#639922', '#ED93B1'],
    font: "'Century Gothic', sans-serif",
  },
  melancholy: {
    colors: ['#2C2C2A', '#042C53', '#444441', '#5F5E5A', '#85B7EB'],
    font: "'Garamond', serif",
  },
  nostalgic: {
    colors: ['#412402', '#712B13', '#854F0B', '#F0997B', '#FAEEDA'],
    font: "'Georgia', serif",
  },
  natural: {
    colors: ['#173404', '#412402', '#3B6D11', '#854F0B', '#97C459'],
    font: "'Garamond', serif",
  },
  rustic: {
    colors: ['#412402', '#633806', '#712B13', '#BA7517', '#D85A30'],
    font: "'Rockwell', serif",
  },
  desert: {
    colors: ['#412402', '#712B13', '#BA7517', '#D85A30', '#FAC775'],
    font: "'Optima', 'Garamond', serif",
  },
  tropical: {
    colors: ['#173404', '#0F6E56', '#639922', '#1D9E75', '#97C459'],
    font: "'Futura', sans-serif",
  },
  zen: {
    colors: ['#2C2C2A', '#085041', '#5F5E5A', '#0F6E56', '#9FE1CB'],
    font: "'Optima', 'Helvetica Neue', sans-serif",
  },
  spiritual: {
    colors: ['#26215C', '#3C3489', '#412402', '#7F77DD', '#FAC775'],
    font: "'Garamond', serif",
  },
  professional: {
    colors: ['#042C53', '#2C2C2A', '#0C447C', '#444441', '#B4B2A9'],
    font: "'Helvetica Neue', Arial, sans-serif",
  },
  corporate: {
    colors: ['#042C53', '#185FA5', '#2C2C2A', '#5F5E5A', '#B4B2A9'],
    font: "'Arial', 'Helvetica Neue', sans-serif",
  },
};

export const conceptIds = Object.keys(concepts);
