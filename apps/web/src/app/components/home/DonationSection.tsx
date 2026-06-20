'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sprout, QrCode, Building2, Copy, Check, Utensils, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

const donationAmounts = [
  { amount: 500,  label: 'Feeds 5 children for a week',         impact: '35 nutritious meals',        icon: Utensils },
  { amount: 1000, label: "Supports a child's education for a month", impact: 'Books + supplies + meals', icon: GraduationCap },
  { amount: 5000, label: "Sponsors an elderly resident's care",  impact: 'Full month of care & meals', icon: Heart },
];

export function DonationSection() {
  const [activeTab, setActiveTab]   = useState<'qr' | 'bank'>('qr');
  const [selectedAmt, setSelectedAmt] = useState(500);
  const [customAmt, setCustomAmt]   = useState('');
  const [donorName, setDonorName]   = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [copied, setCopied]         = useState<string | null>(null);
  const [qrScriptReady, setQrScriptReady] = useState(false);
  const [settings, setSettings]     = useState<any>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  // 1. Load QR library once
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ((window as any).QRCode) {
      setQrScriptReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
    script.async = true;
    script.onload = () => setQrScriptReady(true);
    document.head.appendChild(script);

    return () => {
      try {
        document.head.removeChild(script);
      } catch {}
    };
  }, []);

  // 2. Fetch donation settings from Supabase (with null guard)
  useEffect(() => {
    async function loadSettings() {
      if (!supabase) {
        console.error('Supabase is not configured');
        return;
      }

      const { data, error } = await supabase
        .from('donation_settings')
        .select('*')
        .limit(1)
        .single();

      if (error) {
        console.error('Donation settings error:', error);
        return;
      }

      setSettings(data);
    }

    loadSettings();
  }, []);

  // 3. Generate QR code whenever settings, tab, or library is ready
  useEffect(() => {
    if (!qrScriptReady || activeTab !== 'qr' || !qrRef.current || !settings) return;

    qrRef.current.innerHTML = '';

    const staticAmount = 500;
    const upiUrl = `upi://pay?pa=${settings.upi_id}&pn=${encodeURIComponent(
      settings.account_name
    )}&am=${staticAmount}&cu=INR`;

    try {
      new (window as any).QRCode(qrRef.current, {
        text: upiUrl,
        width: 200,
        height: 200,
        colorDark: '#1B5E20',
        colorLight: '#ffffff',
        correctLevel: 1,
      });
    } catch (error) {
      console.error('QR generation failed', error);
    }
  }, [qrScriptReady, activeTab, settings]);

  // Helper: copy to clipboard
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      toast.success(`Copied: ${text}`);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleDonationSupport = () => {
    const amount = customAmt ? parseInt(customAmt, 10) : selectedAmt;
    const finalAmount = isNaN(amount) ? selectedAmt : amount;
    toast.success(
      `🙏 Thank you for considering ₹${finalAmount.toLocaleString()}! Please scan the QR code or use bank transfer details above to complete your donation.`
    );
  };

  // 4. Build bank details from settings
  const bankDetails = settings
    ? [
        { label: 'Account Name', value: settings.account_name, copyKey: null },
        { label: 'Account Number', value: settings.account_number, copyKey: 'accno' },
        { label: 'IFSC Code', value: settings.ifsc_code, copyKey: 'ifsc' },
        { label: 'Bank Name', value: settings.bank_name, copyKey: null },
      ]
    : [];

  return (
    <section
      id="donate"
      className="py-24 bg-donate-gradient relative overflow-hidden"
      aria-label="Donation section"
    >
      {/* Background glow */}
      <div className="absolute top-[-30%] right-[-20%] w-[700px] h-[700px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/10 text-sun-warm px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
          <Heart size={14} /> Support Our Mission
        </span>
        <h2 className="font-serif text-5xl text-sun-pale mb-5">
          Every Donation Plants a Seed of Hope
        </h2>
        <p className="text-white/80 text-lg mb-14 max-w-xl mx-auto">
          Your contribution directly funds meals, education, and care for those who need it most.
        </p>

        {/* Donation Amount Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {donationAmounts.map(({ amount, label, impact, icon: Icon }) => (
            <button
              key={amount}
              onClick={() => { setSelectedAmt(amount); setCustomAmt(''); }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 text-left group ${
                selectedAmt === amount && !customAmt
                  ? 'bg-white/20 border-white/50 -translate-y-2'
                  : 'bg-white/10 border-white/20 hover:bg-white/15 hover:-translate-y-1'
              }`}
              aria-pressed={selectedAmt === amount && !customAmt}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-3xl bg-gradient-to-r from-sun-gold to-sun-warm transition-opacity ${
                selectedAmt === amount && !customAmt ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
              }`} />

              <div className="font-serif text-4xl font-bold text-sun-warm mb-2">
                ₹{amount.toLocaleString()}
              </div>
              <p className="text-white/80 text-sm mb-4">{label}</p>
              <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-xl">
                <Icon size={13} />
                {impact}
              </div>
            </button>
          ))}
        </div>

        {/* Custom Amount + Donor Info */}
        <div className="max-w-2xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Custom amount ₹"
            value={customAmt}
            onChange={(e) => setCustomAmt(e.target.value)}
            className="form-input bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-sun-warm rounded-xl px-4 py-3 outline-none"
            aria-label="Custom donation amount"
          />
          <input
            type="text"
            placeholder="Your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className="form-input bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-sun-warm rounded-xl px-4 py-3 outline-none"
            aria-label="Donor name"
          />
          <input
            type="email"
            placeholder="Your email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            className="form-input bg-white/10 border-white/20 text-white placeholder-white/50 focus:ring-sun-warm rounded-xl px-4 py-3 outline-none"
            aria-label="Donor email"
          />
        </div>

        <button onClick={handleDonationSupport} className="btn-gold mb-16 inline-flex items-center gap-2 bg-gradient-to-r from-sun-gold to-sun-warm text-soil-dark font-bold py-4 px-8 rounded-full shadow-lg transition-all hover:scale-105">
          <Sprout size={22} />
          Donate via UPI / Bank Transfer
        </button>

        {/* Tabs */}
        <div className="bg-white/8 backdrop-blur-xl rounded-4xl p-10 border border-white/15 max-w-3xl mx-auto">
          <div className="flex justify-center gap-5 mb-10">
            {[
              { key: 'qr', Icon: QrCode, label: 'Scan & Pay' },
              { key: 'bank', Icon: Building2, label: 'Bank Transfer' },
            ].map(({ key, Icon, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as 'qr' | 'bank')}
                className={`flex items-center gap-2 px-9 py-3.5 rounded-full font-semibold text-base transition-all duration-300 ${
                  activeTab === key
                    ? 'bg-sun-warm text-soil-dark shadow-gold'
                    : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* QR Panel */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'qr' ? (
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="bg-white p-8 rounded-2xl shadow-2xl flex-shrink-0">
                  <div ref={qrRef} className="flex justify-center" />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-serif text-2xl text-white mb-3">Pay via UPI</h3>
                  <p className="text-white/75 text-sm mb-5">
                    Scan with PhonePe, GPay, Paytm, or any UPI app
                  </p>
                  <button
                    onClick={() => handleCopy(settings?.upi_id || '', 'upi')}
                    className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 text-white font-mono text-lg font-bold px-6 py-3 rounded-2xl border border-dashed border-white/30 transition-all"
                    aria-label="Copy UPI ID"
                  >
                    {settings?.upi_id || 'Loading...'}
                    {copied === 'upi' ? <Check size={18} className="text-sun-warm" /> : <Copy size={18} />}
                  </button>
                  <p className="text-white/50 text-xs mt-3">
                    Or manually enter the UPI ID in your payment app
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-xl mb-5">
                  <h3 className="font-serif text-xl text-forest-dark flex items-center gap-3 mb-6">
                    <Building2 size={20} className="text-forest-mid" />
                    Bank Account Details
                  </h3>
                  {bankDetails.length > 0 ? (
                    bankDetails.map(({ label, value, copyKey }) => (
                      <div key={label} className="flex justify-between items-center py-3.5 border-b border-earth-cream last:border-0">
                        <span className="text-stone text-sm font-medium">{label}</span>
                        <span className="text-charcoal font-mono font-semibold flex items-center gap-2">
                          {value}
                          {copyKey && (
                            <button
                              onClick={() => handleCopy(value, copyKey)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                copied === copyKey
                                  ? 'bg-forest-mid text-white'
                                  : 'bg-leaf-pale text-forest-dark hover:bg-forest-mid hover:text-white'
                              }`}
                              aria-label={`Copy ${label}`}
                            >
                              {copied === copyKey ? <Check size={13} /> : <Copy size={13} />}
                            </button>
                          )}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone text-center">Loading bank details...</p>
                  )}
                </div>
                <div className="bg-white/10 rounded-2xl p-5 text-white/80 text-sm">
                  After transferring, email{' '}
                  <strong className="text-sun-warm">
                    {settings?.email || 'donations@seedandserve.org'}
                  </strong>{' '}
                  with your name and transaction ID for your receipt.
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}