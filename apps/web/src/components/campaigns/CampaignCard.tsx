import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Target, Calendar } from 'lucide-react';

interface Campaign {
  id: string; title: string; slug: string; summary: string;
  goalAmount: number; raisedAmount: number; featuredImage: string | null;
  startDate: Date | null; endDate: Date | null; tags: string[];
  status: string;
}

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min((raised / goal) * 100, 100);
  return (
    <div className="space-y-1.5">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${Math.round(pct)}% of goal reached`}
        />
      </div>
      <div className="flex justify-between text-xs font-medium">
        <span className="text-forest-mid">₹{raised.toLocaleString('en-IN')} raised</span>
        <span className="text-stone">{Math.round(pct)}% of ₹{goal.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const endDate = campaign.endDate
    ? new Date(campaign.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <article className="card overflow-hidden flex flex-col h-full" aria-label={`Campaign: ${campaign.title}`}>
      {/* Image */}
      <div className="relative h-52 w-full bg-gradient-to-br from-sky-pale to-cloud overflow-hidden">
        {campaign.featuredImage ? (
          <Image
            src={campaign.featuredImage}
            alt={campaign.title}
            width={800}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-leaf-pale to-sky-pale flex items-center justify-center">
            <Target size={40} className="text-forest-mid/30" />
          </div>
        )}
        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {campaign.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="bg-white/90 text-forest-dark text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h2 className="font-serif text-2xl text-soil-dark mb-2 leading-tight">
          {campaign.title}
        </h2>
        <p className="text-stone text-sm leading-relaxed mb-5 flex-1">
          {campaign.summary}
        </p>

        <ProgressBar raised={campaign.raisedAmount} goal={campaign.goalAmount} />

        <div className="flex items-center justify-between mt-5">
          {endDate && (
            <span className="flex items-center gap-1.5 text-stone text-xs">
              <Calendar size={13} />
              Ends {endDate}
            </span>
          )}
          <Link
            href={`/campaigns/${campaign.slug}`}
            className="inline-flex items-center gap-2 text-forest-mid font-semibold text-sm hover:gap-3 transition-all ml-auto"
          >
            Donate <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}