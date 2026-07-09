'use client';

export function VideoSection() {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="section-tag">Our Story</span>
          <h2 className="section-heading mt-3">Watch Our Journey</h2>
          <div className="divider-emerald mt-4" />
          <p className="text-slate-600 dark:text-slate-300 mt-4 max-w-2xl mx-auto">
            See how Aram Saeivom Family Trust is transforming lives through community service.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/zdj6Fo6GIKo?autoplay=1&mute=1&controls=1&loop=1&playlist=zdj6Fo6GIKo&modestbranding=1&rel=0"
            title="Aram Saeivom Family Trust Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}