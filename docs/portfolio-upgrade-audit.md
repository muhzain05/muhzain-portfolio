# Portfolio upgrade audit — October 3, 2026

## Result

The site retains its warm palette, serif typography, day/evening themes, and lanterns. Featured research uses consistent image-and-text rows; complementary software uses a compact three-column desktop grid and balanced rows or stacked cards at smaller widths. The About page is first person, the empty portrait is gone, and current research and capstone experience lead the timeline.

Project order:
1. ML-Accelerated Molecular Simulation
2. Equivariant GNNs for Atomistic Systems
3. KV-Cache Transfer & Robustness
4. Plantagotchi
5. EventEase
6. 3D Ray Tracer

GNN-CeramicMap and EmotiLog are compact earlier-work links. Optional M5 forecasting and older/concept projects were omitted to keep the main selection focused.

## Articles

Added: `molecular-simulation`, `equivariant-gnn`, `kv-cache-transfer`, `eventease`.
Rewritten, preserving URLs: `plantagotchi`, `3d-ray-tracer`, `gnn-ceramicmap`, `emotilog`.

All articles have source notes. Research posts include actual repository figures and distinguish completed experiments from hypotheses. Article dates explicitly say "Updated" rather than inventing original publication dates. Read times are based on the rewritten bodies.

## Evidence and factual decisions

- Molecular simulation: inspected README/setup guidance, correction findings, Phase 2 summary/results, targeted-region findings, correction helper source, and committed figures. xTB is a reference for methodology testing, not physical ground truth. Initial force RMSE and barrier values are attributed to the initial correction experiment. The later 6.33 kcal/mol value is a saddle estimate; 9.87 kcal/mol is the same model's constrained-scan estimate. Iteration zero was best. The 42-call loop did not converge, and two iterations failed the saddle gate. No claim of convergent improvement, universal acceleration, or better experimental accuracy is published.
- Equivariant research: inspected the private model, lazy dataset, training code, dependency manifest, and README. Published only high-level architecture already described in the user's brief. No private datasets, figures, logs, checkpoints, raw source, or private repository links were copied into the portfolio.
- GNN-CeramicMap: inspected public model and VASP-processing source and training documentation. It is an earlier scalar-energy prototype, not the later equivariant energy/force system. Reference-force input channels and zero-filled inference channels are explicitly identified as a limitation. Removed Materials Project, focal loss, symmetry augmentation, N2P2, 8.2% improvement, attention, and uncertainty claims.
- KV transfer: inspected README, dependency manifest, data split code, fail-closed summarizer, committed mapper and HellaSwag summaries, and probe figure. Numbers are the committed 500-example result, not a rerun performed for this portfolio. Length-normalized answer accuracy and chance-floor-normalized retention are distinguished. No serving speedup, broader model-family result, or unrun follow-on experiment is claimed.
- Plantagotchi: inspected mobile dependencies, WebSocket client, README, mock-server documentation, and supplied artwork. Described the client, lookup APIs, explicit state rules, simulator, and incomplete manual selector. Removed firmware, sensor acquisition, and external user-testing claims.
- EventEase: inspected Android/backend documentation and scheduled function source. Described device-ID + Firestore profiles, scheduled selection and notification/retry processing. No password authentication, exactly-once guarantee, active deployment, or production-readiness claim.
- Ray tracer: inspected C rendering and intersection code and actual sample renders. Described point lighting, diffuse shading, hard shadows, and deterministic 3×3 supersampling. Removed recursive reflections, ambient occlusion, Xorshift, and the 18% runtime claim.
- EmotiLog: inspected README and Logger.java. Entries are stored in process memory. Removed Firebase, authentication, notes, notifications, and user-feedback claims.

The bundled resume corroborates 2027 graduation and Jan–Dec 2025 CDAM dates. The newer UAlberta and PCL role dates and high-level descriptions come from the user's factual brief. PCL percentages were withheld because the available PDF does not cover that role. Private GNN metric claims (40 meV/atom, 60 meV/Å, 40%, 20%) were not promoted as independently reproducible benchmarks without a traceable split/version/result mapping. Older employer percentages and product-impact claims were not carried forward.

The existing PDF remains unchanged and is not advertised as the current resume; navigation points to the updated `/resume` page. Its LinkedIn annotation supplied the corrected profile URL. No private client material was accessed or published.

## Source revisions inspected

| Public repository | Commit |
| --- | --- |
| tiangroup-uofa/ml-accelerated-metadynamics | 34f653d6e9faf16e7b58004c8f37fd175fc65bf6 |
| muhzain05/GNN-CeramicMap | c9eb1dcc1fbb431c6b3461b4bf6b34d3c6b6e416 |
| muhzain05/kv-transfer-replication | 063f4023fdde67dedbee01a92518ce7f83f6cf5d |
| muhzain05/lag-ladder | e8444944c5698cb64f1065eb7202307221358461 |
| muhzain05/rl-cache-validity | 4ee90476ab025f4063ef51a7c28856f4ede0255b |
| muhzain05/Plantagotchi | d21ad88ac5bd5d5d9c420f266f6301e6a3324a8e |
| muhzain05/EventEase | 226d78f12c4d5b1ab9e5716608f17c4adcde5a53 |
| muhzain05/3D-Ray-Tracer | d9ae183bef488dc4505b1f3f1df23fbdf865ae1a |
| muhzain05/EmotiLog | 9f69e6d5c73c420135930df5785118e505bc0fa0 |

