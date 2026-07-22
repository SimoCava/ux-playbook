import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

// https://astro.build/config
export default defineConfig({
  // Repo di progetto su GitHub Pages: https://SimoCava.github.io/ux-playbook/
  site: 'https://SimoCava.github.io',
  base: '/ux-playbook',
  integrations: [
    starlight({
      title: 'Linee guida web',
      tagline: 'Conversioni mobile -> desktop',
      description:
        'Regole, non suggerimenti. Ogni voce chiude il dubbio prima che diventi discussione.',
      logo: {
        light: './src/assets/logo-light.png',
        dark: './src/assets/logo-dark.png',
        alt: 'RuneLab',
        replacesTitle: true,
      },
      // Font e token Valhalla su Lucode.
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      plugins: [
        lucode({
          // Navbar accanto al logo: stesse macro-sezioni della sidebar.
          navLinks: [
            { label: 'Introduzione', link: '/' },
            { label: 'Mobile → Web', link: '/mobile-web/bottom-sheet/' },
            { label: 'Fondamentali', link: '/fondamentali/breakpoint/' },
            { label: 'Regole UX', link: '/regole-ux/conferma-vs-undo/' },
          ],
        }),
      ],
      head: [
        {
          // La sidebar di Lucode (.container-sidebar) non usa il
          // meccanismo nativo di Starlight che ricorda lo scroll tra una
          // pagina e l'altra: lo si reimplementa qui via sessionStorage.
          tag: 'script',
          content: `(function () {
  var KEY = 'vh-sidebar-scroll';
  function restore() {
    var el = document.querySelector('.container-sidebar');
    if (!el) return;
    var saved = sessionStorage.getItem(KEY);
    if (saved !== null) el.scrollTop = parseInt(saved, 10) || 0;
    el.addEventListener('scroll', function () {
      sessionStorage.setItem(KEY, String(el.scrollTop));
    }, { passive: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', restore);
  } else {
    restore();
  }
})();`,
        },
      ],
      sidebar: [
        {
          label: 'Introduzione',
          items: [
            { label: 'Panoramica', link: '/' },
            { label: 'Sito vetrina vs webapp', link: '/introduzione/vetrina-vs-webapp/' },
          ],
        },
        { label: 'Mobile → Web', items: [{ autogenerate: { directory: 'mobile-web' } }] },
        { label: 'Fondamentali', items: [{ autogenerate: { directory: 'fondamentali' } }] },
        { label: 'Regole UX', items: [{ autogenerate: { directory: 'regole-ux' } }] },
      ],
    }),
  ],
});
