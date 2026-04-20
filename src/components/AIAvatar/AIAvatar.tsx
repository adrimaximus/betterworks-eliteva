import './emoji-animations.css';
import React, { useState, useEffect } from 'react';
import { Expression, LOOPING_EXPRESSIONS } from './types';
import { avatarController } from './AvatarController';
import { getEmojiForExpression } from './emojiMapper';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface AIAvatarProps {
  size?: number;
  className?: string;
  defaultExpression?: Expression;
  onExpressionChange?: (expr: Expression) => void;
}

interface AIAvatarStaticProps {
  expression: Expression;
  size?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Emoji Avatar Component
// ---------------------------------------------------------------------------

const EmojiAvatar: React.FC<{ expression: Expression; size: number }> = ({ expression, size }) => {
  const emoji = getEmojiForExpression(expression);
  const isLooping = LOOPING_EXPRESSIONS.includes(expression);
  
  return (
    <div
      className="w-full h-full rounded-full flex items-center justify-center select-none"
      style={{
        background: 'linear-gradient(135deg, #fdd100 0%, #f5c800 100%)',
        animation: isLooping ? 'emojiBounce 2s ease-in-out infinite' : 'emojiPop 0.3s ease-out',
        fontSize: size * 0.55,
        lineHeight: 1,
      }}
    >
      {emoji}
    </div>
  );
};

// ---------------------------------------------------------------------------
// AIAvatar – controller-driven
// ---------------------------------------------------------------------------

export const AIAvatar: React.FC<AIAvatarProps> = ({
  size = 120,
  className,
  defaultExpression = 'neutral',
  onExpressionChange,
}) => {
  const [currentExpression, setCurrentExpression] = useState<Expression>(defaultExpression);

  useEffect(() => {
    const handleExpressionChange = (expr: Expression) => {
      setCurrentExpression(expr);
      onExpressionChange?.(expr);
    };
    const unsubscribe = avatarController.subscribe(handleExpressionChange);
    setCurrentExpression(defaultExpression);
    return () => { unsubscribe(); };
  }, []);

  return (
    <div
      className={cn('ai-avatar relative', className)}
      style={{ width: size, height: size }}
    >
      <EmojiAvatar expression={currentExpression} size={size} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// AIAvatarStatic – standalone
// ---------------------------------------------------------------------------

export const AIAvatarStatic: React.FC<AIAvatarStaticProps> = ({
  expression,
  size = 120,
  className,
}) => {
  return (
    <div
      className={cn('ai-avatar relative', className)}
      style={{ width: size, height: size }}
    >
      <EmojiAvatar expression={expression} size={size} />
    </div>
  );
};

export default AIAvatar;
