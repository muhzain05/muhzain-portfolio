export const projects = [
  {
    id: "molecular",
    title: "ML-Accelerated Molecular Simulation",
    category: "Scientific ML / Molecular simulation",
    featured: true,
    description:
      "Testing lightweight corrections to pretrained molecular potentials.",
    image: "/projects/covers/molecular.webp",
    imageAlt:
      "Conceptual water-molecule cluster with hydrogen bonds and force directions, illustrated in copper and ivory.",
    figure: "/projects/figures/phase2-barrier.webp",
    figureAlt:
      "Repository plot of corrected saddle and scan barriers across six iterations.",
    tags: ["MACE", "xTB", "ASE"],
    note: "Reference matching · transition-state validation",
    githubUrl: "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics",
    blogUrl: "/blog/molecular-simulation",
  },
  {
    id: "equivariant",
    title: "Equivariant GNNs for Atomistic Systems",
    category: "Scientific ML / Geometric learning",
    featured: true,
    description:
      "Learning atomic energies and forces with physical symmetry built in.",
    image: "/projects/covers/equivariant.webp",
    imageAlt:
      "Conceptual periodic atom graphs in two orientations alongside spherical-harmonic shapes.",
    tags: ["PyTorch", "e3nn", "PyG"],
    note: "Research implementation private · earlier prototype public",
    githubUrl: "https://github.com/muhzain05/GNN-CeramicMap",
    githubLabel: "Earlier prototype",
    blogUrl: "/blog/equivariant-gnn",
  },
  {
    id: "kv-cache",
    title: "KV-Cache Transfer & Robustness",
    category: "ML systems / LLM inference",
    featured: true,
    description:
      "Studying when one language model can reuse another’s inference cache.",
    image: "/projects/covers/kv-cache.webp",
    imageAlt:
      "Conceptual source cache connected through a linear mapper to a larger target cache.",
    tags: ["PyTorch", "Transformers", "Qwen3"],
    note: "Reproducible experiments · explicit correctness gates",
    githubUrl: "https://github.com/muhzain05/kv-transfer-replication",
    blogUrl: "/blog/kv-cache-transfer",
  },
  {
    id: "plantagotchi",
    title: "Plantagotchi",
    category: "Mobile / Real-time",
    description:
      "An illustrated plant companion with species identification and live telemetry.",
    image: "/projects/covers/plantagotchi.webp",
    imageAlt:
      "Plantagotchi’s smiling terracotta pot character beside water, temperature, and leaf symbols.",
    tags: ["React Native", "TypeScript", "WebSockets"],
    githubUrl: "https://github.com/muhzain05/Plantagotchi",
    blogUrl: "/blog/plantagotchi",
  },
  {
    id: "eventease",
    title: "EventEase",
    category: "Android / Cloud orchestration",
    description:
      "Event registration, waitlists, and invitations across Android screens and scheduled Firebase backend jobs.",
    image: "/projects/covers/eventease.webp",
    imageAlt:
      "Conceptual phone and backend flow connecting a waitlist, selection, and notification.",
    tags: ["Java", "Firebase", "FCM"],
    githubUrl: "https://github.com/muhzain05/EventEase",
    blogUrl: "/blog/eventease",
  },
  {
    id: "ray-tracer",
    title: "3D Ray Tracer",
    category: "Systems / Graphics",
    description:
      "From camera rays to pixels: sphere intersections, diffuse lighting, hard shadows, and 3 × 3 supersampling in C99.",
    image: "/projects/covers/ray-tracer.webp",
    imageAlt:
      "Actual C ray-tracer output showing shaded spheres and hard shadows.",
    tags: ["C99", "Linear algebra", "Rendering"],
    githubUrl: "https://github.com/muhzain05/3D-Ray-Tracer",
    blogUrl: "/blog/3d-ray-tracer",
  },
];

export const otherProjects = [
  {
    title: "GNN-CeramicMap",
    description: "The earlier distance-aware, scalar-energy graph prototype.",
    blogUrl: "/blog/gnn-ceramicmap",
  },
  {
    title: "EmotiLog",
    description:
      "A small Java Android app for timestamped, in-memory mood logging.",
    blogUrl: "/blog/emotilog",
  },
];
