import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CTAFooter } from "@/components/layout/CTAFooter";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, otherProjects } from "@/data/projects";

export function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main id="main-content">
        <section className="portfolio-hero page-width">
          <SectionReveal>
            <h1>Hello! I’m Zain,</h1>
            <p className="hero-subline">
              I build machine-learning systems for science and software.
            </p>
            <div className="hero-bottom">
              <a className="hero-cta" href="#projects">
                View my work <span aria-hidden="true">↓</span>
              </a>
              <div className="hero-status">
                <p>Currently @ UAlberta</p>
                <p>ML Research · Molecular Simulation</p>
              </div>
            </div>
          </SectionReveal>
        </section>
        <section id="projects" className="work-section page-width">
          <div className="section-heading">
            <h2>Selected Work</h2>
          </div>
          <div className="featured-list">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <SectionReveal key={project.id}>
                  <ProjectCard project={project} index={index} featured />
                </SectionReveal>
              ))}
          </div>
          <div className="selected-grid">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <SectionReveal key={project.id}>
                  <ProjectCard project={project} index={index + 3} />
                </SectionReveal>
              ))}
          </div>
        </section>
        <section className="other-work page-width">
          <p className="eyebrow">Earlier explorations</p>
          {otherProjects.map((project) => (
            <Link key={project.title} to={project.blogUrl}>
              <h3>{project.title}</h3>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </section>
      </main>
      <CTAFooter />
    </PageTransition>
  );
}
