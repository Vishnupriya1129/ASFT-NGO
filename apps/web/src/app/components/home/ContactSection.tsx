'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Check, AlertCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export function ContactSection() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! 👋 Welcome to Aram Saeivom Family Trust.", sender: 'bot' },
    { id: 2, text: "I'd love to hear from you. What's your name?", sender: 'bot' },
  ]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [step, setStep] = useState<'name' | 'email' | 'phone' | 'message' | 'done'>('name');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isOpen, setIsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen, step]);

  const addMessage = (text: string, sender: 'user' | 'bot') => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender }]);
  };

  const handleNext = async () => {
    if (step === 'name') {
      if (!name.trim()) return;
      addMessage(name, 'user');
      addMessage(`Nice to meet you, ${name}! 🌱 What's your email address?`, 'bot');
      setStep('email');
    } 
    else if (step === 'email') {
      if (!email.trim() || !email.includes('@')) return;
      addMessage(email, 'user');
      addMessage("Got it! Would you like to share your phone number? (Optional — just press Skip if not)", 'bot');
      setStep('phone');
    } 
    else if (step === 'phone') {
      if (phone.trim()) addMessage(phone, 'user');
      else addMessage('Skipped', 'user');
      addMessage("Perfect! Now, what would you like to tell us? 💬", 'bot');
      setStep('message');
    } 
    else if (step === 'message') {
      if (!userMessage.trim()) return;
      addMessage(userMessage, 'user');
      setStep('done');
      
      // Submit form
      setIsSubmitting(true);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            phone: phone || null,
            subject: null,
            message: userMessage,
          }),
        });

        if (response.ok) {
          setStatus('success');
          addMessage("Thank you so much! 💚 Your message has been sent. We'll get back to you soon!", 'bot');
        } else {
          setStatus('error');
          addMessage("Oops! Something went wrong. Please try again later. 😔", 'bot');
        }
      } catch (error) {
        setStatus('error');
        addMessage("Oops! Something went wrong. Please try again later. 😔", 'bot');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const resetForm = () => {
    setMessages([
      { id: 1, text: "Hi there! 👋 Welcome to Aram Saeivom Family Trust.", sender: 'bot' },
      { id: 2, text: "I'd love to hear from you. What's your name?", sender: 'bot' },
    ]);
    setName('');
    setEmail('');
    setPhone('');
    setUserMessage('');
    setStep('name');
    setStatus('idle');
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white" id="contact">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-3">
          <MessageCircle size={14} /> Get in Touch
        </span>
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#0a1628]">
          Let's Chat
        </h2>
        <div className="w-16 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
        <p className="text-gray-600 max-w-xl mx-auto mt-4">
          Have a question, idea, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      {/* Chat Widget */}
      <div className="max-w-3xl mx-auto">
        {/* Chat Button (when closed) */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex justify-center"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <MessageCircle size={22} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                </div>
                <span>Say Hello 👋</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Window (when opened) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl">
                      🌱
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-300 border-2 border-emerald-600 rounded-full" />
                  </div>
                  <div>
                    <p className="text-white font-bold">ASFT Team</p>
                    <p className="text-white/70 text-xs">Usually replies within a day</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    resetForm();
                  }}
                  className="text-white/80 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full transition-all"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>

              {/* Messages Area */}
              <div className="h-80 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-emerald-500 text-white rounded-br-sm'
                          : 'bg-white text-gray-700 rounded-bl-sm shadow-sm border border-gray-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isSubmitting && (
                  <div className="flex justify-start">
                    <div className="bg-white px-4 py-2.5 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              {step !== 'done' ? (
                <div className="border-t border-gray-100 p-4 bg-white">
                  <div className="flex gap-2">
                    {step === 'message' ? (
                      <textarea
                        ref={inputRef as any}
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleNext();
                          }
                        }}
                        placeholder="Type your message..."
                        rows={2}
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm"
                      />
                    ) : (
                      <input
                        ref={inputRef}
                        type={step === 'email' ? 'email' : step === 'phone' ? 'tel' : 'text'}
                        value={step === 'name' ? name : step === 'email' ? email : phone}
                        onChange={(e) => {
                          if (step === 'name') setName(e.target.value);
                          else if (step === 'email') setEmail(e.target.value);
                          else if (step === 'phone') setPhone(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={
                          step === 'name' ? 'Your name...' :
                          step === 'email' ? 'your@email.com' :
                          'Phone number (optional)'
                        }
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      />
                    )}
                    
                    {step === 'phone' && (
                      <button
                        onClick={() => {
                          addMessage('Skipped', 'user');
                          addMessage("Perfect! Now, what would you like to tell us? 💬", 'bot');
                          setStep('message');
                        }}
                        className="px-4 py-3 text-gray-500 hover:text-gray-700 text-sm font-medium"
                      >
                        Skip
                      </button>
                    )}

                    <button
                      onClick={handleNext}
                      disabled={isSubmitting}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-2xl transition-all disabled:opacity-50"
                      aria-label="Send"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Press Enter to send
                  </p>
                </div>
              ) : (
                <div className="border-t border-gray-100 p-4 bg-white text-center">
                  <button
                    onClick={resetForm}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                  >
                    Send another message
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}