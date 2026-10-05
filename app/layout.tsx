import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CommandMenu } from "@/components/CommandMenu";
import { Background } from "@/components/Background";
import { DotRain } from "@/components/DotRain";
import { EasterEggs } from "@/components/EasterEggs";
import { site } from "@/lib/data";
import { themeScript } from "@/lib/theme";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s · ${site.name}` },
  description: site.intro,
  openGraph: { type: "website", siteName: site.name, url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4f0" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col overflow-x-clip bg-bg font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only z-[70] rounded-md bg-fg px-3 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Background />
        <Nav />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 pb-28 sm:px-6">
          {children}
        </main>
        <Footer />
        <CommandMenu />
        <DotRain />
        <EasterEggs />
      </body>
    </html>
  );
}
