'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', {
      email, password, redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError('Invalid email or password. Please try again.');
    } else {
      router.push('/admin');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-forest-dark to-soil-mid flex items-center justify-center p-4" id="main-content">
      <div className="bg-white rounded-4xl p-12 w-full max-w-md shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-forest-mid to-forest-light rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-forest">
            <Leaf size={28} />
          </div>
          <h1 className="font-serif text-3xl text-soil-dark font-bold">Aram Saeivom Family Trust</h1>
          {error && (
            <div className="flex items-center gap-3 bg-red-50 text-red-700 border border-red-200 rounded-xl p-4 text-sm" role="alert">
              <AlertCircle size={18} className="flex-shrink-0" />
              {error}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@arramseivom.org"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input pr-12"
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal"
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-stone text-xs mt-8">
          <a href="/" className="hover:text-forest-mid transition-colors">
            ← Back to Aram Saeivom Family Trust
          </a>
        </p>
      </div>
    </main>
  );
}