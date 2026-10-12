import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/projects", ...projects.map((p) => `/projects/${p.slug}`), "/about", "/contact"];
  return paths.map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
}
