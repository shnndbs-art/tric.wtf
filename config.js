// ============================================================
//  CONFIG — modifica solo questo file per personalizzare tric.wtf
// ============================================================
const CONFIG = {

  username: "tric",
  tagline: "sviluppatore • gamer • tric.wtf",

  // URL immagine avatar (usa un link diretto a un'immagine, es. da imgur/discord CDN)
  avatar: "https://i.imgur.com/8Km9tLL.png",

  // badge sotto al nome (max consigliato: 4)
  badges: [
    { label: "owner", style: "accent" },
    { label: "online", style: "accent-2" },
    { label: "est. 2026", style: "" }
  ],

  // musica di sottofondo (link diretto a un file .mp3/.ogg, opzionale)
  music: {
    enabled: true,
    src: "",              // es: "music.mp3" (metti il file nella stessa cartella)
    title: "now playing — nome brano",
    autoplay: true,       // parte dopo il click sul gate (i browser bloccano l'autoplay senza interazione)
    volume: 0.4
  },

  // contatore visite: "local" (solo nel browser di chi visita) o "off"
  viewCounter: "local",

  // link social/contatti mostrati come bottoni
  links: [
    {
      label: "Discord",
      url: "https://discord.gg/",
      icon: "discord"
    },
    {
      label: "Instagram",
      url: "https://instagram.com/",
      icon: "instagram"
    },
    {
      label: "Twitter / X",
      url: "https://x.com/",
      icon: "twitter"
    },
    {
      label: "GitHub",
      url: "https://github.com/",
      icon: "github"
    },
    {
      label: "Sito personale",
      url: "https://tric.wtf",
      icon: "link"
    }
  ]
};
