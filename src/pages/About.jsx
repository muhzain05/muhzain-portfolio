import { Navbar } from "@/components/Navbar";
import { CTAFooter } from "@/components/layout/CTAFooter";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { experiences, education } from "@/data/experience";

export function About() {
  return (
    <PageTransition>
      <Navbar />
      <main id="main-content" className="about-page page-width">
        <SectionReveal>
          <h1>About me</h1>
          <div className="about-intro prose">
            <p>
              I’m Zain, a Computer Science student at the University of Alberta
              working across scientific machine learning and ML systems.
            </p>
            <p>
              Most of my work involves systems where learned models have to
              respect something real—molecular geometry, physical forces,
              inference state, or the constraints of a deployed application.
            </p>
          </div>
        </SectionReveal>
        <section className="experience-section">
          <h2>Experience</h2>
          {experiences.map((exp) => (
            <div className="experience-row" key={exp.id}>
              <p className="experience-period">{exp.period}</p>
              <div>
                <h3>{exp.role}</h3>
                <p className="experience-company">{exp.company}</p>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="education-section">
          <p className="eyebrow">Education</p>
          {education.map((edu) => (
            <div key={edu.institution}>
              <h2>{edu.institution}</h2>
              <p>
                {edu.degree} · {edu.period}
              </p>
              <p>{edu.details}</p>
            </div>
          ))}
        </section>
      </main>
      <CTAFooter />
    </PageTransition>
  );
}
