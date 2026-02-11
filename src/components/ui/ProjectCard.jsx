import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ProjectCard({ project, index }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLarge = index % 3 === 0;

  const imageMotion = prefersReducedMotion
    ? {}
    : {
        whileHover: { scale: 1.03 },
        transition: { type: 'spring', damping: 20, stiffness: 200 },
      };

  const content = (
    <>
      <div className="overflow-hidden rounded-lg mb-5" style={{ aspectRatio: isLarge ? '16/10' : '4/3' }}>
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          {...imageMotion}
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-xl md:text-2xl mb-1"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-md">
            {project.description}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-[var(--color-muted)] tracking-wider uppercase">
            {project.tags.slice(0, 2).join(' \u00B7 ')}
          </p>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            {project.year}
          </p>
        </div>
      </div>
    </>
  );

  if (project.blogUrl) {
    return (
      <Link to={project.blogUrl} className="block group">
        {content}
      </Link>
    );
  }

  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      {content}
    </a>
  );
}
