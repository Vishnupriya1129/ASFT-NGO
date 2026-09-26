'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Check, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  isQuestion?: boolean;
}

const STATIC_ANSWERS = {
  name: "We are Aram Saeivom Family Trust — a non-profit organization founded in 2017. We work in education, healthcare, environmental action, and humanitarian support across Tamil Nadu, India. 🌱",
  contact: "You can reach us at:\n\n📧 aramsaeivom@gmail.com\n📞 +91 85080 53583\n📍 No.381, Transport Nagar, PTC Post, Madurai – 625022\n\nWe usually reply within a day! 💚",
};

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 Welcome to Aram Saeivom Family Trust.", sender: 'bot' },
    { id: 2, text: "What would you like to know?", sender: 'bot' },
  ]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showCustomForm]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
  };

  const handleStaticQuestion = (question: 'name' | 'contact') => {
    const questionText = question === 'name' ? 'What is your name?' : 'Contact info';
    addMessage(questionText, 'user');
    
    setTimeout(() => {
      addMessage(STATIC_ANSWERS[question], 'bot');
    }, 600);
  };

  const handleCustomMessage = () => {
    addMessage('I want to send a custom message', 'user');
    setTimeout(() => {
      addMessage("Sure! I'd love to hear from you. Just fill in these details below. 💌", 'bot');
      setShowCustomForm(true);
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: 'Chat Widget Message',
        }),
      });

      if (response.ok) {
        setStatus('success');
        addMessage(`Thank you, ${formData.name}! 💚 Your message has been sent. We'll get back to you soon.`, 'bot');
        setFormData({ name: '', email: '', message: '' });
        setShowCustomForm(false);
      } else {
        setStatus('error');
        addMessage("Oops! Something went wrong. Please try again. 😔", 'bot');
      }
    } catch (error) {
      setStatus('error');
      addMessage("Oops! Something went wrong. Please try again. 😔", 'bot');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetChat = () => {
    setMessages([
      { id: 1, text: "Hi there! 👋 Welcome to Aram Saeivom Family Trust.", sender: 'bot' },
      { id: 2, text: "What would you like to know?", sender: 'bot' },
    ]);
    setShowCustomForm(false);
    setStatus('idle');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isOpen ? 0 : 1,
          opacity: isOpen ? 0 : 1,
          y: [0, -6, 0], // gentle bobbing
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #4A90D9 40%, #C9A227 100%)',
          boxShadow: '0 8px 30px rgba(74, 144, 217, 0.4), 0 4px 12px rgba(201, 162, 39, 0.3)',
        }}
        aria-label="Open chat"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: 'linear-gradient(135deg, #87CEEB, #C9A227)' }}
        />
        <MessageCircle size={28} className="relative z-10" />
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="fixed bottom-6 right-6 z-[60] w-[calc(100vw-3rem)] max-w-[400px] rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 20px 60px rgba(15, 34, 61, 0.3), 0 8px 24px rgba(201, 162, 39, 0.2)',
              }}
            >
              {/* Header — Sky */}
              <div
                className="relative px-5 py-4 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #87CEEB 0%, #4A90D9 50%, #6BB6E5 100%)',
                }}
              >
                {/* Cloud decorations */}
                <div className="absolute top-2 right-4 w-16 h-6 bg-white/20 rounded-full blur-sm" />
                <div className="absolute top-4 right-12 w-12 h-5 bg-white/15 rounded-full blur-sm" />
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-lg">
                        🌱
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">ASFT Team</p>
                      <p className="text-white/80 text-[11px]">Usually replies within a day</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-all"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages area — Earth */}
              <div
                className="h-[400px] overflow-y-auto px-4 py-5 space-y-4"
                style={{
                  background: 'linear-gradient(180deg, #FDFAF3 0%, #F5F0E0 50%, #F0E8D5 100%)',
                }}
              >
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-[#4A90D9] to-[#3A7BC0] text-white rounded-[18px] rounded-br-[4px]'
                          : 'bg-white text-gray-800 rounded-[18px] rounded-bl-[4px] border border-[#E5D9B8]'
                      }`}
                      style={{
                        boxShadow: msg.sender === 'user' 
                          ? '0 2px 8px rgba(74, 144, 217, 0.25)' 
                          : '0 2px 8px rgba(201, 162, 39, 0.1)',
                      }}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {/* Static Question Pills */}
                {!showCustomForm && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-2 pt-2"
                  >
                    <button
                      onClick={() => handleStaticQuestion('name')}
                      className="px-3 py-1.5 text-xs bg-white text-[#0F223D] border border-[#C9A227]/40 rounded-full hover:bg-[#FDFAF3] hover:border-[#C9A227] transition-all shadow-sm"
                    >
                      What is your name?
                    </button>
                    <button
                      onClick={() => handleStaticQuestion('contact')}
                      className="px-3 py-1.5 text-xs bg-white text-[#0F223D] border border-[#C9A227]/40 rounded-full hover:bg-[#FDFAF3] hover:border-[#C9A227] transition-all shadow-sm"
                    >
                      Contact info
                    </button>
                    <button
                      onClick={handleCustomMessage}
                      className="px-3 py-1.5 text-xs text-white rounded-full hover:opacity-90 transition-all shadow-sm flex items-center gap-1.5"
                      style={{
                        background: 'linear-gradient(135deg, #4A90D9, #C9A227)',
                      }}
                    >
                      <Sparkles size={12} />
                      Custom message
                    </button>
                  </motion.div>
                )}

                {/* Custom Form */}
                {showCustomForm && (
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-4 border border-[#E5D9B8] shadow-sm space-y-2.5"
                  >
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-[#E5D9B8] rounded-xl focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent outline-none transition-all"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-3 py-2 text-sm border border-[#E5D9B8] rounded-xl focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent outline-none transition-all"
                    />
                    <textarea
                      placeholder="Your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-[#E5D9B8] rounded-xl focus:ring-2 focus:ring-[#4A90D9] focus:border-transparent outline-none resize-none transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 text-sm font-semibold text-white rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #4A90D9, #C9A227)',
                      }}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}

                {/* Status */}
                {status === 'success' && !showCustomForm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-xl"
                  >
                    <Check size={14} />
                    Message sent successfully!
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Footer */}
              <div className="px-4 py-2 text-center text-[10px] text-gray-500 bg-white/50 border-t border-[#E5D9B8]">
                <button onClick={resetChat} className="hover:text-[#4A90D9] transition-colors">
                  Start a new conversation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}