import { Navbar } from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';
import Link from 'next/link';

export default function ProgramNotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-sky-pale to-cloud pt-32 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-6xl font-serif font-bold text-primary-200 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-primary-800 mb-2">Program Not Found</h2>
          <p className="text-gray-500 mb-8">
            The program you're looking for doesn't exist or has been moved.
          </p>
          <Link
            href="/programs"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-700 transition"
          >
            View All Programs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}