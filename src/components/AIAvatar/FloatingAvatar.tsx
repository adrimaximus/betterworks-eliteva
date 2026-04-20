import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AIAvatarStatic } from './AIAvatar';
import { ExpressionBubble } from './ExpressionBubble';
import { avatarController } from './AvatarController';
import type { Expression } from './types';
import { X, MessageCircle, Send } from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FloatingAvatarProps {
  welcomeMessage?: string;
  className?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ---------------------------------------------------------------------------
// Demo AI response
// ---------------------------------------------------------------------------

const DEMO_RESPONSES = [
  'Terima kasih! 🙏 Pesan Anda sudah saya terima. Tim kami akan segera follow-up! ✅🚀',
  'Wah pertanyaan bagus! 🤔 MARI saya bantu check dulu ya... 🔍',
  'Sudah selesai! ✅ Semuanya berjalan lancar 💪🎉',
  'Ada yang menarik nih! 💡 Coba kita diskusi lebih lanjut 😊',
  'Siap! 🚀 Saya langsung proses ya. Tunggu sebentar... ⏳',
];

// ---------------------------------------------------------------------------
// Keyframes injected once
// ---------------------------------------------------------------------------

let stylesInjected = false;

function injectFloatAnimation() {
  if (stylesInjected || typeof document === 'undefined') return;
  stylesInjected = true;

  const id = 'floating-avatar-keyframes';
  if (document.getElementById(id)) return;

  const sheet = document.createElement('style');
  sheet.id = id;
  sheet.textContent = `
    @keyframes floatingAvatarFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
  `;
  document.head.appendChild(sheet);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const FloatingAvatar: React.FC<FloatingAvatarProps> = ({
  welcomeMessage = 'Hai! 👋 Saya EliteVA AI Assistant. Ada yang bisa saya bantu? 😊',
  className = '',
}) => {
  // ----- state -----
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentExpression, setCurrentExpression] = useState<Expression>('neutral');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ----- inject keyframes on mount -----
  useEffect(() => {
    injectFloatAnimation();
  }, []);

  // ----- Subscribe to avatarController expression changes -----
  useEffect(() => {
    const unsubscribe = avatarController.subscribe((expr: Expression) => {
      setCurrentExpression(expr);
    });
    return unsubscribe;
  }, []);

  // ----- Scroll to bottom on new messages -----
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ----- Focus input when opened -----
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ----- Handlers -----
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => {
      if (!prev) {
        // Opening → seed welcome message
        setMessages((msgs) => {
          if (msgs.length === 0) {
            // Trigger greeting expression
            avatarController.processResponse(welcomeMessage);
            return [{ role: 'assistant', content: welcomeMessage }];
          }
          return msgs;
        });
      }
      return !prev;
    });
  }, [welcomeMessage]);

  const handleSend = useCallback(() => {
    const text = inputText.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      const aiMsg: ChatMessage = { role: 'assistant', content: randomResponse };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // Trigger expression via controller
      avatarController.processResponse(randomResponse);
    }, 1200);
  }, [inputText, isTyping]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // ----- Render -----

  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] ${className}`}
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ========== Collapsed avatar bubble ========== */}
      {import.meta.env.DEV && <button
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        className={`
          relative flex items-center justify-center
          w-16 h-16 rounded-full
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-[#fdd100]/60
          ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}
        `}
        style={{
          animation: isOpen ? 'none' : 'floatingAvatarFloat 3s ease-in-out infinite',
          background: 'linear-gradient(135deg, #fdd100 0%, #f5c800 100%)',
          boxShadow: '0 4px 24px rgba(253, 209, 0, 0.35), 0 0 0 3px rgba(253, 209, 0, 0.15)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.transform = '';
        }}
      >
        {/* Inner avatar */}
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <AIAvatarStatic expression={currentExpression} size={56} />
        </div>

        {/* Online indicator dot */}
        <span
          className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white"
          style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.6)' }}
        />

        {/* Chat icon hint */}
        <MessageCircle
          className="absolute -top-1 -left-1 w-4 h-4 text-gray-800 bg-[#fdd100] rounded-full p-0.5"
          strokeWidth={2.5}
        />
      </button>}

      {/* ========== Expanded chat panel ========== */}
      <div
        className={`
          fixed bottom-24 right-6
          w-[380px] h-[500px]
          rounded-2xl
          overflow-hidden
          flex flex-col
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-75 opacity-0 pointer-events-none'}
        `}
        style={{
          background: 'rgba(15, 15, 20, 0.92)',
          backdropFilter: 'blur(20px) saturate(1.6)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
          boxShadow:
            '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(253,209,0,0.1), 0 0 40px rgba(253,209,0,0.05)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(253,209,0,0.12) 0%, rgba(253,209,0,0.04) 100%)',
            borderBottom: '1px solid rgba(253,209,0,0.12)',
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #fdd100, #f5c800)' }}
            >
              <AIAvatarStatic expression={currentExpression} size={36} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">EliteVA AI</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online
              </p>
            </div>
          </div>

          <button
            onClick={toggleOpen}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg, idx) => {
            if (msg.role === 'assistant') {
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1"
                    style={{ background: 'linear-gradient(135deg, #fdd100, #f5c800)' }}
                  >
                    <AIAvatarStatic expression={currentExpression} size={32} />
                  </div>
                  <div className="flex-1">
                    <ExpressionBubble
                      message={msg.content}
                      avatarSize={0}
                      showAvatar={false}
                      animated={false}
                      className="max-w-full"
                    />
                  </div>
                </div>
              );
            }

            return (
              <div key={idx} className="flex justify-end">
                <div
                  className="rounded-2xl rounded-br-sm px-3.5 py-2"
                  style={{
                    background: 'linear-gradient(135deg, #fdd100 0%, #f5c800 100%)',
                  }}
                >
                  <p className="text-sm text-gray-900 leading-relaxed">{msg.content}</p>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-1 px-2 py-1">
              <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div
          className="shrink-0 px-3 py-3 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ketik pesan..."
            disabled={isTyping}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fdd100]/40 focus:ring-1 focus:ring-[#fdd100]/20 transition-colors disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className="p-2 rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background:
                inputText.trim() && !isTyping
                  ? 'linear-gradient(135deg, #fdd100, #f5c800)'
                  : 'rgba(255,255,255,0.05)',
              color: inputText.trim() ? '#111' : '#666',
            }}
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingAvatar;
