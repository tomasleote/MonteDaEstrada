export const duration = {
  micro: 0.15,
  short: 0.3,
  medium: 0.5,
  long: 0.7,
  cinematic: 1.0,
  editorial: 0.9,
};

export const ease = {
  entrance: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
  standard: [0.4, 0, 0.2, 1],
  elegant: [0.25, 0.46, 0.45, 0.94],
  emphasis: [0.34, 1.56, 0.64, 1],
  organic: [0.22, 1, 0.36, 1],
};

export const stagger = {
  fast: 0.04,
  default: 0.06,
  slow: 0.1,
  dramatic: 0.15,
};

export const distance = {
  subtle: 12,
  default: 24,
  dramatic: 40,
  headline: 32,
};

export const viewport = {
  default: { once: true, amount: 0.15 },
  eager: { once: true, amount: 0.05 },
  centered: { once: true, amount: 0.4 },
};
