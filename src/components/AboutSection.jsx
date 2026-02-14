import { 
  Download, 
  FileText, 
  Music, 
  ChevronDown, 
  ChevronUp, 
  Brain
} from "lucide-react";
import { useState } from "react";
import { 
  SiPytorch, 
  SiTensorflow, 
  SiScikitlearn, 
  SiPython, 
  SiCplusplus,
  SiMysql,
  SiNumpy, 
  SiPandas, 
  SiReact, 
  SiExpo,
  SiFlask, 
  SiDjango, 
  SiNodedotjs, 
  SiAmazonaws, 
  SiGit, 
  SiGithub, 
  SiSocketdotio,
  SiJupyter, 
  SiVisualstudiocode, 
  SiPycharm, 
  SiMongodb
} from "react-icons/si";
import { MapLocation } from "./MapLocation";

export const AboutSection = () => {
  const [expandedBoxes, setExpandedBoxes] = useState({});

  const toggleBox = (index) => {
    setExpandedBoxes(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const techStackBoxes = [
    {
      title: "ML & AI",
      description: "Machine learning & deep learning",
      preview: [
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
      ],
      full: [
        { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
        { name: "PyTorch Geometric", icon: SiPytorch, color: "#EE4C2C" },
        { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
        { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
        { name: "Deep Learning", icon: Brain, color: "#8B5CF6" },
        { name: "Neural Networks", icon: Brain, color: "#A78BFA" },
        { name: "Computer Vision", icon: Brain, color: "#C4B5FD" },
      ]
    },
    {
      title: "Programming",
      description: "Core languages & scientific computing",
      preview: [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "C", icon: SiCplusplus, color: "#00599C" },
        { name: "React Native", icon: SiReact, color: "#61DAFB" },
      ],
      full: [
        { name: "Python", icon: SiPython, color: "#3776AB" },
        { name: "C", icon: SiCplusplus, color: "#00599C" },
        { name: "SQL", icon: SiMysql, color: "#4479A1" },
        { name: "NumPy", icon: SiNumpy, color: "#013243" },
        { name: "Pandas", icon: SiPandas, color: "#150458" },
        { name: "SciPy", icon: Brain, color: "#8CAAE6" },
        { name: "Matplotlib", icon: Brain, color: "#11557C" },
        { name: "React", icon: SiReact, color: "#61DAFB" },
        { name: "React Native", icon: SiReact, color: "#61DAFB" },
        { name: "Flask", icon: SiFlask, color: "#EF4444" },
        { name: "Django", icon: SiDjango, color: "#092E20" },
        { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      ]
    },
    {
      title: "Tools & Cloud",
      description: "Development tools & databases",
      preview: [
        { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
        { name: "Expo", icon: SiExpo, color: "#656565ff" },
        { name: "WebSocket", icon: SiSocketdotio, color: "#e7e7e7ff" },
      ],
      full: [
        { name: "AWS", icon: SiAmazonaws, color: "#FF9900" },
        { name: "Expo", icon: SiExpo, color: "#656565ff" },
        { name: "Git", icon: SiGit, color: "#F05032" },
        { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
        { name: "WebSocket", icon: SiSocketdotio, color: "#ffffffff" },
        { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
        { name: "VS Code", icon: SiVisualstudiocode, color: "#007ACC" },
        { name: "PyCharm", icon: SiPycharm, color: "#FACC15" },
        { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      ]
    }
  ];

  return (
    <section id="about" className="pt-32 pb-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        {/* Introduction Text */}
        <div className="text-center text-muted-foreground max-w-6xl mx-auto mb-12 leading-relaxed">
          <p>
            I'm a third-year CS (AI) student at{' '}
            <a 
              href="https://www.ualberta.ca" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              UAlberta
            </a>
            , currently a Machine Learning Intern at{' '}
            <a 
              href="https://sites.ualberta.ca/~jdhogan/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1 align-middle"
            >
              <img src="/CDAM.jpeg" alt="CDAM" className="w-4 h-4 object-contain rounded-sm inline-block" />
              CDAM
            </a>
            . I like turning messy data into useful systems—lately, physics-aware GNNs; before that at{' '}
            <a 
              href="https://connexix.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1 align-middle"
            >
              <img src="/Connexix.png" alt="Connexix" className="w-4 h-4 object-contain inline-block" />
              Connexix
            </a>
            , recommendations and predictive inventory that actually moved the needle. I'm backend-first, full-stack fluent, and obsessive about latency, logging, and clean interfaces.
          </p>
          <p className="mt-4 text-primary font-bold">
            Open to an 8-month co-op starting Winter 2026.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Resume & Location */}
          <div className="flex flex-col gap-6">
            {/* Resume Card - Compact */}
            <div className="bg-card border border-border/40 rounded-2xl p-6 card-hover flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Resume</h3>
                <p className="text-xs text-muted-foreground">Quick summary of my experience</p>
              </div>
              <a 
                href="/Asad_Muhammad_Zain.pdf" 
                download="Asad_Muhammad_Zain_Resume.pdf"
                className="w-full px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Location & Status Card */}
            <div className="bg-card border border-border/40 rounded-2xl p-6 card-hover flex-1">
              <MapLocation 
                primaryLocation="Edmonton, Canada"
                locations={[
                  { name: "Lahore, Pakistan", label: "LHR, PK", coordinates: [74.3587, 31.5204], color: '#ff6b35' },
                  { name: "Edmonton, Canada", label: "EDM, CAN", coordinates: [-113.4937, 53.5461], color: '#10b981' },
                  { name: "Jubail, Saudi Arabia", label: "JBL, KSA", coordinates: [49.6604, 27.0174], color: '#3b82f6' },
                ]}
                initialLocationIndex={1}
                status="Open to Opportunities"
                availability="Remote • Hybrid • On-site"
              />
            </div>
          </div>

          {/* Tech Stack Column - 3 Boxes Stacked Vertically */}
          <div className="flex flex-col gap-6">
            {techStackBoxes.map((box, boxIndex) => {
              const isExpanded = expandedBoxes[boxIndex];
              const itemsToShow = isExpanded ? box.full : box.preview;
              const HeaderIcon = box.preview[0].icon;
              
              return (
                <div 
                  key={boxIndex}
                  className="bg-card border border-border/40 rounded-2xl p-6 card-hover transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <HeaderIcon className="w-6 h-6" style={{ color: box.preview[0].color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{box.title}</h3>
                        <p className="text-xs text-muted-foreground">{box.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleBox(boxIndex)}
                      className="p-2 hover:bg-secondary rounded-lg transition-colors duration-200 flex-shrink-0"
                      aria-label={isExpanded ? "Collapse" : "Expand"}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  </div>
                  <div className={`grid gap-3 mt-4 transition-all duration-300 ${isExpanded ? 'grid-cols-3' : 'grid-cols-3'}`}>
                    {itemsToShow.map((tech, index) => {
                      const IconComponent = tech.icon;
                      return (
                        <div
                          key={index}
                          className="aspect-square rounded-xl bg-secondary/50 hover:bg-secondary transition-colors duration-300 flex flex-col items-center justify-center gap-1 p-2"
                        >
                          <IconComponent className="w-8 h-8" style={{ color: tech.color }} />
                          <span className="text-xs text-muted-foreground text-center">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spotify Playlist Card */}
          <div className="bg-card border border-border/40 rounded-2xl p-6 card-hover flex flex-col h-full">
            <div className="flex items-center gap-2 mb-6">
              <Music className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Music & Mood</h3>
            </div>
            
            {/* Spotify Embed */}
            <iframe 
              style={{ borderRadius: '12px' }} 
              src="https://open.spotify.com/embed/playlist/7qjTmdG9KoAznN8dbweutD?utm_source=generator&theme=0" 
              width="100%" 
              height="480" 
              frameBorder="0" 
              allowFullScreen="" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Spotify Playlist - dreamy."
              className="flex-1"
            ></iframe>

            <p className="text-xs text-muted-foreground mt-4">
              From Tame Impala to Arctic Monkeys • My coding soundtrack
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
