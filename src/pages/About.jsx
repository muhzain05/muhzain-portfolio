import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
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
        </div>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
