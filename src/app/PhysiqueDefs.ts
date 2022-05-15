let Gravity = 9.8;
const coef = 0.95;
export interface Balle {
  P: number[];
  V: number[];
  r: number;
  m: number;
  c: string;
}

export function setG(v: number) {
  Gravity = v;
}

export function getG(): number {
  return Gravity;
}

export function manageBalles(balles: Balle[], dt: number, W: number) {
  // Collisions entre les balles ?
  balles.forEach((b, i) => {
    // On vérifie si collision avec les balles suivantes
    for (let j = i + 1; j < balles.length; j++) {
      collision(b, balles[j]);
    }
  });

  // Application de Gravity et collisions boites
  balles.forEach((b) => manageBalle(b, dt, W));
}
function collision(b1: Balle, b2: Balle) {
  const D2 = b1.P.reduce((acc, v, i) => acc + (v - b2.P[i]) * (v - b2.P[i]), 0);
  const D = Math.sqrt(D2);
  if (D < b1.r + b2.r) {
    // Collision
    const dd = b1.r + b2.r - D;
    const V12 = b1.P.map((x, i) => b2.P[i] - x);
    const absV12 = Math.sqrt(V12.reduce((acc, x, i) => acc + x * x, 0));
    const V12N = V12.map((x) => x / absV12); // Vecteur normal

    // Décalage des balles
    b1.P.forEach((x, i) => (b1.P[i] -= (V12N[i] * dd) / 2));
    b2.P.forEach((x, i) => (b2.P[i] += (V12N[i] * dd) / 2));

    // Mise à jour des vitesses selon le vecteur V12N
    const M = b1.m + b2.m;
    const V1 = prodScal(V12N, b1.V);
    const V2 = prodScal(V12N, b2.V);
    const V1p = (2 * b2.m * V2 + (b1.m - b2.m) * V1) / M;
    const V2p = (2 * b1.m * V1 + (b2.m - b1.m) * V2) / M;
    const dV1 = V12N.map((x) => x * (coef * V1p - V1));
    const dV2 = V12N.map((x) => x * (coef * V2p - V2));
    b1.V.forEach((x, i) => (b1.V[i] += dV1[i]));
    b2.V.forEach((x, i) => (b2.V[i] += dV2[i]));
  }
}

function prodScal(v1: number[], v2: number[]): number {
  return v1.reduce((acc, x, i) => acc + x * v2[i], 0);
}

function manageBalle(b: Balle, dt: number, W: number) {
  b.P.forEach((x, i) => (b.P[i] = x + b.V[i] * dt));

  // Rebond au sol
  if (b.P[1] - b.r <= 0) {
    b.P[1] = b.r;
    b.V[1] = -coef * b.V[1];
  }

  // Rebond au mur
  if (b.P[0] - b.r <= 0 || b.P[0] + b.r >= W) {
    b.P[0] = Math.min(W - b.r, Math.max(b.r, b.P[0]));
    b.V[0] = -b.V[0];
  }

  // Accélération Gravity
  b.V[1] -= Gravity * dt;
}
