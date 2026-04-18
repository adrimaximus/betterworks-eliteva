import React, { useState, useEffect, useRef } from 'react';
import { AIAvatarStatic } from './AIAvatar';
import { avatarController } from './AvatarController';
import { Expression } from './types';
import { cn } from '@/lib/utils';

interface ExpressionBubbleProps {
  message: string;
  isStreaming?: boolean;
  className?: string;
  avatarSize?: number;
  showAvatar?: boolean;
  animated?: boolean;
}

const ExpressionBubble: React.FC<ExpressionBubbleProps> = ({
  message,
  isStreaming = false,
  className,
  avatarSize = 80,
  showAvatar = true,
  animated = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentExpression, setCurrentExpression] = useState<Expression>('neutral');
  const [isTyping, setIsTyping] = useState(false);
  const [bounce, setBounce] = useState(false);
  const indexRef = useRef(0);
  const prevMessageRef = useRef('');

  // Typewriter effect
  useEffect(() => {
    if (!animated) {
      setDisplayedText(message);
      return;
    }

    if (message !== prevMessageRef.current) {
      prevMessageRef.current = message;
      indexRef.current = 0;
      setDisplayedText('');
      setIsTyping(true);

      // Trigger avatar expression — processResponse is synchronous
      avatarController.processResponse(message);

      // Listen to what the controller sets
      const expr = avatarController.getCurrentExpression();
      setCurrentExpression(expr);
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    }

    if (isStreaming) return;

    const interval = setInterval(() => {
      const idx = indexRef.current;
      if (idx < message.length) {
        setDisplayedText(message.slice(0, idx + 1));
        indexRef.current = idx + 1;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [message, animated, isStreaming]);

  // Append new characters during streaming
  useEffect(() => {
    if (isStreaming && message.length > displayedText.length) {
      setDisplayedText(message);
      setIsTyping(true);

      avatarController.processResponse(message);
      const expr = avatarController.getCurrentExpression();
      setCurrentExpression(expr);
    }
  }, [message, isStreaming, displayedText.length]);

  // Subscribe to expression changes from controller
  useEffect(() => {
    const unsubscribe = avatarController.subscribe((expr) => {
      setCurrentExpression(expr);
      setBounce(true);
      setTimeout(() => setBounce(false), 600);
    });
    return unsubscribe;
  }, []);

  const showCursor = isStreaming || isTyping;

  return (
    <div className={cn('font-sans flex items-start gap-3 max-w-md', className)}>
      {showAvatar && (
        <div
          className={cn(
            'shrink-0 transition-transform duration-500 ease-out',
            bounce && 'animate-bounce-once'
          )}
        >
          <AIAvatarStatic
            expression={currentExpression}
            size={avatarSize}
          />
        </div>
      )}

      <div
        className={cn(
          'relative rounded-2xl bg-white border border-gray-100 shadow-md px-4 py-3',
          'before:absolute before:top-3 before:-left-2 before:w-0 before:h-0',
          'before:border-t-8 before:border-b-8 before:border-r-8',
          'before:border-t-transparent before:border-b-transparent before:border-r-gray-100',
          'after:absolute after:top-3 after:-left-[5px] after:w-0 before:h-0',
          'after:border-t-8 after:border-b-8 after:border-r-8',
          'after:border-t-transparent after:border-b-transparent after:border-r-white'
        )}
      >
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {showCursor && (
            <span className="inline-block w-[2px] h-4 ml-0.5 align-middle bg-gray-400 animate-blink-cursor" />
          )}
        </p>
      </div>

      <style>{`
        @keyframes blink-cursor {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink-cursor {
          animation: blink-cursor 1s step-end infinite;
        }

        @keyframes bounce-once {
          0% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
          50% { transform: translateY(0); }
          70% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export { ExpressionBubble };
export default ExpressionBubble;
