'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Heart } from 'lucide-react';

declare global {
  interface Window { Razorpay: any; }
}

interface Props {
  campaignId: string;
  campaignTitle: string;
  goalAmount: number;
  raisedAmount: number;
}

const presets = [500, 1000, 2000, 5000];

export function DonationWidget({ campaignId, campaignTitle, goalAmount, raisedAmount }: Props) {
  const [amount, setAmount] = useState(1000);
  const [custom, setCustom] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const finalAmount = custom ? parseInt(custom) : amount;
  const pct = Math.min((raisedAmount / goalAmount) * 100, 100);

  const handleDonate = async () => {
    if (!name || !email) { toast.error('Please enter your name and email'); return; }
    if (finalAmount < 1) { toast.error('Please enter a valid amount'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, currency: 'INR', campaignId, donorName: name, donorEmail: email }),
      });
      const { orderId, razorpayKey, amount: orderAmount } = await res.json();

      const rzp = new window.Razorpay({
        key: razorpayKey,
        amount: orderAmount * 100,
        currency: 'INR',
        name: 'Aram Saeivom Family Trust',
        description: campaignTitle,
        order_id: orderId,
        handler: async (resp: any) => {
          const v = await fetch('/api/donations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpayOrderId: resp.razorpay_order_id,
              razorpayPaymentId: resp.razorpay_payment_id,
              razorpaySignature: resp.razorpay_signature,
              donorName: name, donorEmail: email, amount: finalAmount, campaignId,
            }),
          });
          if (v.ok) toast.success('🌱 Thank you! Your donation was successful.');
        },
        prefill: { name, email },
        theme: { color: '#2E7D32' },
      });
      rzp.open();
    } catch { toast.error('Payment failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="card p-8 space-y-6">
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div>
        <div className="flex justify-between mb-2 text-sm font-semibold">
          <span className="text-forest-mid">₹{raisedAmount.toLocaleString('en-IN')} raised</span>
          <span className="text-stone">{Math.round(pct)}% funded</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => { setAmount(p); setCustom(''); }}
            className={`py-3 rounded-2xl font-semibold text-sm transition-all ${amount === p && !custom
                ? 'bg-forest-mid text-white shadow-forest'
                : 'bg-earth-cream text-soil-mid hover:bg-leaf-pale'
              }`}
          >
            ₹{p.toLocaleString('en-IN')}
          </button>
        ))}
      </div>

      <input
        type="number"
        placeholder="Or enter custom amount ₹"
        value={custom}
        onChange={(e) => setCustom(e.target.value)}
        className="form-input"
        aria-label="Custom donation amount"
      />
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
        aria-label="Donor name"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
        aria-label="Donor email"
      />

      <button
        onClick={handleDonate}
        disabled={loading}
        className="btn-primary w-full justify-center py-4 text-base"
      >
        <Heart size={18} />
        {loading ? 'Processing...' : `Donate ₹${finalAmount.toLocaleString('en-IN')}`}
      </button>

      <p className="text-stone text-xs text-center">
        Secure payment via Razorpay · Your data is protected
      </p>
    </div>
  );
}
