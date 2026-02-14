import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { blogPosts } from '@/data/blogPosts';

export function Blog() {
  return (
    <PageTransition>
      <Navbar />

      <main
        className="px-8"
        style={{ paddingTop: '8rem', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="mx-auto max-w-[var(--container-narrow)]">
          <SectionReveal>
            <h1
              className="text-3xl md:text-4xl mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Blog
            </h1>
            <p className="text-[var(--color-muted)] mb-12">
              Deep dives into the technical decisions and lessons from each project.
            </p>
          </SectionReveal>

          <div className="space-y-0 border-t border-[var(--color-border)]">
            {blogPosts.map((post, index) => (
              <SectionReveal key={post.id} delay={index * 0.05}>
                <Link
                  to={`/blog/${post.id}`}
                  className="block py-8 border-b border-[var(--color-border)] group"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="max-w-lg">
                      <h2
                        className="text-xl md:text-2xl group-hover:text-[var(--color-accent)] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-sm text-[var(--color-muted)] mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-sm shrink-0" style={{ color: 'var(--color-muted)' }}>
                      <p>{post.publishedAt}</p>
                      <p>{post.readTime}</p>
                    </div>
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
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