## Artwork provenance

Five covers were generated through **Higgsfield**, using its GPT Image 2.5 model, high quality, 16:9. Art direction: matte espresso, ivory, copper and sage, fine scientific/editorial linework, no invented charts or performance numbers. Delivered as approximately 1200-pixel WebP assets, 18–56 KB each.

| Local asset in public/projects/covers | Source / meaning | Higgsfield job |
| --- | --- | --- |
| molecular.webp | Conceptual water-cluster illustration; a separate, unchanged repository barrier figure is overlaid by CSS | c1b711e8-d142-4480-bf6d-be21298c6e25 |
| equivariant.webp | Conceptual periodic graphs, rotations and spherical-harmonic visual language; not a specific crystal or computed orbital | e7d8d1f1-676f-481e-a194-bb175b0fc64e |
| kv-cache.webp | Conceptual source-cache → linear map → target-cache architecture | 3c6921fa-dc97-40bf-b7a3-134760fbf149 |
| plantagotchi.webp | Reference-based generation preserving the character from public/projects/Plantagotchi_project.png | 85916e7c-f2b4-46c0-9119-442533e627de |
| eventease.webp | Conceptual phone → waitlist → selection → notification workflow; not an actual screenshot | 791460bd-343c-4336-9e01-c6b34bdd5bb5 |
| ray-tracer.webp | Lossless conversion of 3D-Ray-Tracer/assets/FS11.png; genuine render, no generated content | Not generated |

Real figures in `public/projects/figures`:
- `phase2-barrier.webp`: lossless WebP conversion of molecular repository `docs/assets/phase2_barrier.png`.
- `kv-probe.webp`: lossless WebP conversion of cache-transfer repository `results/probe/qwen3-0.6b-to-1.7b/figure2.png`.

Generated covers are explicitly labeled editorial illustrations in case studies. Real figures retain their labels and have source links and full-size access. No numerical result was painted by the image model.

## Verification

- `npm run lint`: passes with zero warnings; repaired existing missing prop declarations and context fast-refresh exports, and corrected the Vite ESM path alias.
- `npm run build`: passes.
- `npm run verify`: validates all six project records, eight articles, project/article relationships, local assets, nonempty alt text, tables, and absence of private repository links.
- Browser: all 14 routes checked, including eight article routes and both unknown-article and unknown-page states. No Vite overlays or page errors; every image decoded.
- Responsive: 1440, 1024, 768, and 390-pixel layouts inspected; no document-level horizontal overflow.
- Accessibility: day and evening checks; home, About, Resume, Blog, and both research article templates scanned with axe. The discovered Resume heading-order issue was fixed and rechecked with zero violations. Symbol-only decorative contrast checks still require visual judgment; inspected visually.
- Navigation: mobile menu, Escape/focus restoration, theme switching, resume accordion keyboard activation, and cross-route Projects anchor checked. Projects lands below the fixed navigation.
- Reduced motion: confirmed media query active, zero lanterns, automatic scrolling, restored native cursor, and no hover transform. Normal evening mode still creates seven desktop lanterns.
- External links: 24 unique GitHub URLs returned HTTP 200. LinkedIn returned 405 to HEAD and 999 to GET, so automated availability remains unverified; the URL matches the bundled resume. No dead GitHub links were found.
- Scientific/research experiments were not rerun. The content audit checks the committed code, documentation, results, and figures; it does not certify those experiments independently.

Changes are local. No commit, push, or deployment was performed. There is no content blocker requiring user input. An updated downloadable resume would be a separate follow-up if desired.

## Homepage restraint revision (October 3, 2026)

Restored the centered personal hero from the original homepage composition: a name-led introduction, one sentence, one work CTA, and a compact UAlberta research status. Desktop navigation again centers the wordmark. The six projects retain their hierarchy and covers under one Selected Work heading; card numbers, categories, notes, plot inset, and secondary repository actions were removed from the homepage. Research figures and repository sources remain in the detailed articles. About now opens with two paragraphs followed by experience and education. Lanterns are dimmer and restricted to the outer margins.

Verification: lint, production build, content verification, and diff whitespace checks pass. Visually inspected desktop day/evening, tablet, mobile hero/work, and mobile About. Mobile menu Escape restores focus; work CTA lands 100px below the top; six project cards remain; no horizontal overflow on checked views. Existing articles, source corrections, artwork files, and resume details were preserved. No deployment performed.
