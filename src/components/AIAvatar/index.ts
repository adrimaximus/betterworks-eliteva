// Components
export { AIAvatar, AIAvatarStatic } from './AIAvatar';
export { ExpressionBubble } from './ExpressionBubble';
export { FloatingAvatar } from './FloatingAvatar';

// Controller (singleton)
export { avatarController } from './AvatarController';

// Utilities
export { parseExpressionsFromText, sentimentFallback } from './emojiMapper';
export { getLottieData, getAnimationName, EXPRESSION_LOTTIE_MAP } from './LottieMapper';

// Types
export type { Expression } from './types';
export { LOOPING_EXPRESSIONS, EXPRESSION_DURATION, MAX_QUEUE_SIZE } from './types';
