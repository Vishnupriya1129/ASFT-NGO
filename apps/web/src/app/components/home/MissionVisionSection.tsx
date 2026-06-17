export function MissionVisionSection() {
  return (
    <section id="mission-vision" className="py-20 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          <span className="section-tag">Our Purpose</span>
          <h2 className="section-heading mb-4 sm:mb-6">Mission & Vision</h2>
          <p className="section-subheading">
            Guiding our commitment to empower youth and serve communities with purpose and integrity.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="card p-8 sm:p-10 lg:p-12 bg-primary-50 border-l-4 border-primary-600">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              To provide platforms for youth to engage in diverse civic activities that nurture character, values, skills, and social responsibility.
            </p>
          </div>
          <div className="card p-8 sm:p-10 lg:p-12 bg-accent-50 border-l-4 border-accent-500">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              A generation of young people empowered to serve their communities with leadership, confidence, and a deep sense of social responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
