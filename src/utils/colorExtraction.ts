export interface ColorPalette {
  vibrant: string;
  lightVibrant: string;
  darkVibrant: string;
  muted: string;
  lightMuted: string;
  darkMuted: string;
}

// Simplified color extraction using Canvas API
export const extractColors = async (imageUrl: string): Promise<ColorPalette | null> => {
  try {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = extractDominantColors(imageData);

        resolve({
          vibrant: colors[0] || '#FF7E67',
          lightVibrant: lightenColor(colors[0]) || '#FFD97D',
          darkVibrant: darkenColor(colors[0]) || '#E74C3C',
          muted: colors[1] || '#D4A574',
          lightMuted: lightenColor(colors[1]) || '#E8E8E8',
          darkMuted: darkenColor(colors[1]) || '#3D3D3D',
        });
      };

      img.onerror = () => resolve(null);
      img.src = imageUrl;
    });
  } catch (error) {
    console.error('Error extracting colors:', error);
    return null;
  }
};

const extractDominantColors = (imageData: ImageData): string[] => {
  const data = imageData.data;
  const colorMap: Map<string, number> = new Map();

  // Sample every 10 pixels for performance
  for (let i = 0; i < data.length; i += 40) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Skip transparent or near-white/black pixels
    if (a < 128 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) {
      continue;
    }

    const color = rgbToHex(r, g, b);
    colorMap.set(color, (colorMap.get(color) || 0) + 1);
  }

  // Sort by frequency
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([color]) => color);

  return sortedColors.length > 0 ? sortedColors : ['#FF7E67', '#D4A574'];
};

const lightenColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const factor = 1.4;
  return rgbToHex(
    Math.min(255, Math.round(r * factor)),
    Math.min(255, Math.round(g * factor)),
    Math.min(255, Math.round(b * factor))
  );
};

const darkenColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  const factor = 0.7;
  return rgbToHex(
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor)
  );
};

export const extractColorsFromMultipleImages = async (
  imageUrls: string[]
): Promise<ColorPalette[]> => {
  const promises = imageUrls.map((url) => extractColors(url));
  const results = await Promise.all(promises);
  return results.filter((palette): palette is ColorPalette => palette !== null);
};

export const generateHarmoniousBackground = (palettes: ColorPalette[]): string => {
  if (palettes.length === 0) return '#FEFBF6';

  // Collect all light muted colors as they work best for backgrounds
  const backgroundColors = palettes.map((p) => p.lightMuted);
  
  // Calculate average color
  const avgColor = averageColors(backgroundColors);
  return avgColor;
};

const averageColors = (colors: string[]): string => {
  if (colors.length === 0) return '#FEFBF6';

  let totalR = 0;
  let totalG = 0;
  let totalB = 0;

  colors.forEach((color) => {
    const rgb = hexToRgb(color);
    if (rgb) {
      totalR += rgb.r;
      totalG += rgb.g;
      totalB += rgb.b;
    }
  });

  const count = colors.length;
  const avgR = Math.round(totalR / count);
  const avgG = Math.round(totalG / count);
  const avgB = Math.round(totalB / count);

  return rgbToHex(avgR, avgG, avgB);
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export const getComplementaryColor = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const { r, g, b } = rgb;
  return rgbToHex(255 - r, 255 - g, 255 - b);
};
