import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { blogPosts } from '@/data/blogPosts';

export function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts.find((entry) => entry.id === postId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [postId]);

  if (!post) {
    return (
      <PageTransition>
        <Navbar />
        <main className="px-8 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Post not found.
            </h1>
            <Link
              to="/blog"
              className="text-sm text-[var(--color-accent)] hover:underline"
            >
              Back to blog
            </Link>
          </div>
        </main>
        <CTAFooter />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />

      <main
        className="px-8"
        style={{ paddingTop: '8rem', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="mx-auto max-w-[var(--container-narrow)]">
          <SectionReveal>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors mb-10"
            >
              <ArrowLeft size={16} />
              All posts
            </Link>
          </SectionReveal>

          <SectionReveal delay={0.05}>
            <header className="mb-12">
              <h1
                className="text-3xl md:text-4xl mb-4"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {post.title}
              </h1>
              <p className="text-lg text-[var(--color-muted)] leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--color-muted)]">
                <span>{post.publishedAt}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={`${post.id}-${tag}`}
                    className="text-xs tracking-wider uppercase"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
          </SectionReveal>

          {/* Article body */}
          <div className="space-y-12">
            {post.sections.map((section, i) => (
              <SectionReveal key={`${post.id}-${section.heading}`} delay={0.1 + i * 0.05}>
                <section>
                  <h2
                    className="text-xl md:text-2xl mb-4"
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph, j) => (
                    <p
                      key={`${post.id}-${section.heading}-${j}`}
                      className="text-[var(--color-muted)] leading-relaxed mb-4"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              </SectionReveal>
            ))}
          </div>

          {/* Takeaways */}
          <SectionReveal delay={0.2}>
            <div
              className="mt-16 pt-8 border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h3
                className="text-xs font-medium tracking-[0.15em] uppercase mb-6"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
              >
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {post.takeaways.map((takeaway, i) => (
                  <li
                    key={`${post.id}-takeaway-${i}`}
                    className="text-[var(--color-muted)] leading-relaxed pl-4"
                    style={{ borderLeft: '2px solid var(--color-accent)' }}
                  >
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Back link */}
          <SectionReveal delay={0.25}>
            <div className="mt-16 text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
              >
                <ArrowLeft size={16} />
                Back to all posts
              </Link>
            </div>
          </SectionReveal>
        </div>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
