import type { Expression } from './types';
import { MAX_QUEUE_SIZE } from './types';

// ─── Emoji → Expression Map ──────────────────────────────────────────────────
// Comprehensive mapping of emoji characters to avatar Expression types.
// Each emoji maps to a single expression. Multiple emojis can share one target.

const EMOJI_TO_EXPRESSION: ReadonlyMap<string, Expression> = new Map([
  // Happy
  ['😊', 'happy'],
  ['😄', 'happy'],
  ['😁', 'happy'],
  ['🙂', 'happy'],
  ['😀', 'happy'],
  ['😃', 'happy'],
  ['😆', 'happy'],
  ['😋', 'happy'],
  ['🤗', 'happy'],
  ['😚', 'happy'],
  ['☺️', 'happy'],

  // Celebrating
  ['🎉', 'celebrating'],
  ['🥳', 'celebrating'],
  ['🎊', 'celebrating'],
  ['🎈', 'celebrating'],
  ['🍾', 'celebrating'],
  ['🎂', 'celebrating'],

  // Love
  ['❤️', 'love'],
  ['😍', 'love'],
  ['💕', 'love'],
  ['🥰', 'love'],
  ['💗', 'love'],
  ['💖', 'love'],
  ['💘', 'love'],
  ['😘', 'love'],
  ['💓', 'love'],
  ['💜', 'love'],

  // Proud / Success
  ['✅', 'proud'],
  ['💪', 'proud'],
  ['🏆', 'proud'],
  ['⭐', 'proud'],
  ['🌟', 'proud'],
  ['💯', 'proud'],
  ['🏅', 'proud'],
  ['🥇', 'proud'],
  ['👏', 'proud'],
  ['👌', 'proud'],

  // Excited
  ['🚀', 'excited'],
  ['🔥', 'excited'],
  ['⚡', 'excited'],
  ['💥', 'excited'],
  ['✨', 'excited'],

  // Thinking
  ['🤔', 'thinking'],
  ['💡', 'thinking'],
  ['🧠', 'thinking'],
  ['🔍', 'thinking'],
  ['🔎', 'thinking'],
  ['📖', 'thinking'],

  // Sad
  ['😢', 'sad'],
  ['😞', 'sad'],
  ['😔', 'sad'],
  ['😭', 'sad'],
  ['😥', 'sad'],
  ['😿', 'sad'],
  ['💔', 'sad'],

  // Alert
  ['❌', 'alert'],
  ['⚠️', 'alert'],
  ['🚨', 'alert'],
  ['⛔', 'alert'],
  ['🛑', 'alert'],

  // Surprise
  ['😲', 'surprise'],
  ['😱', 'surprise'],
  ['🤯', 'surprise'],
  ['😮', 'surprise'],
  ['😯', 'surprise'],
  ['💀', 'surprise'],
  ['😳', 'surprise'],
  ['🙉', 'surprise'],

  // Smirking / Cool
  ['😎', 'smirking'],
  ['😏', 'smirking'],
  ['🤓', 'smirking'],
  ['😈', 'smirking'],
  ['👺', 'smirking'],

  // Winking
  ['😉', 'winking'],
  ['😜', 'winking'],
  ['🤪', 'winking'],

  // Fear
  ['😨', 'fear'],
  ['😰', 'fear'],
  ['😱', 'fear'],
  ['👻', 'fear'],

  // Angry
  ['😠', 'angry'],
  ['😡', 'angry'],
  ['🤬', 'angry'],
  ['😤', 'angry'],

  // Sleepy
  ['😴', 'sleepy'],
  ['💤', 'sleepy'],
  ['🥱', 'sleepy'],
  ['😪', 'sleepy'],
  ['🛌', 'sleepy'],

  // Confused
  ['😕', 'confused'],
  ['🫤', 'confused'],
  ['🙄', 'confused'],
  ['🤷', 'confused'],

  // Nervous
  ['😓', 'nervous'],
  ['😬', 'nervous'],
  ['🫣', 'nervous'],

  // Greeting
  ['👋', 'greeting'],
  ['🤝', 'greeting'],
  ['🙌', 'greeting'],
  ['🫡', 'greeting'],

  // Grateful
  ['🙏', 'grateful'],
  ['🫶', 'grateful'],

  // Curious
  ['👀', 'curious'],
  ['👁️', 'curious'],
  ['🧐', 'curious'],

  // Shy
  ['🙈', 'shy'],
  ['😳', 'shy'],
  ['🫣', 'shy'],

  // Relieved
  ['😅', 'relieved'],
  ['😮‍💨', 'relieved'],
  ['🫠', 'relieved'],

  // Determined / Ready
  ['👊', 'determined'],
  ['🎯', 'determined'],
  ['🏋️', 'determined'],
  ['⚔️', 'determined'],

  // Hopeful / Awkward
  ['🤞', 'hopeful'],
  ['🍀', 'hopeful'],
  ['😅', 'awkward'],
  ['🤦', 'awkward'],
  ['🤦‍♂️', 'awkward'],
  ['🤦‍♀️', 'awkward'],

  // Bored / Annoyed
  ['😑', 'bored'],
  ['😐', 'bored'],
  ['😒', 'annoyed'],
  ['🙄', 'annoyed'],
  ['tuk', 'annoyed'],
]);

