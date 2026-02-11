import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/ui/SectionReveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const skills = [
  'Machine Learning',
  'Software Engineering',
  'AI Research',
  'Full Stack',
  'Data Science',
];

export function CTAFooter() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-dark-bg)',
        color: 'var(--color-dark-fg)',
        padding: 'var(--section-padding) 0 3rem',
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-8">
        <SectionReveal>
          {/* Floating skill tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skills.map((skill, i) => (
              <SkillTag key={skill} label={skill} index={i} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>

          {/* CTA headline */}
          <h2
            className="text-center text-4xl md:text-6xl lg:text-7xl max-w-4xl mx-auto leading-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-dark-fg)',
            }}
          >
            Let's build something{' '}
            <em style={{ color: 'var(--color-dark-accent)' }}>great</em>{' '}
            together.
          </h2>

          {/* Subtext */}
          <p
            className="text-center mt-8 max-w-lg mx-auto"
            style={{ color: 'var(--color-dark-muted)' }}
          >
            Feel free to reach out via{' '}
            <a
              href="mailto:mzainasad05@gmail.com"
              className="underline hover:text-[var(--color-dark-accent)] transition-colors"
            >
              email
            </a>{' '}
            to say hello.
          </p>
        </SectionReveal>

        {/* Footer bottom */}
        <div
          className="mt-20 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderColor: 'rgba(200, 189, 176, 0.2)' }}
        >
          <p
            className="text-2xl tracking-tight"
            style={{
              fontFamily: 'var(--font-serif)',
              color: 'var(--color-dark-fg)',
            }}
          >
            Zain
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{ color: 'var(--color-dark-muted)' }}>
            <div>
              <p className="font-medium mb-2" style={{ color: 'var(--color-dark-fg)' }}>Connect</p>
              <div className="flex flex-col gap-1">
                <a href="mailto:mzainasad05@gmail.com" className="hover:text-[var(--color-dark-accent)] transition-colors">Email</a>
                <a href="https://github.com/muhzain05" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-dark-accent)] transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/muhammadzainasad" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-dark-accent)] transition-colors">LinkedIn</a>
              </div>
            </div>
            <div>
              <p className="font-medium mb-2" style={{ color: 'var(--color-dark-fg)' }}>Pages</p>
              <div className="flex flex-col gap-1">
                <Link to="/about" className="hover:text-[var(--color-dark-accent)] transition-colors">About</Link>
                <Link to="/resume" className="hover:text-[var(--color-dark-accent)] transition-colors">Resume</Link>
                <Link to="/blog" className="hover:text-[var(--color-dark-accent)] transition-colors">Blog</Link>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-8" style={{ color: 'var(--color-dark-muted)' }}>
          &copy; {new Date().getFullYear()} Muhammad Zain Asad. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

function SkillTag({ label, index, prefersReducedMotion }) {
  if (prefersReducedMotion) {
    return (
      <span
        className="px-4 py-2 text-sm rounded-full border"
        style={{
          borderColor: 'rgba(200, 189, 176, 0.3)',
          color: 'var(--color-dark-fg)',
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <motion.span
      className="px-4 py-2 text-sm rounded-full border"
      style={{
        borderColor: 'rgba(200, 189, 176, 0.3)',
        color: 'var(--color-dark-fg)',
      }}
      animate={{
        y: [0, -3, 0],
        rotate: [0, index % 2 === 0 ? 1 : -1, 0],
      }}
      transition={{
        duration: 4 + index * 0.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 0.3,
      }}
    >
      {label}
    </motion.span>
  );
}
