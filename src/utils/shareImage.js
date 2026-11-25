// Helper functions to draw stylized typical Ecuadorian dishes and Enner Valencia on HTML5 Canvas

/**
 * Draws rounded rectangle path on canvas
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Draw Encebollado dish
 */
function drawEncebollado(ctx, cx, cy, size = 65) {
  ctx.save();
  ctx.translate(cx, cy);

  // Plate shadow
  ctx.beginPath();
  ctx.ellipse(0, size * 0.45, size * 0.75, size * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fill();

  // Clay / ceramic bowl base
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.75, size * 0.55, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#8B4513';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#5C2D0C';
  ctx.stroke();

  // Inner bowl rim
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.05, size * 0.68, size * 0.48, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#D2691E';
  ctx.fill();

  // Rich tuna/albacora reddish broth
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.05, size * 0.62, size * 0.42, 0, 0, Math.PI * 2);
  const brothGrad = ctx.createRadialGradient(0, -size * 0.05, size * 0.1, 0, -size * 0.05, size * 0.6);
  brothGrad.addColorStop(0, '#B22222');
  brothGrad.addColorStop(1, '#8B1A1A');
  ctx.fillStyle = brothGrad;
  ctx.fill();

  // Chunks of albacora fish
  ctx.fillStyle = '#5A2D28';
  ctx.beginPath();
  ctx.roundRect(-size * 0.3, -size * 0.15, size * 0.25, size * 0.15, 3);
  ctx.roundRect(size * 0.08, -size * 0.1, size * 0.22, size * 0.14, 3);
  ctx.fill();

  // Steaming red onion slivers (curtido de cebolla morada)
  ctx.strokeStyle = '#BA55D3';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(-size * 0.1, -size * 0.18, size * 0.18, 0.2, 2.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(size * 0.05, -size * 0.05, size * 0.16, 1.2, 3.2);
  ctx.stroke();
  ctx.strokeStyle = '#FF69B4';
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.arc(-size * 0.02, -size * 0.12, size * 0.14, 2.2, 4.2);
  ctx.stroke();

  // Cilantro sprigs (green dots / leaves)
  ctx.fillStyle = '#228B22';
  for (const [ox, oy] of [[-0.15, 0.05], [0.15, 0.05], [-0.02, -0.22], [0.22, -0.15], [-0.25, -0.05]]) {
    ctx.beginPath();
    ctx.ellipse(ox * size, oy * size, 3, 2, 0.4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Plantain chifle (crunchy chip) sticking out
  ctx.save();
  ctx.rotate(-0.35);
  ctx.fillStyle = '#FFD700';
  ctx.strokeStyle = '#DAA520';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-size * 0.48, -size * 0.35, size * 0.35, size * 0.1, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.restore();

  // Lime wedge (limoncito sutil)
  ctx.fillStyle = '#7CFC00';
  ctx.strokeStyle = '#32CD32';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(size * 0.45, -size * 0.25, size * 0.16, 0, Math.PI, false);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Bolón de Verde
 */
function drawBolon(ctx, cx, cy, size = 65) {
  ctx.save();
  ctx.translate(cx, cy);

  // Shadow
  ctx.beginPath();
  ctx.ellipse(0, size * 0.42, size * 0.65, size * 0.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fill();

  // Banana leaf base
  ctx.fillStyle = '#2E7D32';
  ctx.beginPath();
  ctx.ellipse(0, size * 0.3, size * 0.72, size * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#1B5E20';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-size * 0.6, size * 0.3);
  ctx.lineTo(size * 0.6, size * 0.3);
  ctx.stroke();

  // Golden plantain ball (Bolón)
  const bolonGrad = ctx.createRadialGradient(-size * 0.15, -size * 0.15, size * 0.1, 0, 0, size * 0.55);
  bolonGrad.addColorStop(0, '#FFE066');
  bolonGrad.addColorStop(0.5, '#E5A800');
  bolonGrad.addColorStop(0.85, '#B37D00');
  bolonGrad.addColorStop(1, '#664200');

  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = bolonGrad;
  ctx.fill();
  ctx.strokeStyle = '#553600';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Chicharrón & crispy bits (textured crust)
  ctx.fillStyle = '#4A2500';
  for (const [bx, by, r] of [
    [-0.25, -0.15, 3.5], [-0.1, 0.25, 4], [0.2, 0.1, 3],
    [-0.3, 0.1, 3.5], [0.15, -0.25, 4.5], [0.28, -0.05, 3]
  ]) {
    ctx.beginPath();
    ctx.arc(bx * size, by * size, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Melted cheese oozing from top (queso manaba)
  ctx.fillStyle = '#FFF8DC';
  ctx.strokeStyle = '#F0E68C';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(-size * 0.05, -size * 0.28, size * 0.22, size * 0.12, -0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Cheese drip
  ctx.beginPath();
  ctx.moveTo(-size * 0.08, -size * 0.2);
  ctx.quadraticCurveTo(-size * 0.12, size * 0.05, -size * 0.05, size * 0.1);
  ctx.lineTo(-size * 0.02, -size * 0.2);
  ctx.fill();

  // Steam lines
  ctx.strokeStyle = 'rgba(255,255,255,0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-size * 0.15, -size * 0.55);
  ctx.bezierCurveTo(-size * 0.25, -size * 0.7, -size * 0.05, -size * 0.85, -size * 0.15, -size);
  ctx.moveTo(size * 0.1, -size * 0.55);
  ctx.bezierCurveTo(size * 0.0, -size * 0.7, size * 0.2, -size * 0.85, size * 0.1, -size);
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Ceviche de Camarón
 */
function drawCeviche(ctx, cx, cy, size = 65) {
  ctx.save();
  ctx.translate(cx, cy);

  // Shadow
  ctx.beginPath();
  ctx.ellipse(0, size * 0.45, size * 0.7, size * 0.2, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fill();

  // Glass/ceramic coastal bowl
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.7, size * 0.5, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#E0F2FE';
  ctx.fill();
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Orange-red ceviche citrus/tomato sauce (jugo de ceviche)
  ctx.beginPath();
  ctx.ellipse(0, -size * 0.05, size * 0.6, size * 0.4, 0, 0, Math.PI * 2);
  const cevicheGrad = ctx.createRadialGradient(0, -size * 0.05, size * 0.08, 0, -size * 0.05, size * 0.55);
  cevicheGrad.addColorStop(0, '#FF6B4A');
  cevicheGrad.addColorStop(1, '#DC2626');
  ctx.fillStyle = cevicheGrad;
  ctx.fill();

  // Pink shrimps (camarones ecuatorianos)
  for (const [sx, sy, rot] of [
    [-0.18, -0.12, -0.3], [0.15, -0.05, 0.4], [-0.05, 0.12, 1.8], [0.18, -0.22, -0.8]
  ]) {
    ctx.save();
    ctx.translate(sx * size, sy * size);
    ctx.rotate(rot);
    ctx.fillStyle = '#FFA07A';
    ctx.strokeStyle = '#FF6347';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.12, 0, Math.PI * 1.5);
    ctx.lineTo(size * 0.08, -size * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Shrimp tail fan
    ctx.fillStyle = '#FF4500';
    ctx.beginPath();
    ctx.arc(size * 0.08, size * 0.08, size * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Red onion curtido & cilantro
  ctx.strokeStyle = '#C084FC';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-size * 0.08, -size * 0.05, size * 0.15, 0.5, 2.5);
  ctx.arc(size * 0.08, -size * 0.15, size * 0.14, 1.2, 3.5);
  ctx.stroke();

  // Crunchy toasted corn (tostado)
  ctx.fillStyle = '#F59E0B';
  for (const [tx, ty] of [[-0.28, 0.1], [0.28, 0.08], [-0.02, -0.25], [0.25, -0.12]]) {
    ctx.beginPath();
    ctx.ellipse(tx * size, ty * size, 4, 3, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Draw Hornado con Llapingacho
 */
function drawHornado(ctx, cx, cy, size = 65) {
  ctx.save();
  ctx.translate(cx, cy);

  // Shadow
  ctx.beginPath();
  ctx.ellipse(0, size * 0.45, size * 0.75, size * 0.22, 0, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fill();

  // White ceramic platter
  ctx.beginPath();
  ctx.ellipse(0, size * 0.15, size * 0.72, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#F8FAFC';
  ctx.fill();
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Llapingacho (golden potato patty with cheese)
  const llapinGrad = ctx.createRadialGradient(size * 0.15, size * 0.05, size * 0.05, size * 0.2, size * 0.08, size * 0.35);
  llapinGrad.addColorStop(0, '#FEF08A');
  llapinGrad.addColorStop(0.7, '#EAB308');
  llapinGrad.addColorStop(1, '#CA8A04');
  ctx.beginPath();
  ctx.ellipse(size * 0.2, size * 0.1, size * 0.32, size * 0.22, 0.1, 0, Math.PI * 2);
  ctx.fillStyle = llapinGrad;
  ctx.fill();
  ctx.strokeStyle = '#A16207';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Grill marks on llapingacho
  ctx.strokeStyle = '#713F12';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(size * 0.08, size * 0.02);
  ctx.lineTo(size * 0.28, size * 0.18);
  ctx.moveTo(size * 0.15, -size * 0.03);
  ctx.lineTo(size * 0.35, size * 0.12);
  ctx.stroke();

  // Succulent roast pork (Hornado) with crispy crackling (cuerito)
  const porkGrad = ctx.createLinearGradient(-size * 0.45, -size * 0.25, -size * 0.05, size * 0.25);
  porkGrad.addColorStop(0, '#78350F');
  porkGrad.addColorStop(0.4, '#9A3412');
  porkGrad.addColorStop(1, '#D97706');
  ctx.beginPath();
  ctx.ellipse(-size * 0.22, 0, size * 0.35, size * 0.26, -0.2, 0, Math.PI * 2);
  ctx.fillStyle = porkGrad;
  ctx.fill();
  ctx.strokeStyle = '#451A03';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Golden crispy cuerito on top
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.roundRect(-size * 0.35, -size * 0.18, size * 0.28, size * 0.14, 4);
  ctx.fill();
  ctx.strokeStyle = '#78350F';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Fresh green avocado slice (aguacate)
  ctx.fillStyle = '#84CC16';
  ctx.strokeStyle = '#4D7C0F';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, size * 0.24, size * 0.18, size * 0.09, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

/**
 * Draw Enner Valencia avatar / celebration badge
 */
function drawEnnerAvatar(ctx, cx, cy, size = 60) {
  ctx.save();
  ctx.translate(cx, cy);

  // Outer golden glow / sun halo
  const glow = ctx.createRadialGradient(0, 0, size * 0.4, 0, 0, size * 1.15);
  glow.addColorStop(0, 'rgba(255, 209, 0, 0.45)');
  glow.addColorStop(0.7, 'rgba(255, 209, 0, 0.15)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // Badge circular container
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.85, 0, Math.PI * 2);
  ctx.fillStyle = '#0F172A';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFD100';
  ctx.stroke();

  // Yellow Ecuadorian Jersey (La Tri)
  ctx.beginPath();
  ctx.arc(0, size * 0.95, size * 0.65, Math.PI, 0, false);
  ctx.fillStyle = '#FFD100';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#0033A0';
  ctx.stroke();

  // Jersey collar / blue trim
  ctx.beginPath();
  ctx.moveTo(-size * 0.25, size * 0.45);
  ctx.lineTo(0, size * 0.62);
  ctx.lineTo(size * 0.25, size * 0.45);
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = '#0033A0';
  ctx.stroke();

  // Red inner collar line
  ctx.beginPath();
  ctx.moveTo(-size * 0.18, size * 0.46);
  ctx.lineTo(0, size * 0.58);
  ctx.lineTo(size * 0.18, size * 0.46);
  ctx.lineWidth = 1.8;
  ctx.strokeStyle = '#CE1126';
  ctx.stroke();

  // #13 on Jersey
  ctx.font = `bold ${Math.round(size * 0.32)}px "Nunito", "Segoe UI", sans-serif`;
  ctx.fillStyle = '#0033A0';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('13', 0, size * 0.72);

  // Enner's face (warm skin tone)
  ctx.beginPath();
  ctx.ellipse(0, size * 0.1, size * 0.36, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#5A321B';
  ctx.fill();

  // Hair (cropped athletic fade)
  ctx.beginPath();
  ctx.arc(0, -size * 0.08, size * 0.36, Math.PI, 0, false);
  ctx.fillStyle = '#1A0E08';
  ctx.fill();

  // Ears
  ctx.fillStyle = '#5A321B';
  ctx.beginPath();
  ctx.arc(-size * 0.36, size * 0.1, size * 0.1, 0, Math.PI * 2);
  ctx.arc(size * 0.36, size * 0.1, size * 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Smile / joy
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, size * 0.2, size * 0.16, 0.2, Math.PI - 0.2, false);
  ctx.stroke();

  // Eyes (confident, happy)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.ellipse(-size * 0.14, size * 0.08, size * 0.07, size * 0.05, 0, 0, Math.PI * 2);
  ctx.ellipse(size * 0.14, size * 0.08, size * 0.07, size * 0.05, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(-size * 0.14, size * 0.08, size * 0.035, 0, Math.PI * 2);
  ctx.arc(size * 0.14, size * 0.08, size * 0.035, 0, Math.PI * 2);
  ctx.fill();

  // Thumbs up celebration hand on right
  ctx.save();
  ctx.translate(size * 0.55, size * 0.35);
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = '#5A321B';
  ctx.fill();
  // Thumb up
  ctx.beginPath();
  ctx.roundRect(-size * 0.04, -size * 0.25, size * 0.09, size * 0.22, size * 0.04);
  ctx.fillStyle = '#5A321B';
  ctx.fill();
  ctx.restore();

  ctx.restore();
}

/**
 * Returns phrase for the game result
 */
export function getEnnerPhrase(isWinner, attemptsCount) {
  if (!isWinner) {
    return {
      title: '¡ENNER ESTARÍA ORGULLOSO DEL INTENTO!',
      subtitle: '¡A levantar la cabeza! Enner dice que mañana lo remontamos 🇪🇨⚽'
    };
  }

  switch (attemptsCount) {
    case 1:
      return {
        title: '¡GOLAZO DE CHILENA! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡Extraordinario! Acertaste a la primera como un crack tricolor 🇪🇨⚡'
      };
    case 2:
      return {
        title: '¡QUÉ DEFINICIÓN! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡Precisión pura en solo 2 intentos, figura mundial! 🇪🇨🔥'
      };
    case 3:
      return {
        title: '¡GOLAZO HISTÓRICO! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡Gran juego, mi llave! Acertaste en 3 intentos 🇪🇨⚽'
      };
    case 4:
      return {
        title: '¡CON GARRA Y CORAZÓN! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡Bien jugado a lo tricolor en 4 intentos! 🇪🇨💪'
      };
    case 5:
      return {
        title: '¡CON SUDOR Y AGUANTE! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡Gran victoria trabajando la jugada en 5 intentos! 🇪🇨🙌'
      };
    case 6:
      return {
        title: '¡AGÓNICO EN EL 90+6! ENNER ESTARÍA ORGULLOSO',
        subtitle: '¡De infarto! Victoria al último intento con pura fe 🇪🇨💥'
      };
    default:
      return {
        title: '¡ENNER ESTARÍA ORGULLOSO!',
        subtitle: '¡Ecuador presente en cada palabra! 🇪🇨⚽'
      };
  }
}

/**
 * Main function: Generates a high-res PNG Blob / DataURL of the complete result card
 */
export async function createShareCanvas({
  wordData,
  guesses = [],
  isWinner = false,
  dayNumber = 1,
  themeColor = 'tricolor' // 'tricolor' | 'blue' | 'yellow' | 'red'
}) {
  const width = 1000;
  const height = 1250;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  if (themeColor === 'blue') {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#001A4D');
    bg.addColorStop(0.5, '#0033A0');
    bg.addColorStop(1, '#001438');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  } else if (themeColor === 'yellow') {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#FFF275');
    bg.addColorStop(0.4, '#FFD100');
    bg.addColorStop(1, '#E5A800');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  } else if (themeColor === 'red') {
    const bg = ctx.createLinearGradient(0, 0, width, height);
    bg.addColorStop(0, '#85000E');
    bg.addColorStop(0.5, '#CE1126');
    bg.addColorStop(1, '#66000B');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);
  } else {
    // TRICOLOR (Default)
    // 50% Yellow, 25% Blue, 25% Red with elegant wave & lighting
    ctx.fillStyle = '#0E131F';
    ctx.fillRect(0, 0, width, height);

    // Top Yellow glow & banner
    const yGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
    yGrad.addColorStop(0, '#FFD100');
    yGrad.addColorStop(0.85, '#D4A000');
    yGrad.addColorStop(1, '#1A2338');
    ctx.fillStyle = yGrad;
    ctx.fillRect(0, 0, width, height * 0.38);

    // Blue middle band
    const bGrad = ctx.createLinearGradient(0, height * 0.36, 0, height * 0.72);
    bGrad.addColorStop(0, '#002B82');
    bGrad.addColorStop(0.5, '#0033A0');
    bGrad.addColorStop(1, '#001D5C');
    ctx.fillStyle = bGrad;
    ctx.fillRect(0, height * 0.36, width, height * 0.38);

    // Red bottom band
    const rGrad = ctx.createLinearGradient(0, height * 0.7, 0, height);
    rGrad.addColorStop(0, '#8F0C1B');
    rGrad.addColorStop(0.4, '#CE1126');
    rGrad.addColorStop(1, '#5C000B');
    ctx.fillStyle = rGrad;
    ctx.fillRect(0, height * 0.7, width, height * 0.3);

    // Overlay soft dark vignette for high contrast reading
    const darkVignette = ctx.createRadialGradient(width / 2, height / 2, 200, width / 2, height / 2, width * 0.7);
    darkVignette.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
    darkVignette.addColorStop(1, 'rgba(5, 10, 20, 0.8)');
    ctx.fillStyle = darkVignette;
    ctx.fillRect(0, 0, width, height);
  }

  // Outer decorative border
  ctx.strokeStyle = '#FFD100';
  ctx.lineWidth = 8;
  roundRect(ctx, 24, 24, width - 48, height - 48, 28);
  ctx.stroke();

  ctx.strokeStyle = '#0033A0';
  ctx.lineWidth = 3;
  roundRect(ctx, 32, 32, width - 64, height - 64, 22);
  ctx.stroke();

  // ==========================================
  // CORNER DISHES (Platos típicos en las esquinas)
  // ==========================================
  // 1. Top-Left: Encebollado
  drawEncebollado(ctx, 115, 125, 68);
  drawDishTag(ctx, 115, 185, '🍲 Encebollado');

  // 2. Top-Right: Bolón de Verde
  drawBolon(ctx, width - 115, 125, 68);
  drawDishTag(ctx, width - 115, 185, '🥟 Bolón de Verde');

  // 3. Bottom-Left: Ceviche de Camarón
  drawCeviche(ctx, 115, height - 150, 68);
  drawDishTag(ctx, 115, height - 90, '🍤 Ceviche');

  // 4. Bottom-Right: Hornado con Llapingacho
  drawHornado(ctx, width - 115, height - 150, 68);
  drawDishTag(ctx, width - 115, height - 90, '🍖 Hornado');

  // ==========================================
  // HEADER
  // ==========================================
  ctx.textAlign = 'center';

  // Title: ECUADLE
  ctx.font = '900 56px "Nunito", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#000000';
  ctx.fillText('ECUADLE', width / 2 + 3, 98 + 3); // shadow
  ctx.fillStyle = '#FFD100';
  ctx.fillText('ECUADLE', width / 2, 98);

  // Subtitle / Day
  ctx.font = 'bold 22px "Nunito", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 6;
  const scoreText = isWinner ? `${guesses.length}/6 INTENTOS` : 'X/6 INTENTOS';
  ctx.fillText(`PALABRA ECUATORIANA DEL DÍA #${dayNumber} • ${scoreText}`, width / 2, 138);
  ctx.shadowBlur = 0;

  // ==========================================
  // WORD CARD (Palabra y significado)
  // ==========================================
  if (wordData && wordData.word) {
    const cardY = 175;
    const cardW = 540;
    const cardH = 90;
    const cardX = (width - cardW) / 2;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = '#FFD100';
    ctx.lineWidth = 2.5;
    roundRect(ctx, cardX, cardY, cardW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = '900 32px "Nunito", "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#FFD100';
    ctx.fillText(wordData.word.toUpperCase(), width / 2, cardY + 38);

    ctx.font = '500 17px "Nunito", "Segoe UI", system-ui, sans-serif';
    ctx.fillStyle = '#E2E8F0';
    const defClean = wordData.def.length > 55 ? wordData.def.slice(0, 52) + '...' : wordData.def;
    ctx.fillText(`"${defClean}"`, width / 2, cardY + 68);
  }

  // ==========================================
  // ATTEMPTS BOARD GRID (Cuadrícula con intentos) & FRASE BANNER
  // ==========================================
  const wordLen = 5;
  const tileSize = 62;
  const tileGap = 10;
  const gridW = wordLen * tileSize + (wordLen - 1) * tileGap;
  const startX = (width - gridW) / 2;

  const bannerHeight = 125;
  const contentGap = 36;
  const gridHeight = guesses.length * tileSize + Math.max(0, guesses.length - 1) * tileGap;
  const totalMiddleHeight = gridHeight + contentGap + bannerHeight;

  // Center the grid and phrase harmoniously in the space between card (y=270) and bottom dishes (y=1040)
  const availableTop = 285;
  const availableBottom = 1030;
  const availableH = availableBottom - availableTop;
  const startY = availableTop + Math.max(15, (availableH - totalMiddleHeight) / 2);

  guesses.forEach((g, rowIdx) => {
    const rowY = startY + rowIdx * (tileSize + tileGap);
    const letters = (g.guess || '').toUpperCase().split('');
    const results = g.result || [];

    for (let col = 0; col < wordLen; col++) {
      const tileX = startX + col * (tileSize + tileGap);
      const res = results[col];
      const letter = letters[col] || '';

      // Tile fill color (Amarillo, Azul, Rojo)
      let fillColor = '#1E293B';
      let strokeColor = '#475569';
      let textColor = '#FFFFFF';

      if (res === 'correct') {
        fillColor = '#FFD100';
        strokeColor = '#A16207';
        textColor = '#0F172A'; // Black text on yellow for legibility
      } else if (res === 'present') {
        fillColor = '#0044CC';
        strokeColor = '#002B7F';
        textColor = '#FFFFFF';
      } else if (res === 'absent') {
        fillColor = '#CE1126';
        strokeColor = '#85000E';
        textColor = '#FFFFFF';
      }

      // Tile shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      roundRect(ctx, tileX + 2, rowY + 3, tileSize, tileSize, 10);
      ctx.fill();

      // Tile body
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2.5;
      roundRect(ctx, tileX, rowY, tileSize, tileSize, 10);
      ctx.fill();
      ctx.stroke();

      // Letter
      if (letter) {
        ctx.font = '900 30px "Nunito", "Segoe UI", system-ui, sans-serif';
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter, tileX + tileSize / 2, rowY + tileSize / 2 + 1);
      }
    }
  });

  // ==========================================
  // FRASE SECTION ("ENNER ESTARÍA ORGULLOSO") - SOLO LA FRASE, SIN LA PERSONA
  // ==========================================
  const phrase = getEnnerPhrase(isWinner, guesses.length);
  const phraseY = startY + gridHeight + contentGap;

  const phraseBoxW = 760;
  const phraseBoxH = bannerHeight;
  const phraseBoxX = (width - phraseBoxW) / 2;

  // Elegant dark card with golden border
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.strokeStyle = '#FFD100';
  ctx.lineWidth = 3;
  roundRect(ctx, phraseBoxX, phraseY, phraseBoxW, phraseBoxH, 20);
  ctx.fill();
  ctx.stroke();

  // Decorative inner border
  ctx.strokeStyle = 'rgba(255, 209, 0, 0.25)';
  ctx.lineWidth = 1;
  roundRect(ctx, phraseBoxX + 6, phraseY + 6, phraseBoxW - 12, phraseBoxH - 12, 14);
  ctx.stroke();

  // Main Phrase Text (Centered, prominent, no avatar)
  ctx.textAlign = 'center';
  const titleFontSize = phrase.title.length > 38 ? 24 : 28;
  ctx.font = `900 ${titleFontSize}px "Nunito", "Segoe UI", system-ui, sans-serif`;
  ctx.fillStyle = '#FFD100';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText(phrase.title, width / 2, phraseY + 44);

  // Subtitle (Centered)
  ctx.font = '600 19px "Nunito", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText(phrase.subtitle, width / 2, phraseY + 80);

  // Bottom Badge Line (Centered)
  ctx.font = 'bold 14px "Nunito", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#60A5FA';
  ctx.fillText('⚽ LA TRI • SUPERMAN ENNER 🇪🇨', width / 2, phraseY + 107);
  ctx.shadowBlur = 0;

  // ==========================================
  // FOOTER
  // ==========================================
  ctx.textAlign = 'center';
  ctx.font = 'bold 18px "Nunito", "Segoe UI", system-ui, sans-serif';
  ctx.fillStyle = '#F1F5F9';
  ctx.shadowColor = 'rgba(0,0,0,0.8)';
  ctx.shadowBlur = 4;
  ctx.fillText('ECUADLE.COM • JUEGA GRATIS LA PALABRA DEL DÍA 🇪🇨', width / 2, height - 55);
  ctx.shadowBlur = 0;

  return canvas;
}

/**
 * Little pill tag under each dish
 */
function drawDishTag(ctx, x, y, label) {
  ctx.save();
  ctx.font = 'bold 14px "Nunito", "Segoe UI", system-ui, sans-serif';
  const textWidth = ctx.measureText(label).width;
  const pw = textWidth + 18;
  const ph = 24;

  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.strokeStyle = '#FFD100';
  ctx.lineWidth = 1.5;
  roundRect(ctx, x - pw / 2, y - ph / 2, pw, ph, 12);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y + 1);
  ctx.restore();
}

