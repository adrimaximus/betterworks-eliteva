import { Expression, LOOPING_EXPRESSIONS, EXPRESSION_DURATION, MAX_QUEUE_SIZE } from './types';
import { parseExpressionsFromText, sentimentFallback } from './emojiMapper';

export class AvatarController {
  private currentExpression: Expression = 'neutral';
  private queue: Expression[] = [];
  private isPlaying: boolean = false;
  private listeners: Set<(expr: Expression) => void> = new Set();
  private playTimer: ReturnType<typeof setTimeout> | null = null;

  // --- Public API ---

  processResponse(text: string): void {
    const expressions = parseExpressionsFromText(text);
    if (expressions.length === 0) {
      const fallback = sentimentFallback(text);
      this.queueExpressions([fallback]);
    } else {
      this.queueExpressions(expressions);
    }
  }

  processExpression(expr: Expression): void {
    this.queueExpressions([expr]);
  }

  setIdleState(): void {
    this.clearTimer();
    this.queue = [];
    this.setExpression('daydreaming');
  }

  reset(): void {
    this.clearTimer();
    this.queue = [];
    this.isPlaying = false;
    this.setExpression('neutral');
  }

  subscribe(fn: (expr: Expression) => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  getCurrentExpression(): Expression {
    return this.currentExpression;
  }

  isAnimating(): boolean {
    return this.isPlaying;
  }

  // --- Private Methods ---

  private queueExpressions(expressions: Expression[]): void {
    const available = MAX_QUEUE_SIZE - this.queue.length;
    this.queue.push(...expressions.slice(0, available));
    if (!this.isPlaying) {
      this.playNext();
    }
  }

  private playNext(): void {
    this.clearTimer();

    const next = this.queue.shift();

    if (next) {
      this.isPlaying = true;
      this.setExpression(next);

      const duration = LOOPING_EXPRESSIONS.includes(next) ? EXPRESSION_DURATION * 3 : EXPRESSION_DURATION;
      this.playTimer = setTimeout(() => this.playNext(), duration);
    } else {
      // Queue exhausted — return to neutral after a beat
      this.isPlaying = false;
      this.playTimer = setTimeout(() => {
        this.setExpression('neutral');
      }, EXPRESSION_DURATION);
    }
  }

  private setExpression(expr: Expression): void {
    this.currentExpression = expr;
    this.listeners.forEach((fn) => fn(expr));
  }

  private clearTimer(): void {
    if (this.playTimer !== null) {
      clearTimeout(this.playTimer);
      this.playTimer = null;
    }
  }
}

export const avatarController = new AvatarController();
