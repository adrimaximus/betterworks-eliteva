import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { Expression, LOOPING_EXPRESSIONS } from './types';
import { avatarController } from './AvatarController';
import { getLottieData } from './LottieMapper';
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
// AIAvatar – controller-driven, subscribes to avatarController
// ---------------------------------------------------------------------------

export const AIAvatar: React.FC<AIAvatarProps> = ({
  size = 120,
  className,
  defaultExpression = 'neutral',
  onExpressionChange,
}) => {
  const [currentExpression, setCurrentExpression] = useState<Expression>(defaultExpression);
  const [animationData, setAnimationData] = useState<unknown>(null);
  const isMounted = useRef(true);

  // Load Lottie data whenever the expression changes
  useEffect(() => {
    const data = getLottieData(currentExpression);
    if (isMounted.current) {
      setAnimationData(data);
    }
  }, [currentExpression]);

  // Subscribe to the avatar controller on mount
  useEffect(() => {
    const handleExpressionChange = (expr: Expression) => {
      setCurrentExpression(expr);
      onExpressionChange?.(expr);
    };

    // Subscribe returns an unsubscribe function
    const unsubscribe = avatarController.subscribe(handleExpressionChange);

    // Load initial expression
    setCurrentExpression(defaultExpression);

    return () => {
      isMounted.current = false;
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn('ai-avatar relative', className)}
      style={{ width: size, height: size }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={LOOPING_EXPRESSIONS.includes(currentExpression)}
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-yellow-100 animate-pulse flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// AIAvatarStatic – standalone, driven by a direct expression prop
// ---------------------------------------------------------------------------

export const AIAvatarStatic: React.FC<AIAvatarStaticProps> = ({
  expression,
  size = 120,
  className,
}) => {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    const data = getLottieData(expression);
    setAnimationData(data);
  }, [expression]);

  return (
    <div
      className={cn('ai-avatar relative', className)}
      style={{ width: size, height: size }}
    >
      {animationData ? (
        <Lottie
          animationData={animationData}
          loop={LOOPING_EXPRESSIONS.includes(expression)}
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full rounded-full bg-yellow-100 animate-pulse flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
        </div>
      )}
    </div>
  );
};

export default AIAvatar;
