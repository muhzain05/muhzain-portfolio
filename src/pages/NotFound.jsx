import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { PageTransition } from '@/components/layout/PageTransition';

export function NotFound() {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h1
            className="text-6xl md:text-8xl mb-4"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-border)' }}
          >
            404
          </h1>
          <p className="text-lg text-[var(--color-muted)] mb-8">
            This page doesn't exist.
          </p>
          <Link
            to="/"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            Go home
          </Link>
        </div>
      </main>
    </PageTransition>
  );
}
