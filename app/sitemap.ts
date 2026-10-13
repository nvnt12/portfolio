import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";
import { notes } from "@/lib/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/projects",
    ...projects.map((p) => `/projects/${p.slug}`),
    "/notes",
    ...notes.map((n) => `/notes/${n.slug}`),
    "/about",
    "/contact",
  ];
  return paths.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
}
