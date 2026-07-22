# Linee guida web - Design system Valhalla

Documentazione delle regole di comportamento UX/UI per i progetti web (design
system **Valhalla**), costruita con [Astro Starlight](https://starlight.astro.build).
Il branding in navbar e' **RuneLab** (l'azienda); Valhalla e' il design system
che queste regole descrivono.

Contiene le 36 regole di conversione mobile -> desktop, una regola per pagina,
raggruppate per categoria nella sidebar.

## Avvio

Serve Node.js 18+.

```bash
npm install
npm run dev
```

Apri l'URL indicato nel terminale (di solito http://localhost:4321).
Per la build statica: `npm run build`, anteprima con `npm run preview`.

## Dove mettere le mani

### Colori del brand RuneLab
Tutto il tema passa da `src/styles/custom.css`. In cima trovi il blocco
"TEMA VALHALLA -> variabili Starlight": sostituisci i valori placeholder con i
token del design system Valhalla (ogni riga dice quale token va inserito). Ci sono due
blocchi, uno per il tema dark e uno per il light. Non aggiungere colori altrove.

### Loghi
`src/assets/logo-light.svg` e `logo-dark.svg` sono placeholder. Sostituiscili con
i loghi RuneLab (light usato in tema chiaro, dark in tema scuro).

### Font
Un solo font, Figtree, caricato via Fontsource e impostato come `--sl-font` in
`custom.css`. Nessun monospace.

### Immagini / wireframe
Ogni "Esempi corretti" e "Anti-pattern" ha un placeholder `<Figure>` al posto
dell'immagine. Le wireframe vere si creano in Claude Design e si inseriscono al
posto dei placeholder. Il componente e' in `src/components/Figure.astro`; i
bullet sotto ogni placeholder sono la specifica di cosa deve mostrare l'immagine
(coppie Mobile / Desktop e Corretto / Errato).

## Struttura contenuti

```
src/content/docs/
  index.mdx                 <- introduzione (come leggere, convenzioni, valori)
  00-componenti/
  01-container-overlay/
  02-conferme-feedback/
  03-navigazione/
  04-form-input/
  05-liste-tabelle-dati/
  06-interazione-hover/
  07-breakpoint-tablet/
  08-layout-lettura/
```

Ogni file MDX e' una regola. Le sezioni interne (Regola, Perché, Ma io pensavo,
Esempi corretti, Anti-pattern, In una riga) sono heading `##`: alimentano il
sommario "In questa pagina" sulla destra.

La sidebar e la ricerca (Pagefind, scorciatoia Cmd/Ctrl + K) sono gestite da
Starlight. Il raggruppamento e l'ordine si configurano in `astro.config.mjs`.
