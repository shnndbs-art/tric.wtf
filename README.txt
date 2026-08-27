tric.wtf — biolink page
========================

COS'È
Sito statico in stile "biolink" (come guns.lol / linktr.ee ma con più
personalità): profilo, badge, link social, player musicale, contatore
visite, effetti glitch/CRT. Grafica originale, non copiata da altri siti.

FILE
- index.html   -> struttura della pagina (di solito non serve toccarlo)
- style.css    -> tutto lo stile visivo (colori, font, animazioni)
- config.js    -> QUI personalizzi contenuti (nome, avatar, link, musica...)
- script.js    -> logica (non serve modificarlo)

COME PERSONALIZZARE
Apri config.js con un editor di testo e modifica:
  - username / tagline
  - avatar: link diretto a un'immagine (finisce in .png/.jpg/.webp)
  - badges: etichette sotto al nome
  - music.src: link a un file mp3 (puoi anche mettere un file "music.mp3"
    nella stessa cartella e scrivere src: "music.mp3")
  - links: i tuoi bottoni social (icone disponibili: discord, instagram,
    twitter, github, link)

Cambia i colori principali modificando le variabili in cima a style.css:
  --accent   (magenta di default)
  --accent-2 (ciano di default)
  --bg       (sfondo)

DEPLOY SU NETLIFY (drag & drop, nessun account tecnico richiesto)
1. Vai su https://app.netlify.com
2. Registrati / accedi (gratis)
3. Nella dashboard cerca la sezione "Sites" -> in basso c'è un riquadro
   tratteggiato "Drag and drop your site output folder here"
4. Trascina l'INTERA cartella "tric-wtf" (quella con dentro index.html)
   in quel riquadro
5. Netlify carica il sito e ti dà un link tipo random-name-123.netlify.app
6. Per usare il dominio tric.wtf:
   - comprilo su un registrar (es. Namecheap, Cloudflare, Porkbun...)
   - su Netlify: Site settings -> Domain management -> Add a domain
   - segui le istruzioni per puntare i DNS del dominio a Netlify
     (di solito record A/ALIAS + CNAME, Netlify te li mostra dopo
     aver aggiunto il dominio)

NOTE
- Il contatore visite è "locale": conta le visite nel browser di ogni
  singola persona (salvato con localStorage), non è un contatore globale
  condiviso tra tutti i visitatori. Se vuoi un contatore vero e globale
  serve un piccolo backend/database — dimmelo se lo vuoi e te lo aggiungo.
- Alcuni browser bloccano la riproduzione automatica dell'audio finché
  l'utente non interagisce: per questo c'è la schermata "clicca per
  entrare" prima della pagina vera e propria.
