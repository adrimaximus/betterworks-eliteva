export type Expression =
  | 'neutral'
  | 'happy'
  | 'sad'
  | 'angry'
  | 'fear'
  | 'surprise'
  | 'disgust'
  | 'thinking'
  | 'confused'
  | 'excited'
  | 'sleepy'
  | 'love'
  | 'annoyed'
  | 'shy'
  | 'proud'
  | 'bored'
  | 'nervous'
  | 'curious'
  | 'suspicious'
  | 'relieved'
  | 'ready'
  | 'processing'
  | 'listening'
  | 'speaking'
  | 'error'
  | 'greeting'
  | 'winking'
  | 'celebrating'
  | 'smirking'
  | 'wave_goodbye'
  | 'awkward'
  | 'determined'
  | 'hopeful'
  | 'grateful'
  | 'daydreaming'
  | 'alert';

// Expressions that should loop continuously
export const LOOPING_EXPRESSIONS: Expression[] = [
  'neutral',
  'processing',
  'thinking',
  'listening',
  'sleepy',
  'daydreaming',
  'bored',
];

// Duration (ms) each non-looping expression plays before returning to neutral
export const EXPRESSION_DURATION: number = 2500;

// Max expressions queued from a single response
export const MAX_QUEUE_SIZE: number = 5;
