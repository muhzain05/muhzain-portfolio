import { Navbar } from '@/components/Navbar';
import { CTAFooter } from '@/components/layout/CTAFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { experiences, education } from '@/data/experience';

export function Resume() {
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
              Resume
            </h1>
            <p className="text-[var(--color-muted)] mb-12">
              My experiences and projects.
            </p>
          </SectionReveal>

          {/* Experience section */}
          <SectionReveal delay={0.1}>
            <div className="border-t border-[var(--color-border)]">
              {experiences.map((exp) => (
                <AccordionItem
                  key={exp.id}
                  title={exp.company}
                  subtitle={exp.role}
                  period={exp.period}
                >
                  <p>{exp.description}</p>
                  {exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full border"
                          style={{
                            borderColor: 'var(--color-border)',
                            color: 'var(--color-muted)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </AccordionItem>
              ))}
            </div>
          </SectionReveal>

          {/* Education section */}
          <SectionReveal delay={0.15}>
            <h2
              className="text-xs font-medium tracking-[0.15em] uppercase mt-16 mb-8"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
            >
              Education
            </h2>
            <div className="border-t border-[var(--color-border)]">
              {education.map((edu, i) => (
                <AccordionItem
                  key={i}
                  title={edu.institution}
                  subtitle={edu.degree}
                  period={edu.period}
                >
                  <p>{edu.details}</p>
                </AccordionItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </main>

      <CTAFooter />
    </PageTransition>
  );
}
