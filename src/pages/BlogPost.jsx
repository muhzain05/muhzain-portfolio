import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CTAFooter } from "@/components/layout/CTAFooter";
import { PageTransition } from "@/components/layout/PageTransition";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { blogPosts } from "@/data/blogPosts";
import { projects } from "@/data/projects";

export function BlogPost() {
  const { postId } = useParams();
  const post = blogPosts.find((entry) => entry.id === postId);
  const project = projects.find((entry) => entry.id === post?.projectId);

  if (!post) {
    return (
      <PageTransition>
        <Navbar />
        <main
          id="main-content"
          className="px-8 min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <h1
              className="text-2xl mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
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
        id="main-content"
        className="px-8"
        style={{ paddingTop: "8rem", paddingBottom: "var(--section-padding)" }}
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
                style={{ fontFamily: "var(--font-serif)" }}
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
                    style={{ color: "var(--color-accent)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>
          </SectionReveal>

          {project && (
            <figure className="article-cover">
              <img
                src={project.image}
                alt={project.imageAlt}
                width="1200"
                height="675"
              />
              <figcaption>
                {project.id === "ray-tracer"
                  ? "Actual repository render."
                  : "Editorial illustration generated with Higgsfield; measured figures are identified separately below."}
              </figcaption>
            </figure>
          )}

          {/* Article body */}
          <div className="space-y-12">
            {post.sections.map((section, i) => (
              <SectionReveal
                key={`${post.id}-${section.heading}`}
                delay={0.1 + i * 0.05}
              >
                <section>
                  <h2
                    className="text-xl md:text-2xl mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
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
                  {section.callout && (
                    <aside className="article-callout">{section.callout}</aside>
                  )}
                  {section.figure && (
                    <figure className="article-figure">
                      <a
                        href={section.figure.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open full figure: ${section.figure.alt}`}
                      >
                        <img
                          src={section.figure.src}
                          alt={section.figure.alt}
                          width={section.figure.width}
                          height={section.figure.height}
                          loading="lazy"
                        />
                      </a>
                      <figcaption>
                        {section.figure.caption}{" "}
                        <a
                          href={section.figure.source}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Source ↗
                        </a>
                      </figcaption>
                    </figure>
                  )}
                  {section.table && (
                    <div
                      className="article-table-wrap"
                      tabIndex={0}
                      role="region"
                      aria-label={section.table.caption}
                    >
                      <table className="article-table">
                        <caption>{section.table.caption}</caption>
                        <thead>
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row[0]}>
                              {row.map((cell, index) =>
                                index === 0 ? (
                                  <th key={index} scope="row">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={index}>{cell}</td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              </SectionReveal>
            ))}
          </div>

          {/* Takeaways */}
          <SectionReveal delay={0.2}>
            <div
              className="mt-16 pt-8 border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <h3
                className="text-xs font-medium tracking-[0.15em] uppercase mb-6"
                style={{
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {post.takeaways.map((takeaway, i) => (
                  <li
                    key={`${post.id}-takeaway-${i}`}
                    className="text-[var(--color-muted)] leading-relaxed pl-4"
                    style={{ borderLeft: "2px solid var(--color-accent)" }}
                  >
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {post.sources && (
            <section className="article-sources">
              <h2>Source notes</h2>
              <ul>
                {post.sources.map(([label, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

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
