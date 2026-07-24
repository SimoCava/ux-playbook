import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import lucode from 'lucode-starlight';

// Repo di progetto su GitHub Pages: https://SimoCava.github.io/ux-playbook/
const SITE_BASE = '/ux-playbook';

// https://astro.build/config
export default defineConfig({
  site: 'https://SimoCava.github.io',
  base: SITE_BASE,
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
      // Sidebar "scoped": mostra solo il gruppo della sezione corrente
      // (vedi src/components/Sidebar.astro). Impostandolo qui, lucode()
      // salta il proprio override e delega a questo componente, che a sua
      // volta rende quello di Lucode dopo aver filtrato i gruppi.
      components: {
        Sidebar: './src/components/Sidebar.astro',
      },
      plugins: [
        lucode({
          // Navbar accanto al logo: stesse macro-sezioni della sidebar.
          // La home ("/") e' la pagina splash, fuori da ogni sezione: la
          // voce "Introduzione" punta alla prima pagina vera della sezione.
          navLinks: [
            { label: 'Introduzione', link: '/introduzione/panoramica/' },
            { label: 'Mobile → Web', link: '/mobile-web/cosa-esiste-dove/' },
            { label: 'Regole UX', link: '/regole-ux/conferma-vs-undo/' },
            { label: 'Principi', link: '/principi/quanto-interrompe/' },
            { label: 'Misure', link: '/misure/breakpoint/' },
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
        {
          // La navbar di Lucode marca "active" solo la voce il cui href
          // coincide esattamente con la pagina corrente: dato che ogni
          // voce punta alla prima pagina della sua sezione, su tutte le
          // altre pagine della stessa sezione nessuna voce risultava
          // selezionata. Si ricalcola qui confrontando il primo segmento
          // di path dopo il base path (comune a tutte le pagine di una
          // sezione). La home ("/") non matcha nessuna sezione: corretto,
          // e' la pagina splash, non fa parte di nessun gruppo.
          tag: 'script',
          content: `(function () {
  var BASE_PATH = ${JSON.stringify(SITE_BASE)};
  function segment(pathname) {
    var norm = pathname.replace(/\\/+$/, '');
    var rest = norm.indexOf(BASE_PATH) === 0 ? norm.slice(BASE_PATH.length) : norm;
    return rest.split('/').filter(Boolean)[0] || '';
  }
  function update() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav-bar a'));
    if (!links.length) return;
    var currentSegment = segment(location.pathname);
    var matchIndex = links.findIndex(function (a) {
      var href = new URL(a.getAttribute('href'), location.origin).pathname;
      return segment(href) === currentSegment;
    });
    links.forEach(function (a, i) {
      a.classList.toggle('active', i === matchIndex);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
})();`,
        },
      ],
      sidebar: [
        {
          label: 'Introduzione',
          items: [
            { label: 'Panoramica', link: '/introduzione/panoramica/' },
            { label: 'Sito vetrina vs webapp', link: '/introduzione/vetrina-vs-webapp/' },
          ],
        },
        { label: 'Mobile → Web', items: [{ autogenerate: { directory: 'mobile-web' } }] },
        { label: 'Regole UX', items: [{ autogenerate: { directory: 'regole-ux' } }] },
        { label: 'Principi', items: [{ autogenerate: { directory: 'principi' } }] },
        { label: 'Misure', items: [{ autogenerate: { directory: 'misure' } }] },
      ],
    }),
  ],
});
