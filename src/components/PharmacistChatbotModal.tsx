import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  Loader2,
  RotateCcw,
  Copy,
  Check,
  Stethoscope,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Minus,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  source?: string;
}

interface PharmacistChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const INITIAL_GREETING = "Hello! I am Pharmacist Betremaryam, what can I help you with today? I can answer questions on the Ethiopian Standard Treatment Guidelines, drug-drug interactions, renal dosing adjustments, cultural fasting chronotherapy, or clinical pharmacotherapy.";

const CLINICAL_SUGGESTIONS = [
  "How should Dolutegravir be dosed with Rifampicin?",
  "Renal dose for Ciprofloxacin with CrCl 28 mL/min",
  "First-line hypertension in Ethiopian STG",
  "Diabetes meds during Ethiopian Orthodox fasting",
  "Signs of Digoxin toxicity & monitoring"
];

export const PharmacistChatbotModal: React.FC<PharmacistChatbotModalProps> = ({
  isOpen,
  onClose,
  initialQuery
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'greeting-1',
      role: 'model',
      content: INITIAL_GREETING,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: 'gemini-3.8-flash'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keyboard escape listener to easily close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus input on open or un-minimize
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initialQuery if passed
  useEffect(() => {
    if (initialQuery && initialQuery.trim() && isOpen) {
      handleSendMessage(initialQuery.trim());
    }
  }, [initialQuery, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Send conversation history to /api/chat
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: data.reply || "Hello! I am Pharmacist Betremaryam. I am ready to review clinical cases, medications, and dosing guidelines.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackMessage: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        role: 'model',
        content: `Hello! I am Pharmacist Betremaryam. I am currently offline from the live LLM service, but you can continue checking our Ethiopian Standard Treatment Guidelines and Bedside Renal Calculators.\n\nTip: You can ask specific questions about drug interactions, doses, or formulary availability.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'clinical-offline'
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `greeting-${Date.now()}`,
        role: 'model',
        content: INITIAL_GREETING,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'gemini-3.8-flash'
      }
    ]);
  };

  if (!isOpen) return null;

  // Minimized docked bar in bottom right corner
  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#10201C] text-white shadow-2xl hover:bg-[#173029] border border-[#2A453E] transition-all cursor-pointer group"
          title="Click to maximize chat"
        >
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#1E6B5E] text-white">
            <Stethoscope className="w-3.5 h-3.5 text-[#8FB8AC]" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold text-white flex items-center gap-1 leading-tight">
              Pharmacist Betremaryam
            </div>
            <div className="text-[0.62rem] text-emerald-300 leading-tight">
              Click to resume consultation
            </div>
          </div>
          <ChevronUp className="w-4 h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          onClick={onClose}
          aria-label="Close chat"
          title="Close chat"
          className="w-9 h-9 rounded-full bg-[#10201C] border border-[#2A453E] text-white/80 hover:text-white hover:bg-red-600 flex items-center justify-center transition-colors shadow-2xl cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-4 sm:right-4 z-50 flex flex-col pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={`bg-[#FAF9F5] border border-[#DCD8CF] ${
          isExpanded
            ? 'w-full sm:w-[540px] md:w-[600px] h-[88vh] sm:h-[620px]'
            : 'w-full sm:w-[380px] md:w-[400px] h-[520px] max-h-[82vh]'
        } rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
      >
        {/* Compact Header */}
        <div className="bg-[#10201C] text-white px-3.5 sm:px-4 py-2.5 flex items-center justify-between border-b border-[#1C362F] shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-8 h-8 rounded-full bg-[#1E6B5E] border border-[#8FB8AC]/40 flex items-center justify-center text-white shadow-xs shrink-0">
              <Stethoscope className="w-4 h-4 text-[#8FB8AC]" />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#10201C]"></span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs sm:text-sm text-white truncate">
                  Pharmacist Betremaryam
                </h3>
              </div>
              <p className="text-[0.66rem] text-[#8FB8AC] flex items-center gap-1 leading-tight">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="truncate">AI Preceptor · Online</span>
              </p>
            </div>
          </div>

          {/* Action buttons (Clear Close, Minimize, Expand, Reset) */}
          <div className="flex items-center gap-1 shrink-0 ml-2">
            <button
              onClick={handleReset}
              aria-label="Restart chat"
              title="Restart conversation"
              className="p-1.5 text-[#8FB8AC] hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Compact view' : 'Expand view'}
              title={isExpanded ? 'Restore compact size' : 'Expand window'}
              className="hidden sm:flex p-1.5 text-[#8FB8AC] hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize chat"
              title="Minimize chat"
              className="p-1.5 text-[#8FB8AC] hover:text-white hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            {/* Highly prominent Close Button */}
            <button
              onClick={onClose}
              aria-label="Close chat"
              title="Close chat (Esc)"
              className="p-1.5 text-white bg-white/15 hover:bg-red-600 hover:text-white rounded-md transition-colors cursor-pointer flex items-center justify-center border border-white/20 shadow-xs ml-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clinical Guidelines Micro-Banner */}
        <div className="bg-[#E4EEEA] border-b border-[#BBD7CF] px-3 py-1 flex items-center justify-between text-[0.66rem] text-[#12463C] shrink-0">
          <div className="flex items-center gap-1.5 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E6B5E] shrink-0" />
            <span className="truncate font-medium">
              Ethiopian STG &amp; WHO Formularies
            </span>
          </div>
          <span className="text-[#5B6360] font-mono text-[0.62rem] shrink-0 ml-1">Gemini 3.8 Flash</span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 space-y-3">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-[#1E6B5E] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Stethoscope className="w-3.5 h-3.5 text-[#8FB8AC]" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] rounded-2xl p-3 text-xs sm:text-xs leading-relaxed shadow-xs relative group ${
                    isUser
                      ? 'bg-[#1E6B5E] text-white rounded-tr-none'
                      : 'bg-white border border-[#DCD8CF] text-[#1B211E] rounded-tl-none'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-2 mb-1 text-[0.65rem] opacity-80">
                    <span className="font-bold">
                      {isUser ? 'You' : 'Pharmacist Betremaryam'}
                    </span>
                    <span className="font-mono text-[0.62rem]">{msg.timestamp}</span>
                  </div>

                  {/* Message Content */}
                  <div className="whitespace-pre-wrap break-words space-y-1.5">
                    {msg.content}
                  </div>

                  {/* Message Tools (Copy) */}
                  {!isUser && (
                    <div className="mt-1.5 pt-1.5 border-t border-[#E8E5DD] flex items-center justify-between text-[0.64rem] text-[#757D79]">
                      <span className="italic">Clinical AI Response</span>
                      <button
                        onClick={() => handleCopy(msg.content, msg.id)}
                        className="inline-flex items-center gap-1 hover:text-[#1E6B5E] cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Inline Clinical Suggestions (Inside messages feed so they never push input out of view) */}
          {messages.length <= 1 && (
            <div className="pt-1 pb-1">
              <span className="text-[0.68rem] font-semibold text-[#525E59] block mb-1.5">
                Quick Clinical Inquiries:
              </span>
              <div className="flex flex-col gap-1.5">
                {CLINICAL_SUGGESTIONS.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(suggestion)}
                    disabled={isLoading}
                    className="text-[0.7rem] px-2.5 py-1.5 rounded-lg bg-white border border-[#DCD8CF] text-[#1B211E] hover:border-[#1E6B5E] hover:bg-[#F2F7F5] transition-colors cursor-pointer text-left shadow-2xs leading-snug"
                  >
                    💬 {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typing Indicator (Visible when AI is typing) */}
          {isLoading && (
            <div className="flex gap-2.5 justify-start items-start pt-1">
              <div className="w-7 h-7 rounded-full bg-[#1E6B5E] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <Stethoscope className="w-3.5 h-3.5 text-[#8FB8AC]" />
              </div>
              <div className="bg-white border border-[#DCD8CF] rounded-2xl rounded-tl-none px-3.5 py-2.5 shadow-xs flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B5E] animate-bounce" />
                </div>
                <span className="text-xs text-[#525E59] font-medium">Pharmacist Betremaryam is typing...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar (Permanently docked at the bottom with shrink-0) */}
        <div className="p-2.5 sm:p-3 bg-white border-t border-[#DCD8CF] shrink-0 shadow-xs">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-1.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              placeholder="Ask a question (e.g. dose, interaction)..."
              className="flex-1 p-2 sm:p-2.5 text-xs rounded-xl bg-[#FAF9F5] border border-[#DCD8CF] focus:outline-none focus:border-[#1E6B5E] focus:ring-1 focus:ring-[#1E6B5E] text-[#1B211E] placeholder:text-[#888F8B] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#1E6B5E] hover:bg-[#12463C] disabled:bg-[#1E6B5E]/40 text-white font-semibold text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-xs shrink-0"
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">Send</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </form>
          <div className="flex items-center justify-between text-[0.62rem] text-[#757D79] mt-1.5 px-0.5">
            <span className="truncate">Pharmacist Betremaryam AI · Enter to send</span>
            <button
              type="button"
              onClick={onClose}
              className="text-[#525E59] hover:text-red-600 underline cursor-pointer ml-2 shrink-0"
            >
              Close chat
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