// ─── Emoji Regex ─────────────────────────────────────────────────────────────
// Matches emoji characters including skin-tone modifiers, ZWJ sequences, etc.
const EMOJI_REGEX = /\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu;

// ─── parseExpressionsFromText ────────────────────────────────────────────────
// Scans text for emoji characters and maps them to deduplicated Expression[].
// Returns at most MAX_QUEUE_SIZE expressions, or [] if none found.

export function parseExpressionsFromText(text: string): Expression[] {
  const matches = text.match(EMOJI_REGEX);
  if (!matches) return [];

  const seen = new Set<Expression>();
  const results: Expression[] = [];

  for (const emoji of matches) {
    const expression = EMOJI_TO_EXPRESSION.get(emoji);
    if (expression && !seen.has(expression)) {
      seen.add(expression);
      results.push(expression);
      if (results.length >= MAX_QUEUE_SIZE) break;
    }
  }

  return results;
}

// ─── sentimentFallback ───────────────────────────────────────────────────────
// Keyword-based sentiment analysis (Indonesian + English) for when no emoji
// is found in the text. Returns a single Expression.

export function sentimentFallback(text: string): Expression {
  const lower = text.toLowerCase();

  // Alert / error
  if (/\b(error|gagal|fail|salah|gagal|bug|crash|broken|masalah|problem|tidak bisa|unable|invalid|rugi|kerugian)\b/.test(lower)) {
    return 'alert';
  }

  // Happy / success
  if (/\b(berhasil|sukses|done|selesai|mantap|keren|great|awesome|perfect|amazing|good|nice|excelente|hebat|bagus|mantab|sip|oke|ok|yay)\b/.test(lower)) {
    return 'happy';
  }

  // Thinking / analytical
  if (/\b(coba|check|analisa|mikir|think|analyze|investigate|review|periksa|cek|kaji|tinjau|mari kita|let's|how about)\b/.test(lower)) {
    return 'thinking';
  }

  // Sad / apologetic
  if (/\b(maaf|sorry|unfortunately|sayang|terima kasih|ampun|menyesal|regret)\b/.test(lower)) {
    return 'sad';
  }

  // Surprise
  if (/\b(wah|wow|kaget|serius|beneran|really|omg|astaga|gila|gila sih|anjir|wtf|no way)\b/.test(lower)) {
    return 'surprise';
  }

  // Grateful
  if (/\b(terima kasih|thanks|makasih|trims|appreciate|grateful)\b/.test(lower)) {
    return 'grateful';
  }

  // Greeting
  if (/\b(halo|hai|hi|hello|hey|selamat|pagi|siang|sore|malam|assalam)\b/.test(lower)) {
    return 'greeting';
  }

  // Excited
  if (/\b(semangat|excited|gas|let's go|ayo|siap|ready|pumped|motivasi)\b/.test(lower)) {
    return 'excited';
  }

  return 'neutral';
}

// ─── Reverse: Expression → Emoji ─────────────────────────────────────────────
const EXPRESSION_TO_EMOJI: Record<Expression, string> = {
  neutral: '😊',
  happy: '😄',
  sad: '😢',
  angry: '😠',
  fear: '😨',
  surprise: '😲',
  disgust: '🤢',
  thinking: '🤔',
  confused: '😕',
  excited: '🤩',
  sleepy: '😴',
  love: '😍',
  annoyed: '😒',
  shy: '🙈',
  proud: '😎',
  bored: '😐',
  nervous: '😬',
  curious: '🧐',
  suspicious: '🤨',
  relieved: '😅',
  ready: '👊',
  processing: '⏳',
  listening: '👂',
  speaking: '🗣️',
  error: '❌',
  greeting: '👋',
  winking: '😉',
  celebrating: '🥳',
  smirking: '😏',
  wave_goodbye: '👋',
  awkward: '😅',
  determined: '💪',
  hopeful: '🤞',
  grateful: '🙏',
  daydreaming: '💭',
  alert: '⚠️',
};

export function getEmojiForExpression(expression: Expression): string {
  return EXPRESSION_TO_EMOJI[expression] || '😊';
}
