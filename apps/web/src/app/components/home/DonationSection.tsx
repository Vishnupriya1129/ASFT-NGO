'use client';

import { useState, useEffect } from 'react';
import Image from '@/components/ui/SafeImage';
import { motion } from 'framer-motion';
import { Heart, QrCode, Building2, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@/lib/supabase/client';

export function DonationSection() {
  const supabase = createClient();  
  const [activeTab, setActiveTab] = useState<'qr' | 'bank'>('qr');
  const [copied, setCopied] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!supabase) return;
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

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      toast.success(`Copied: ${text}`);
      setTimeout(() => setCopied(null), 2000);
    });
  };

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
      <div className="absolute top-[-30%] right-[-20%] w-[700px] h-[700px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-widest mb-6">
          <Heart size={14} /> Support Our Mission
        </span>
        <h2 className="font-serif text-5xl text-white mb-5">
          Every Donation Plants a Seed of Hope
        </h2>
        <p className="text-white/80 text-lg mb-14 max-w-xl mx-auto">
          Your contribution directly funds meals, education, and care for those who need it most.
        </p>

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
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'qr' ? (
              <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="bg-white p-4 rounded-2xl shadow-2xl flex-shrink-0">
                  <Image
                    src="https://vixzstrzqhwswhibzfdq.supabase.co/storage/v1/object/public/content-images/QR/qr.png"
                    alt="UPI QR Code"
                    width={220}
                    height={220}
                    className="rounded-lg"
                    priority
                  />
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="font-serif text-2xl text-white mb-3">Pay via UPI</h3>
                  <p className="text-white/75 text-sm mb-5">
                    Scan with PhonePe, GPay, Paytm, or any UPI app
                  </p>
                  <button
                    onClick={() => handleCopy(settings?.upi_id || '', 'upi')}
                    className="inline-flex items-center gap-3 bg-white/15 hover:bg-white/25 text-white font-mono text-lg font-bold px-6 py-3 rounded-2xl border border-dashed border-white/30 transition-all"
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
