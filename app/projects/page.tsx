import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";
import { ExternalLink } from "@/components/Icons";
import { SpotlightCard } from "@/components/SpotlightCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Detailed breakdown of my projects and their tech stacks."
};

const projectDetails: Record<string, { overview: string; keyFeatures: string[] }> = {
  "Codedamn Portfolio Page": {
    overview: "A dynamic profile platform for developers to showcase their skills and projects. Built with modern web technologies for optimal performance and user experience.",
    keyFeatures: [
      "Server-side rendering with Next.js for fast initial loads",
      "Type-safe database queries with Kysely ORM",
      "PostgreSQL for robust data persistence",
      "Responsive design with Tailwind CSS",
      "Interactive UI components with React",
    ],
  },
  "Codedamn Landing Page": {
    overview: "A pixel-perfect recreation of the Codedamn landing page featuring smooth animations and scroll effects. Demonstrates proficiency with animation libraries and modern UI patterns.",
    keyFeatures: [
      "Smooth scroll and entrance animations with Framer Motion",
      "Optimized performance with Next.js Image component",
      "Responsive design across all devices",
      "Interactive hover states and transitions",
      "Mobile-first development approach",
    ],
  },
  "nvnt.in": {
    overview: "My personal portfolio site. A lightweight, server-rendered site with advanced features like theme switching, command palette, and custom animations. Built to showcase frontend excellence without unnecessary bloat.",
    keyFeatures: [
      "Next.js 16 for cutting-edge features and performance",
      "React 19 with latest hooks and patterns",
      "Tailwind CSS v4 for utility-first styling",
      "Motion library for smooth animations",
      "Command menu (⌘K) for quick navigation",
      "Dark/light theme with view transitions",
      "Zero image assets, pure CSS/HTML",
      "Server-rendered pages for optimal SEO",
    ],
  },
};

export default function Projects() {
  return (
    <div className="pt-16 sm:pt-24">
      <Reveal>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-pretty text-muted">
          A closer look at the projects I&apos;ve built. Each one is a learning journey with different challenges and tech stacks.
        </p>
      </Reveal>

      <div className="mt-12 space-y-12">
        {projects.map((project, i) => {
          const details = projectDetails[project.title] || {
            overview: project.description,
            keyFeatures: [],
          };
          const primary = project.live ?? project.source;

          return (
            <Reveal key={project.title} delay={i * 0.08} className="group">
              <SpotlightCard className="overflow-hidden">
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        {primary ? (
                          <a
                            href={primary}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-fg hover:text-accent transition-colors"
                          >
                            {project.title}
                            <ExternalLink className="size-4" />
                          </a>
                        ) : (
                          project.title
                        )}
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-fg/10 px-4 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-fg/20"
                        >
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Live
                        </a>
                      )}
                      {project.source && (
                        <a
                          href={project.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-fg/30 hover:text-fg"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-4 leading-relaxed text-muted">{details.overview}</p>

                  <div className="mt-6">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Tech Stack</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.map((tech, idx) => (
                        <li
                          key={tech}
                          className="rounded-md bg-fg/[0.05] px-3 py-1.5 font-mono text-xs text-fg/80 hover:bg-fg/10 transition-colors cursor-default"
                          style={{
                            animation: `slideIn 0.4s ease-out ${idx * 0.05}s both`,
                          }}
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {details.keyFeatures.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Key Features</h3>
                      <ul className="mt-3 space-y-2">
                        {details.keyFeatures.map((feature, idx) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 text-sm text-muted/90 hover:text-fg transition-colors"
                            style={{
                              animation: `slideIn 0.4s ease-out ${idx * 0.05 + 0.1}s both`,
                            }}
                          >
                            <span className="mt-1.5 size-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.4} className="mt-16 rounded-lg border border-line bg-card/30 p-6 sm:p-8">
        <p className="text-sm text-muted">
          Most of my day-to-day work is client projects under NDA. Happy to discuss the architecture, decisions, and challenges in a conversation.{" "}
          <Link href="/contact" className="font-medium text-fg hover:text-accent transition-colors">
            Get in touch →
          </Link>
        </p>
      </Reveal>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
