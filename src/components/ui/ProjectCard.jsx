import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export function ProjectCard({ project, index = 0, featured = false }) {
  return (
    <article className={`project-card ${featured ? "project-featured" : ""}`}>
      <div
        className={`project-art ${project.id === "ray-tracer" ? "project-render" : ""}`}
      >
        <img
          src={project.image}
          alt={project.imageAlt}
          width="1536"
          height="864"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="project-copy">
        <h3>
          <Link className="project-primary" to={project.blogUrl}>
            {project.title}
          </Link>
        </h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tags">{project.tags.join(" · ")}</p>
        <div className="project-actions">
          <span aria-hidden="true">
            View project <span className="action-arrow">↗</span>
          </span>
        </div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    figure: PropTypes.string,
    figureAlt: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    note: PropTypes.string,
    blogUrl: PropTypes.string.isRequired,
    githubUrl: PropTypes.string,
    githubLabel: PropTypes.string,
    demoUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
  featured: PropTypes.bool,
};
