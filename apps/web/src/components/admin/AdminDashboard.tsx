'use client';

import Link from 'next/link';
// import { signOut } from 'next-auth/react';
import {
  Users, Heart, Leaf, LogOut, Download,
  PlusCircle, TrendingUp, Home, FileText, Calendar
} from 'lucide-react';

interface Stats {
  totalDonations: number;
  totalRaised: number;
  activeCampaigns: number;
  totalVolunteers: number;
}

interface Props {
  stats: Stats;
  recentDonations: any[];
  campaigns: any[];
  session: any;
}

function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <div className="card p-7 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${color}`}>
        <Icon size={24} />
      </div>
      <div>
        <div className="font-serif text-3xl font-bold text-soil-dark">{value}</div>
        <div className="text-stone text-sm font-medium">{label}</div>
        {sub && <div className="text-forest-mid text-xs mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

export function AdminDashboard({ stats, recentDonations, campaigns, session }: Props) {
  const exportCSV = () => {
    window.open('/api/admin/donations?format=csv', '_blank');
  };

  return (
    <div className="min-h-screen bg-earth-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-soil-dark text-white flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-mid to-forest-light rounded-full flex items-center justify-center">
              <Leaf size={20} />
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-gradient-gold">Aram Saeivom Family Trust</div>
              <div className="text-white/50 text-xs">{session.user.role}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
          {[
            { icon: Home, label: 'Dashboard', href: '/admin' },
            { icon: Heart, label: 'Donations', href: '/admin/donations' },
            { icon: Leaf, label: 'Campaigns', href: '/admin/campaigns' },
            { icon: Calendar, label: 'Events', href: '/admin/events' },
            { icon: Users, label: 'Volunteers', href: '/admin/volunteers' },
            { icon: FileText, label: 'Audit Logs', href: '/admin/audit' },
          ].map(({ icon: Icon, label, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-white/70 text-xs mb-3 px-4">{session.user.name}</div>
          <button
            onClick={() => console.log('Logout clicked')}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm font-medium w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto" id="main-content">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-4xl text-soil-dark">Dashboard</h1>
            <p className="text-stone text-sm mt-1">Welcome back, {session.user.name}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={exportCSV} className="btn-secondary py-2.5 px-5 text-sm gap-2">
              <Download size={16} />
              Export Donors CSV
            </button>
            <Link href="/admin/campaigns/new" className="btn-primary py-2.5 px-5 text-sm gap-2">
              <PlusCircle size={16} />
              New Campaign
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <StatCard
            icon={TrendingUp}
            label="Total Raised"
            value={`₹${stats.totalRaised.toLocaleString('en-IN')}`}
            color="bg-gradient-to-br from-forest-mid to-forest-light"
          />
          <StatCard
            icon={Heart}
            label="Total Donations"
            value={stats.totalDonations.toString()}
            color="bg-gradient-to-br from-red-400 to-red-500"
          />
          <StatCard
            icon={Leaf}
            label="Active Campaigns"
            value={stats.activeCampaigns.toString()}
            color="bg-gradient-to-br from-sun-gold to-sun-warm"
          />
          <StatCard
            icon={Users}
            label="Volunteers"
            value={stats.totalVolunteers.toString()}
            color="bg-gradient-to-br from-soil-mid to-soil-dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Donations */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-2xl text-soil-dark">Recent Donations</h2>
              <Link href="/admin/donations" className="text-forest-mid text-sm font-semibold hover:underline">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentDonations.length === 0 ? (
                <p className="text-stone text-sm text-center py-8">No donations yet</p>
              ) : (
                recentDonations.map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-3 border-b border-earth-cream last:border-0">
                    <div>
                      <div className="font-semibold text-charcoal text-sm">{d.donorName}</div>
                      <div className="text-stone text-xs">{d.donorEmail}</div>
                      {d.campaign && <div className="text-forest-mid text-xs mt-0.5">{d.campaign.title}</div>}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-forest-mid">
                        ₹{d.amount.toLocaleString('en-IN')}
                      </div>
                      <div className="text-stone text-xs">
                        {new Date(d.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Campaigns */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-serif text-2xl text-soil-dark">Campaigns</h2>
              <Link href="/admin/campaigns" className="text-forest-mid text-sm font-semibold hover:underline">
                Manage all
              </Link>
            </div>
            <div className="space-y-4">
              {campaigns.map((c) => {
                const pct = Math.min((c.raisedAmount / c.goalAmount) * 100, 100);
                return (
                  <div key={c.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-charcoal text-sm line-clamp-1 flex-1 mr-3">{c.title}</span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${c.status === 'PUBLISHED' ? 'badge-status-published' :
                          c.status === 'DRAFT' ? 'badge-status-draft' : 'badge-status-archived'
                        }`}>{c.status}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-stone">
                      <span>₹{c.raisedAmount.toLocaleString('en-IN')}</span>
                      <span>{Math.round(pct)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
