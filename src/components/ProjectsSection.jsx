import { ArrowRight, Github, FileText, Link2 } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  SiPytorch, 
  SiTensorflow, 
  SiPython, 
  SiCplusplus,
  SiReact, 
  SiExpo,
  SiNodedotjs, 
  SiSocketdotio,
  SiStripe,
  SiOpenjdk,
  SiFirebase
} from "react-icons/si";

const projects = [
  {
    id: 1,
    title: "GNN-CeramicMap",
    description: "Built a custom GCN layer with distance-aware edge features, outperforming traditional models like N2P2 in atomic energy prediction.",
    image: "/projects/project1.png",
    technologies: [
      { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
      { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
    ],
    githubUrl: "https://github.com/MuhammadZain2005/GNN-CeramicMap",
    blogUrl: "/blog/gnn-ceramicmap",
  },
  {
    id: 2,
    title: "Plantagochi",
    description:
      "Plantagotchi is a hand-drawn interactive plant care app that uses real environmental and bio-signal sensors to let your plant “talk.”",
    image: "/projects/Plantagotchi_project.png",
    technologies: [
      { name: "React Native", icon: SiReact, color: "#61DAFB" },
      { name: "Expo", icon: SiExpo, color: "#575757ff" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "WebSocket", icon: SiSocketdotio, color: "#ffffffff" },
    ],
    githubUrl: "https://github.com/MuhammadZain2005/Plantagotchi",
    blogUrl: "/blog/plantagotchi",
    demoUrl: "https://youtube.com/shorts/_Rtnkhy3jHY?si=oCCsWEAq1hQDIRSl",
  },
  {
    id: 3,
    title: "EmotiLog",
    description:
      "Android mood tracker designed for quick and easy daily emotional journaling. Users can tap emotion icons on the home screen to log their feelings with automatic timestamps.",
    image: "/projects/project3.png",
    technologies: [
      { name: "Java", icon: SiOpenjdk, color: "#ED8B00" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    ],
    githubUrl: "https://github.com/MuhammadZain2005/EmotiLog",
    blogUrl: "/blog/emotilog",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="pt-32 pb-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-left text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover relative"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6 pb-12">
                <div className="project-tech-row flex flex-wrap gap-2 mb-0 items-start justify-start content-start -mx-6 px-2 -translate-y-5">
                  {project.technologies.map((tech, index) => {
                    const IconComponent = tech.icon;
                    return (
                      <div
                        key={`${project.id}-${tech.name}-${index}`}
                        className="flex items-center justify-center w-10 h-10 bg-background/80 backdrop-blur-sm border border-border/40 rounded-xl shrink-0"
                        title={tech.name}
                      >
                        <IconComponent style={{ color: tech.color }} className="w-5 h-5" />
                      </div>
                    );
                  })}
                </div>

                <div className="-mt-3">
                  <h3 className="text-xl font-semibold mb-1 text-primary">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                </div>
                {/* Reserved space above; GitHub icon is positioned independently */}
              </div>

              {/* Bottom-right GitHub link - independent from content layout */}
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                {project.blogUrl && (
                  <Link
                    to={project.blogUrl}
                    aria-label={`Read the blog post for ${project.title}`}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    preventScrollReset
                  >
                    <FileText size={22} />
                  </Link>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch the demo for ${project.title}`}
                    className="text-foreground/80 hover:text-primary transition-colors duration-300"
                  >
                    <Link2 size={22} />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} on GitHub`}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/MuhammadZain2005"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
