import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { experiences, education } from '@/data/experience';
export function About() {
  return (
    <PageTransition>
      <Navbar />

      <main
        className="px-8"
        style={{ paddingTop: '8rem', paddingBottom: 'var(--section-padding)' }}
      >
        <div className="mx-auto max-w-[var(--container-narrow)]">
          {/* Portrait area — ready for future hand-drawn overlays */}
          <SectionReveal>
            <div
              className="relative w-full max-w-md mx-auto mb-16 rounded-2xl overflow-hidden"
              style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-hover)' }}
            >
              {/* Placeholder — replace with actual portrait */}
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-muted)] text-sm">
                Portrait
              </div>
              {/* Future: SVG overlay layer goes here */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 5 }}
                aria-hidden="true"
              >
                {/* Hand-drawn overlay SVGs will be placed here */}
              </div>
            </div>
          </SectionReveal>

          {/* Bio */}
          <SectionReveal delay={0.1}>
            <h1
              className="text-3xl md:text-4xl mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Muhammad Zain Asad is a developer,
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              machine learning engineer, and software builder focused on creating
              intelligent systems that solve real-world problems. Currently at the
              University of Alberta, building graph neural networks for advanced
              ceramics research at the Centre for Defence: Advanced Materials.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
              He has built AI-driven recommendation engines, designed mood-tracking
              applications, implemented ray tracers from scratch in C, and
              co-founded an NFT design business. His work spans machine learning,
              full-stack development, and computational science.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.25}>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              When not coding, you can find him exploring new research papers,
              tinkering with side projects, or thinking about how to make
              technology more accessible and impactful.
            </p>
          </SectionReveal>

          {/* ── Experience ─────────────────────────────────────────────── */}
          <SectionReveal delay={0.3}>
            <div style={{ marginTop: '5rem', marginBottom: '4rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--color-fg)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.0625rem',
                          color: 'var(--color-fg)',
                          fontWeight: 400,
                        }}
                      >
                        {exp.role} — {exp.company}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-muted)',
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {exp.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* ── Education ───────────────────────────────────────────────── */}
          <SectionReveal delay={0.35}>
            <div style={{ marginBottom: '4rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--color-fg)',
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  borderBottom: '1px solid var(--color-border)',
                  paddingBottom: '1rem',
                  marginBottom: '2.5rem',
                }}
              >
                Education
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {education.map((edu, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        gap: '1rem',
                        flexWrap: 'wrap',
                        marginBottom: '0.25rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.0625rem',
                          color: 'var(--color-fg)',
                          fontWeight: 400,
                        }}
                      >
                        {edu.degree}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.8125rem',
                          color: 'var(--color-muted)',
                          letterSpacing: '0.04em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {edu.period}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.9375rem',
                        color: 'var(--color-muted)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9375rem',
                          color: 'var(--color-muted)',
                          lineHeight: 1.6,
                          margin: '0.25rem 0 0 0',
                          opacity: 0.75,
                        }}
                      >
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
