'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Users, Heart, CheckCircle, LogIn } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function VolunteerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signup');
  const [signupForm, setSignupForm] = useState({
    name: '', email: '', phone: '', availability: '', notes: '',
  });
  const [signinForm, setSigninForm] = useState({
    email: '', password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingSignin, setLoadingSignin] = useState(false);

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSigninChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSignup(true);
    try {
      const res = await fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success('🌱 Thank you for signing up!');
      } else {
        toast.error('Submission failed. Please try again.');
      }
    } catch {
      toast.error('Something went wrong.');
    } finally {
      setLoadingSignup(false);
    }
  };

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSignin(true);
    try {
      const result = await signIn('credentials', {
        email: signinForm.email,
        password: signinForm.password,
        redirect: false,
      });
      if (result?.error) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.success('Signed in successfully!');
        router.push('/admin');
      }
    } catch {
      toast.error('Sign in failed. Please try again.');
    } finally {
      setLoadingSignin(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-24" id="main-content">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <span className="section-tag"><Users size={14} /> Volunteer</span>
            <h1 className="font-serif text-5xl text-soil-dark mb-4">Join Our Movement</h1>
            <p className="text-stone text-lg">
              Be the change you want to see. Volunteer with Arram Seivom Family Trust and help us plant seeds of hope.
            </p>
          </div>

          {submitted ? (
            <div className="card p-12 text-center">
              <CheckCircle size={64} className="text-forest-mid mx-auto mb-6" />
              <h2 className="font-serif text-3xl text-soil-dark mb-3">You're on board!</h2>
              <p className="text-stone">
                Thank you for signing up as a volunteer. Our team will contact you within 48 hours.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Signup Tab */}
              <div className={`card p-10 transition-all ${activeTab === 'signup' ? 'ring-2 ring-forest-mid' : 'opacity-70 lg:opacity-100'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-forest-mid rounded-lg flex items-center justify-center text-white">
                    <Heart size={20} />
                  </div>
                  <h2 className="font-serif text-2xl text-soil-dark">Volunteer Sign Up</h2>
                </div>
                <form onSubmit={handleSignupSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="name" className="form-label">Full Name *</label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      required 
                      value={signupForm.name} 
                      onChange={handleSignupChange} 
                      className="form-input" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      value={signupForm.email} 
                      onChange={handleSignupChange} 
                      className="form-input" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input 
                      id="phone" 
                      name="phone" 
                      type="tel" 
                      required 
                      value={signupForm.phone} 
                      onChange={handleSignupChange} 
                      className="form-input" 
                      placeholder="+91 98765 43210" 
                    />
                  </div>
                  <div>
                    <label htmlFor="availability" className="form-label">Availability *</label>
                    <select 
                      id="availability" 
                      name="availability" 
                      required 
                      value={signupForm.availability} 
                      onChange={handleSignupChange} 
                      className="form-input"
                    >
                      <option value="">Select availability</option>
                      <option value="weekends">Weekends only</option>
                      <option value="weekdays">Weekdays only</option>
                      <option value="flexible">Flexible / Both</option>
                      <option value="events">Events only</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="notes" className="form-label">Why do you want to volunteer?</label>
                    <textarea 
                      id="notes" 
                      name="notes" 
                      value={signupForm.notes} 
                      onChange={handleSignupChange} 
                      className="form-input h-24 resize-none" 
                      placeholder="Tell us a little about yourself and why you want to join..." 
                    />
                  </div>
                  <button type="submit" disabled={loadingSignup} className="btn-primary w-full justify-center py-4">
                    <Heart size={18} />
                    {loadingSignup ? 'Submitting...' : 'Sign Up as Volunteer'}
                  </button>
                </form>
              </div>

              {/* Sign In Tab */}
              <div className={`card p-10 transition-all ${activeTab === 'signin' ? 'ring-2 ring-forest-mid' : 'opacity-70 lg:opacity-100'}`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-forest-mid rounded-lg flex items-center justify-center text-white">
                    <LogIn size={20} />
                  </div>
                  <h2 className="font-serif text-2xl text-soil-dark">Volunteer Sign In</h2>
                </div>
                <form onSubmit={handleSigninSubmit} className="space-y-6" noValidate>
                  <p className="text-stone text-sm">
                    Are you a registered volunteer or staff member? Sign in to access your dashboard and manage your profile.
                  </p>
                  <div>
                    <label htmlFor="signin-email" className="form-label">Email *</label>
                    <input 
                      id="signin-email" 
                      name="email" 
                      type="email" 
                      required 
                      value={signinForm.email} 
                      onChange={handleSigninChange} 
                      className="form-input" 
                      placeholder="your@email.com" 
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="form-label">Password *</label>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      value={signinForm.password} 
                      onChange={handleSigninChange} 
                      className="form-input" 
                      placeholder="Your password" 
                    />
                  </div>
                  <button type="submit" disabled={loadingSignin} className="btn-primary w-full justify-center py-4">
                    <LogIn size={18} />
                    {loadingSignin ? 'Signing in...' : 'Sign In'}
                  </button>
                </form>
                <p className="text-center text-stone text-xs mt-6">
                  Forgot your password? Contact us at <a href="mailto:volunteers@arramseivom.org" className="text-forest-mid hover:underline">volunteers@arramseivom.org</a>
                </p>
              </div>
            </div>
          )}

          {/* Tab Switcher - Only visible on mobile */}
          {!submitted && (
            <div className="flex gap-3 mt-8 lg:hidden justify-center">
              <button
                onClick={() => setActiveTab('signup')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'signup'
                    ? 'bg-forest-mid text-white'
                    : 'bg-white text-forest-mid border-2 border-forest-mid'
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setActiveTab('signin')}
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === 'signin'
                    ? 'bg-forest-mid text-white'
                    : 'bg-white text-forest-mid border-2 border-forest-mid'
                }`}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}