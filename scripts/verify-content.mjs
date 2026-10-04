import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { projects, otherProjects } from "../src/data/projects.js";
import { blogPosts } from "../src/data/blogPosts.js";

const ids = new Set(blogPosts.map((post) => post.id));
assert.equal(ids.size, blogPosts.length, "Article IDs must be unique");
assert.equal(
  new Set(projects.map((project) => project.id)).size,
  projects.length,
  "Project IDs must be unique",
);
const asset = (path) =>
  assert.ok(
    path.startsWith("/") && existsSync(resolve("public", path.slice(1))),
    `Missing asset: ${path}`,
  );
for (const project of [...projects, ...otherProjects]) {
  assert.ok(
    ids.has(project.blogUrl.replace("/blog/", "")),
    `Missing case study: ${project.title}`,
  );
  if (project.image) {
    asset(project.image);
    assert.ok(project.imageAlt?.length > 20);
  }
  if (project.figure) {
    asset(project.figure);
    assert.ok(project.figureAlt);
  }
  assert.ok(
    !/GNN-ML-Model|GNN_private|LSTM-Time-Series/.test(project.githubUrl || ""),
    "Private repositories must not be linked",
  );
}
const urls = new Set(
  projects
    .flatMap((project) => [project.githubUrl, project.demoUrl])
    .filter(Boolean),
);
for (const post of blogPosts) {
  if (post.projectId)
    assert.ok(
      projects.some((project) => project.id === post.projectId),
      `Unknown project for ${post.id}`,
    );
  assert.ok(
    post.sections.length && post.takeaways.length && post.sources.length,
  );
  for (const section of post.sections) {
    assert.ok(
      section.heading &&
        section.body.every(
          (paragraph) => typeof paragraph === "string" && paragraph.length > 0,
        ),
    );
    if (section.figure) {
      asset(section.figure.src);
      urls.add(section.figure.source);
    }
    if (section.table)
      assert.ok(
        section.table.rows.every(
          (row) => row.length === section.table.headers.length,
        ),
      );
  }
  for (const [, url] of post.sources) {
    assert.equal(new URL(url).protocol, "https:");
    urls.add(url);
  }
}
const config = JSON.parse(readFileSync("src/config.json", "utf8"));
urls.add(config.github);
urls.add(config.linkedin);
assert.ok(
  !readFileSync("src/components/Navbar.jsx", "utf8").includes("PLACEHOLDER"),
);
console.log(
  `PASS: ${projects.length} projects, ${blogPosts.length} articles, all local media and cross-links.`,
);
if (process.argv.includes("--external")) {
  const pending = [...urls];
  const results = [];
  await Promise.all(
    Array.from({ length: 4 }, async () => {
      while (pending.length) {
        const url = pending.shift();
        try {
          const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            signal: AbortSignal.timeout(15000),
          });
          results.push({
            url,
            status: response.status,
            finalUrl: response.url,
          });
        } catch (error) {
          results.push({ url, status: "unverified", reason: error.message });
        }
      }
    }),
  );
  console.log(JSON.stringify(results, null, 2));
  if (results.some((result) => result.status === 404 || result.status === 410))
    process.exitCode = 1;
}
