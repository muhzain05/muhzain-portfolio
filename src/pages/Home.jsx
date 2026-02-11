import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects } from '@/data/projects';

export function Home() {
  return (
    <PageTransition>
      <Navbar />

      <main>
        {/* Hero */}
        <section
          className="min-h-[85vh] flex flex-col items-center justify-center text-center px-8"
          style={{ paddingTop: '6rem' }}
        >
          <SectionReveal>
            <h1
              className="max-w-3xl mx-auto"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Hello! I'm Zain,
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p
              className="text-2xl md:text-3xl mt-4 max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-muted)',
                fontWeight: 400,
                lineHeight: 1.3,
              }}
            >
              I build the brains behind applications that think for themselves.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <div className="flex items-center gap-6 mt-10">
              <a
                href="mailto:mzainasad05@gmail.com"
                className="px-6 py-3 rounded-full text-sm font-medium text-white transition-colors duration-300"
                style={{ backgroundColor: 'var(--color-fg)' }}
              >
                Let's chat
              </a>
              <div className="text-sm text-left">
                <p className="font-medium" style={{ color: 'var(--color-fg)' }}>
                  Currently @ UAlberta
                </p>
                <p style={{ color: 'var(--color-muted)', fontSize: '0.8125rem' }}>
                  ML Intern · CDAM
                </p>
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* Projects Grid */}
        <section
          id="projects"
          className="px-8"
          style={{ paddingTop: 'var(--section-padding)', paddingBottom: 'var(--section-padding)' }}
        >
          <div className="mx-auto max-w-[var(--container-max)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
              {projects.map((project, index) => (
                <SectionReveal key={project.id} delay={index * 0.1}>
                  <ProjectCard project={project} index={index} />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
