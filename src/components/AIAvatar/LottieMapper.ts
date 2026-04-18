import type { Expression } from './types';

type LottieData = unknown;

const STUB: LottieData = null;

export const EXPRESSION_LOTTIE_MAP: Record<Expression, LottieData> = {
  neutral: STUB, happy: STUB, sad: STUB, angry: STUB, fear: STUB,
  surprise: STUB, disgust: STUB, thinking: STUB, confused: STUB,
  excited: STUB, sleepy: STUB, love: STUB, annoyed: STUB, shy: STUB,
  proud: STUB, bored: STUB, nervous: STUB, curious: STUB, suspicious: STUB,
  relieved: STUB, ready: STUB, processing: STUB, listening: STUB,
  speaking: STUB, error: STUB, greeting: STUB, winking: STUB,
  celebrating: STUB, smirking: STUB, wave_goodbye: STUB, awkward: STUB,
  determined: STUB, hopeful: STUB, grateful: STUB, daydreaming: STUB,
  alert: STUB,
};

export function getLottieData(expression: Expression): LottieData | null {
  return EXPRESSION_LOTTIE_MAP[expression] ?? null;
}

export function getAnimationName(expression: Expression): string {
  return expression;
}
