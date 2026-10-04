export const blogPosts = [
  {
    "id": "molecular-simulation",
    "projectId": "molecular",
    "title": "Where Pretrained Molecular Potentials Stop Agreeing",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "Scientific ML",
      "Molecular simulation"
    ],
    "excerpt": "Water clusters, reaction barriers, and a correction loop whose most useful result was a failure to converge.",
    "sections": [
      {
        "heading": "The question behind the simulation",
        "body": [
          "A fast potential is useful only if the trajectory it produces is useful. In this project, I’m studying how pretrained MACE-OFF23 potentials compare with an xTB reference, and whether a small correction can close a meaningful part of that gap without retraining the foundation model.",
          "The workflow starts with reproducible xTB metadynamics on water systems. xTB’s built-in bias uses Cartesian RMSD from previously visited structures. Bond distances and other collective variables are measured afterward to interpret what happened. That distinction matters: a potential-energy plot from a biased trajectory is not a free-energy surface."
        ]
      },
      {
        "heading": "Agreement depends on where you look",
        "body": [
          "Water droplets provide one test; a Diels–Alder reaction provides a much harder one. In the reaction study, butadiene and ethylene form cyclohexene. I compared forces on perturbed geometries along the pathway, rather than treating a single average error as a complete description of the potential.",
          "The repository’s region analysis uses 152 rattled configurations, grouped by forming C–C distance. MACE–xTB force disagreement concentrates near the transition-state and post-transition-state regions. This directly supports a statement about where the models disagree. It does not prove that missing training examples caused the disagreement; that remains a hypothesis."
        ]
      },
      {
        "heading": "Correcting a reference mismatch",
        "body": [
          "The correction experiments keep the pretrained model fixed. A conservative pairwise delta model adds an energy correction and obtains its corresponding forces through differentiation. This keeps the force field tied to an energy surface, unlike an arbitrary rescaling of each element’s forces.",
          "The initial correction study reduced validation force RMSE from 0.411 to 0.347 eV/Å and moved the reported Diels–Alder barrier from 36.0 to 11.7 kcal/mol. But it also over-compacted the water droplet. Improving one reactive metric did not improve every property.",
          "There is an essential qualification: xTB is the designated reference in this experiment, not physical ground truth. Matching it validates the correction machinery. It does not, by itself, establish improved agreement with experiment or a higher-level electronic-structure method."
        ],
        "callout": "Reference matching is the measured objective here. Physical accuracy is a separate question."
      },
      {
        "heading": "The 6.33 kcal/mol result—and what came next",
        "body": [
          "A later targeted correction gave a 6.33 kcal/mol saddle estimate against the 6.7 kcal/mol xTB target. That estimate came from a saddle search; the same model’s constrained-scan barrier was 9.87 kcal/mol. Reporting one without the estimator would hide an important difference.",
          "The next experiment tried to improve the model iteratively: search for a saddle, validate it, request a small packet of xTB evaluations around the selected geometry, refit the correction, and repeat. The protocol recorded 42 new xTB calls over six iterations. The model at iteration zero was already the best one.",
          "The scan barrier worsened from 9.87 to 13.91 kcal/mol. Two iterations failed the first-order-saddle validity gate. Held-out reactive force RMSE also worsened. The experiment therefore does not support a claim that 42 calculations produced a converged, increasingly accurate reaction model."
        ],
        "figure": {
          "src": "/projects/figures/phase2-barrier.webp",
          "alt": "Six-iteration comparison of saddle and scan barriers with the xTB target; invalid saddle estimates are marked.",
          "caption": "Committed Phase 2 result figure. Scan and saddle estimates are tracked separately; failed saddle gates must not be treated as successful transition-state searches.",
          "source": "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics/blob/main/sweep/corrections/PHASE2_ITERATIVE_CORRECTION_FINDINGS.md",
          "width": 1494,
          "height": 893
        }
      },
      {
        "heading": "What I take from the negative result",
        "body": [
          "The hard part is not just fitting a residual. It is choosing what to measure, deciding whether a candidate is the right transition state, and checking whether a local improvement survives outside the region used for correction.",
          "This particular correction architecture and acquisition rule did not converge. That narrows the next question: whether the model needs more expressive features, a different sampling rule, or a better balance between reactive and equilibrium configurations. Those are next experiments, not completed results."
        ]
      }
    ],
    "takeaways": [
      "Keep reference agreement separate from physical accuracy.",
      "Track the barrier estimator and validate the saddle, not just its energy.",
      "A growing dataset is not evidence of a better potential; the held-out and structural checks have to improve too."
    ],
    "sources": [
      [
        "Workflows and scope",
        "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics"
      ],
      [
        "Initial correction experiment",
        "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics/blob/main/sweep/corrections/FINDINGS_corrections.md"
      ],
      [
        "Region analysis and targeted correction",
        "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics/blob/main/sweep/diels_alder/FINDINGS_jul31.md"
      ],
      [
        "Iterative correction: protocol, results, and limitations",
        "https://github.com/tiangroup-uofa/ml-accelerated-metadynamics/blob/main/sweep/corrections/PHASE2_ITERATIVE_CORRECTION_FINDINGS.md"
      ]
    ],
    "readTime": "3 min read"
  },
  {
    "id": "equivariant-gnn",
    "projectId": "equivariant",
    "title": "Teaching a Graph Network the Symmetries of Atomic Systems",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "Geometric learning",
      "Atomistic ML"
    ],
    "excerpt": "Why the representation, periodic graph, and energy–force relationship matter as much as the training loop.",
    "sections": [
      {
        "heading": "A force has a direction",
        "body": [
          "Rotate an atomic structure and its energy should stay the same. Its force vectors should rotate with it. A model that treats Cartesian coordinates as unrelated input columns has to learn that behavior from examples; an equivariant model builds the transformation rule into its architecture.",
          "My later atomistic research uses PyTorch, PyTorch Geometric, and e3nn to learn energies and forces for ceramic systems. This is distinct from GNN-CeramicMap, the earlier public scalar-energy prototype. Linking that prototype should not imply that it contains the later research model."
        ]
      },
      {
        "heading": "Geometry in the messages",
        "body": [
          "The graph represents atoms and their local neighborhoods. In a periodic system, a neighbor may lie across a cell boundary. The displacement used in a message therefore needs the appropriate lattice shift, rather than simply subtracting the coordinates stored inside the cell.",
          "Spherical harmonics encode the direction of those displacements. Irreducible representations describe how feature groups transform under symmetry operations, and tensor products combine those features while respecting their transformation rules. For me, their value is practical: they let directional information survive message passing without making predictions depend arbitrarily on the orientation of the sample."
        ]
      },
      {
        "heading": "One energy surface, consistent forces",
        "body": [
          "The force prediction comes from the negative gradient of the predicted energy with respect to atomic positions: F = −∂E/∂r. Energy and force are consequently linked, rather than learned as two unrelated outputs.",
          "That choice also shapes the implementation. Geometry must remain connected to the differentiable computation, and training on forces means differentiating through an energy derivative. Memory use, graph construction, and the training loop become part of the modeling problem."
        ],
        "callout": "Energy stays invariant under rotation; force vectors transform with the structure."
      },
      {
        "heading": "The data pipeline is part of the model",
        "body": [
          "VASP-derived structures become periodic graphs. Loading every graph eagerly is an awkward fit as structures and datasets grow, so the later pipeline uses lazy graph loading with caching. The aim is to make training possible within memory limits while preserving the geometry and labels the model needs.",
          "Training also needs to balance energy and force objectives. The research implementation includes staged training and physics-informed force weighting, rather than assuming one fixed weighting will suit every stage. A lower combined loss alone is not enough: the energy and force errors still need to be interpreted separately."
        ]
      },
      {
        "heading": "What the public record can support",
        "body": [
          "The research history includes successive model versions and out-of-distribution evaluation work. I do not treat the existence of an evaluation script or an archived checkpoint as proof of a particular generalization result.",
          "My resume reports energy and force errors for the research work, but the public prototype is not evidence for those numbers. A reproducible public benchmark would need an identified dataset, split, model version, metric definition, and result artifact; I do not claim one for the private system here.",
          "The earlier prototype has another important limitation: its training node features include reference-force channels, while its POSCAR-only prediction helper zero-fills them. That train–inference mismatch belongs in any interpretation of its energy results. It is one reason to keep the two systems clearly separated."
        ]
      }
    ],
    "takeaways": [
      "Physical symmetry is a constraint on how representations transform.",
      "Periodic image shifts are part of the geometry, not incidental graph metadata.",
      "Private research results and an earlier public prototype need separate descriptions."
    ],
    "sources": [
      [
        "Earlier public prototype—scope and limitations",
        "https://github.com/muhzain05/GNN-CeramicMap"
      ],
      [
        "Public prototype model",
        "https://github.com/muhzain05/GNN-CeramicMap/blob/main/src/egcn/egcn.py"
      ],
      [
        "Public prototype VASP processing",
        "https://github.com/muhzain05/GNN-CeramicMap/blob/main/src/egcn/dft_processor.py"
      ]
    ],
    "readTime": "3 min read"
  },
  {
    "id": "kv-cache-transfer",
    "projectId": "kv-cache",
    "title": "When Can an LLM Reuse Someone Else’s KV Cache?",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "ML systems",
      "LLM inference"
    ],
    "excerpt": "The mapper with the most convincing training fit can be the least useful one at inference time.",
    "sections": [
      {
        "heading": "Reusing state instead of recomputing it",
        "body": [
          "A transformer’s KV cache stores attention keys and values for tokens it has already processed. If a smaller model could produce state that a larger sibling can use, it might avoid part of the larger model’s prefill work. The question is whether the transferred state preserves useful behavior.",
          "This repository is a CPU-scale replication using Qwen3-0.6B and Qwen3-1.7B. It fits linear mappings between their caches and evaluates the target after replacing its earlier context state. These experiments test transfer quality; they do not establish an end-to-end serving speedup."
        ]
      },
      {
        "heading": "Getting position and content straight",
        "body": [
          "Rotary position embeddings mix position into attention keys. The content-space approach strips that rotation before fitting the map, then applies the target’s position handling when constructing the cache. The implementation also compares against mapping in RoPE space.",
          "A positional transformation error could look like a failed research hypothesis. Before interpreting any mapper, the harness checks its RoPE operations against the model implementation and checks native-cache injection against normal inference. The native and native-injected conditions must agree; otherwise downstream comparisons are not trustworthy."
        ]
      },
      {
        "heading": "Hold out sequences, not neighboring tokens",
        "body": [
          "The calibration data comes from FineWeb-Edu. The executed baseline uses 50 sequences, with train and held-out partitions separated by sequence. Adjacent tokens share context, so randomly holding out individual tokens would make the generalization check too forgiving.",
          "The mapper experiments vary the number of selected source layers: k = 1, 4, or 8. A larger feature space can fit the calibration data very well without producing state that works on new sequences. Training R² alone can therefore rank the maps in the wrong order."
        ],
        "figure": {
          "src": "/projects/figures/kv-probe.webp",
          "alt": "Committed layer-to-layer probe heatmaps comparing reconstruction in the cache-transfer experiment.",
          "caption": "The repository’s actual probe figure. Layer reconstruction is a diagnostic; task evaluation and held-out reconstruction are still needed.",
          "source": "https://github.com/muhzain05/kv-transfer-replication/blob/main/results/probe/qwen3-0.6b-to-1.7b/figure2.png",
          "width": 1690,
          "height": 1040
        }
      },
      {
        "heading": "What ran on HellaSwag",
        "body": [
          "The committed 500-example evaluation includes native target state, native state injected through the harness, the source model, an identity mapping, and the three fitted maps. On the length-normalized accuracy metric, native scores 0.598 and mapped-k1 scores 0.548; mapped-k8 falls to 0.312.",
          "Here “length-normalized” refers to answer scoring. It is separate from chance-floor-normalized retention, which adjusts the ratio for HellaSwag’s 25% chance floor. The k1 map retains about 91.6% of native length-normalized accuracy, or about 85.6% after floor normalization. Those are different quantities.",
          "The result is narrow but useful: in this calibration regime, adding mapper capacity did not improve downstream behavior. It also is not a refutation of transfer at larger calibration scales."
        ],
        "table": {
          "caption": "Committed HellaSwag evaluation, 500 examples per condition",
          "headers": [
            "Condition",
            "Length-normalized accuracy",
            "Floor-normalized retention"
          ],
          "rows": [
            [
              "Native target",
              "0.598",
              "1.000"
            ],
            [
              "Native injected",
              "0.598",
              "1.000"
            ],
            [
              "Identity map",
              "0.362",
              "0.322"
            ],
            [
              "Mapped k = 1",
              "0.548",
              "0.856"
            ],
            [
              "Mapped k = 4",
              "0.498",
              "0.713"
            ],
            [
              "Mapped k = 8",
              "0.312",
              "0.178"
            ]
          ]
        }
      },
      {
        "heading": "Try to break the conclusion",
        "body": [
          "The repository records an adversarial verification pass: recomputing claims from available artifacts, refitting with flipped splits, and attacking correctness-gate margins. It also records withdrawn and superseded claims. That audit trail is part of the result, not something to clean out of the story.",
          "The summarizer fails closed on incomplete or mismatched example sets. A short run cannot silently become a valid-looking average. Likewise, a passing offline test suite establishes properties of the harness, not the behavior of real model weights.",
          "Follow-on work in lag-ladder and rl-cache-validity asks what happens when weights change after a cache is created, and whether reuse history matters beyond its age. Those hypotheses and instrument tests are not imported into the completed transfer results. Longer-context transfer and broader model-pair conclusions remain open questions."
        ]
      }
    ],
    "takeaways": [
      "A cache-transfer result depends on a correct injection harness.",
      "Sequence-held-out evaluation catches failures that in-sample fit hides.",
      "Keep task accuracy, retention, runtime, and unrun hypotheses separate."
    ],
    "sources": [
      [
        "Replication implementation and execution status",
        "https://github.com/muhzain05/kv-transfer-replication"
      ],
      [
        "500-example evaluation summary",
        "https://github.com/muhzain05/kv-transfer-replication/blob/main/results/hellaswag/qwen3-0.6b-to-1.7b/summary.md"
      ],
      [
        "Experiment ledger and controls",
        "https://github.com/muhzain05/kv-transfer-replication/blob/main/docs/ledger.md"
      ],
      [
        "Follow-on: cache age across weight updates",
        "https://github.com/muhzain05/lag-ladder"
      ],
      [
        "Follow-on: cache reuse history",
        "https://github.com/muhzain05/rl-cache-validity"
      ]
    ],
    "readTime": "3 min read"
  },
  {
    "id": "plantagotchi",
    "projectId": "plantagotchi",
    "title": "Plantagotchi: Giving Telemetry a Personality",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "React Native",
      "Real-time systems"
    ],
    "excerpt": "An expressive plant-care prototype, and the mock sensor pipeline that makes its behavior testable.",
    "sections": [
      {
        "heading": "Start with the character",
        "body": [
          "Plantagotchi turns plant-care information into a small illustrated companion. Instead of asking someone to interpret every raw value, the interface translates environmental state into expressions and messages. The character gives the app its personality, but the behavior comes from explicit rules.",
          "The Expo and React Native client can capture or select a plant photo, submit it to PlantNet, and show identification alternatives. Perenual supplies care fields, Plantbook supplies environment ranges, and AsyncStorage caches selected information. The manual species-selection screen is still incomplete."
        ]
      },
      {
        "heading": "From a payload to a plant state",
        "body": [
          "The WebSocket client consumes soil, temperature, humidity, MQ-style air-quality, rain or wetness, and biosignal fields. The state hook normalizes those readings into scores; the plant model applies thresholds to derive states and messages.",
          "This is rule-based interpretation, not a model that decodes a plant’s feelings. A biosignal metric in the payload does not establish a biological explanation for a character’s mood. Keeping that distinction explicit lets the playful interface stand on its own."
        ]
      },
      {
        "heading": "A simulator makes the whole flow testable",
        "body": [
          "The repository includes a Node/Express WebSocket mock server and a React/Vite control panel. I can vary the six-channel payload and watch the mobile interface respond, without waiting for a physical sensor setup.",
          "That separation is the useful engineering idea: the app consumes a defined telemetry contract, while the simulator exercises it. The checked-in implementation does not include Arduino or other microcontroller firmware, so I describe it as a telemetry-consuming app rather than a complete hardware acquisition system.",
          "The remaining work includes completing manual selection and validating behavior against physical measurements. The mock pipeline demonstrates the software path, not the accuracy of real sensors."
        ]
      }
    ],
    "takeaways": [
      "An expressive interface can sit on top of explicit, inspectable rules.",
      "A small simulator makes live-state behavior easier to reproduce.",
      "The telemetry contract and the hardware acquisition stack are different deliverables."
    ],
    "sources": [
      [
        "Project scope and setup",
        "https://github.com/muhzain05/Plantagotchi"
      ],
      [
        "Mock telemetry server",
        "https://github.com/muhzain05/Plantagotchi/blob/main/mock-server/server.ts"
      ]
    ],
    "readTime": "2 min read"
  },
  {
    "id": "eventease",
    "projectId": "eventease",
    "title": "EventEase: The Work Behind a Waitlist",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "Android",
      "Firebase",
      "Backend"
    ],
    "excerpt": "Registration is a screen. Selection, invitations, and delivery retries are a system.",
    "sections": [
      {
        "heading": "The event continues after the app closes",
        "body": [
          "EventEase is a Java Android application with entrant, organizer, and admin flows. Entrants discover events and join waitlists; organizers create events, set registration windows, manage entrants, and upload posters. The interesting engineering problem is coordinating what happens after registration closes.",
          "Firestore stores application state, Storage holds media, and Firebase Cloud Messaging handles push delivery. The Android client also includes maps for entrant locations when the profile has usable coordinates and the user has granted permission."
        ]
      },
      {
        "heading": "Move time-based work to the backend",
        "body": [
          "The checked-in Functions project separates four jobs: Firestore-triggered notification delivery, automatic entrant selection, pre-event handling of non-selected entrants, and retry processing for failed notifications. The scheduled jobs run once per minute.",
          "This places time-based processing outside any one phone’s lifecycle. A user does not need to leave an activity open for the scheduler to inspect registration windows. The source also contains older client-side selection code marked as disabled in favor of the Cloud Function.",
          "Retry bookkeeping matters because a selection decision and a delivered notification are different events. The implementation tracks failures and distinguishes retryable delivery problems. That is a useful foundation, but the existence of retries is not proof of exactly-once processing or production reliability."
        ]
      },
      {
        "heading": "Describe identity accurately",
        "body": [
          "The primary profile flow uses Android’s secure device ID, prefixed with device_, to locate a Firestore user document. Firebase Authentication appears in the dependencies, but that alone does not make this a conventional username-and-password application.",
          "This distinction affects how I describe the project: device-based recognition and Firestore profile state, with role-specific screens. I do not present it as a fully audited identity or authorization system."
        ]
      },
      {
        "heading": "What the architecture taught me",
        "body": [
          "A mobile feature often has a second half that lives off-device. A waitlist needs a selection policy, an invitation needs delivery state, and a registration deadline needs a process that will run when the phone is gone.",
          "The repository implements those pieces as an application prototype. I can point to the orchestration code and its transitions; I do not infer active deployment, load testing, or delivery guarantees from that code alone."
        ]
      }
    ],
    "takeaways": [
      "Time-based state transitions belong somewhere independent of the client lifecycle.",
      "Track selection state and notification delivery separately.",
      "Describe the implemented identity model, not every dependency in the build."
    ],
    "sources": [
      [
        "Application scope and Android architecture",
        "https://github.com/muhzain05/EventEase"
      ],
      [
        "Scheduled functions and notification processing",
        "https://github.com/muhzain05/EventEase/blob/main/code/EventEase/functions/index.js"
      ]
    ],
    "readTime": "2 min read"
  },
  {
    "id": "3d-ray-tracer",
    "projectId": "ray-tracer",
    "title": "From a Ray to a Pixel in C",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "C99",
      "Graphics"
    ],
    "excerpt": "A compact rendering pipeline built from vectors, intersections, direct lighting, and nine samples per pixel.",
    "sections": [
      {
        "heading": "Make the math visible",
        "body": [
          "I built this renderer to work through the connection between geometry and an image. The scene contains spheres, a point light, a camera viewport, and a hexadecimal color palette. The implementation handles the pipeline directly in C99 and writes a plain-text PPM image.",
          "A camera ray passes through a pixel location into the scene. Solving the ray–sphere quadratic gives candidate intersections; selecting the nearest positive hit determines which surface is visible."
        ]
      },
      {
        "heading": "Lighting and visibility are separate questions",
        "body": [
          "At a hit point, the surface normal and direction to the light determine the Lambertian diffuse term. The light intensity also falls with squared distance. A secondary shadow ray checks whether another sphere blocks the path to the point light.",
          "The ray origin is offset slightly along the surface normal to avoid immediately hitting the same surface because of floating-point error. This is direct illumination with hard shadows. The source does not implement recursive reflection, ambient occlusion, or a path tracer."
        ],
        "figure": {
          "src": "/projects/covers/ray-tracer.webp",
          "alt": "Actual sphere-scene render produced by the project's C renderer.",
          "caption": "A committed render from the repository’s assets directory, reproduced without generated scene content.",
          "source": "https://github.com/muhzain05/3D-Ray-Tracer/blob/main/assets/FS11.png",
          "width": 640,
          "height": 480
        }
      },
      {
        "heading": "Nine samples instead of one",
        "body": [
          "The final renderer samples a deterministic 3 × 3 grid within each pixel and averages the resulting colors. That reduces jagged edges at the cost of tracing nine camera rays per pixel.",
          "The important improvement here is image quality, not a claimed runtime optimization. Keeping the pipeline small makes it easier to see what each operation contributes, and to reason about the extra work required for smoother edges."
        ]
      }
    ],
    "takeaways": [
      "Nearest-hit selection, surface lighting, and shadow visibility solve different parts of the pixel.",
      "Supersampling trades more ray work for smoother edges.",
      "A small renderer is most useful when its claimed features match its source."
    ],
    "sources": [
      [
        "Renderer implementation",
        "https://github.com/muhzain05/3D-Ray-Tracer/blob/main/src/assg.c"
      ],
      [
        "Sphere intersection implementation",
        "https://github.com/muhzain05/3D-Ray-Tracer/blob/main/src/spheres.c"
      ],
      [
        "Build and scene format",
        "https://github.com/muhzain05/3D-Ray-Tracer"
      ]
    ],
    "readTime": "2 min read"
  },
  {
    "id": "gnn-ceramicmap",
    "title": "GNN-CeramicMap: An Earlier Atom-Graph Prototype",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "PyTorch Geometric",
      "Earlier work"
    ],
    "excerpt": "A distance-aware scalar-energy model, and the limits that matter when interpreting it.",
    "sections": [
      {
        "heading": "From VASP files to a graph",
        "body": [
          "GNN-CeramicMap parses VASP POSCAR and OUTCAR data into periodic atom graphs for boron-carbide structures. Neighbor edges carry distance-derived attributes, and the target is energy per atom. The model combines custom message-passing layers, residual connections, batch normalization, and global mean pooling.",
          "The training script uses an 80/20 split, AdamW with MSE loss, learning-rate scheduling, and early stopping. It is a useful earlier prototype of the data-to-graph-to-energy pipeline."
        ]
      },
      {
        "heading": "A limitation in the input features",
        "body": [
          "The node vector includes atomic number, Cartesian position, and reference-force components. The POSCAR-only prediction helper fills the force channels with zeros. That mismatch limits what an ordinary validation score can say about prediction from structure alone.",
          "This code is not the later e3nn-based, E(3)-equivariant research system. It does not substantiate claims about learned equivariant forces, attention explanations, uncertainty calibration, or a Materials Project benchmark. I keep it public as an earlier stage in the work, with its limitations visible."
        ]
      }
    ],
    "takeaways": [
      "A graph representation alone does not establish equivariance.",
      "Inspect input features before interpreting a validation metric.",
      "Keep the prototype and later research system separate."
    ],
    "sources": [
      [
        "Scope, features, and limitations",
        "https://github.com/muhzain05/GNN-CeramicMap"
      ],
      [
        "Training implementation",
        "https://github.com/muhzain05/GNN-CeramicMap/blob/main/src/scripts/train_eval.py"
      ]
    ],
    "readTime": "2 min read"
  },
  {
    "id": "emotilog",
    "title": "EmotiLog: Keeping a Small Android App Simple",
    "publishedAt": "Updated October 3, 2026",
    "tags": [
      "Java",
      "Android",
      "Earlier work"
    ],
    "excerpt": "Six emotions, timestamped entries, and session summaries—with an intentionally small storage model.",
    "sections": [
      {
        "heading": "A short path from tap to entry",
        "body": [
          "EmotiLog is an early native Java Android project. A tap on one of six emotion buttons records its label and a timestamp. Home, Logs, and Summary screens keep entry, review, and counting separate.",
          "Logger stores entries in an in-memory ArrayList and returns a copy to callers. New entries appear first. SummaryLogger derives per-emotion counts, and the summary screen refreshes when it resumes."
        ]
      },
      {
        "heading": "Be clear about the boundary",
        "body": [
          "The data lasts only as long as the app process. There is no database persistence, Firebase backend, authentication flow, or Cloud Functions analytics in the checked-in implementation.",
          "That makes this a small UI and data-structures exercise rather than a deployed journaling service. Durable local storage would be a natural next step, but it is not part of this implementation."
        ]
      }
    ],
    "takeaways": [
      "A simple state model is easier to understand when its lifetime is explicit.",
      "The implemented feature set can be small and still make a useful learning project."
    ],
    "sources": [
      [
        "Implementation and persistence scope",
        "https://github.com/muhzain05/EmotiLog"
      ]
    ],
    "readTime": "2 min read"
  }
];
