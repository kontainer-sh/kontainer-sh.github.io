# CLAUDE.md – Projektregeln für kontainer.sh Homepage

## Projekt

Hugo-Seite mit eigenem Theme "kontainersh". Gebaut mit `hugo`, Dev-Server mit `hugo server`.

## Wichtige Regeln

### Keine eigenmächtigen Änderungen
- **Texte, Layout und Struktur NICHT ohne Rücksprache ändern.** Die Inhalte basieren auf einem OCR-extrahierten Mockup und dem CI/CD Brand Guide.
- Neue Sektionen, Texte oder Umstrukturierungen immer erst vorschlagen und bestätigen lassen.

### Brand Guide (CI/CD)
- Schrift: **Titillium Web** (Google Fonts)
- Primärfarbe: **#54FFE3** (Neon-Türkis)
- Dunkel: **#2B3040**
- Logo: KONTAINER.SH Logo-PNG aus `themes/kontainersh/static/images/`
- Keine anderen Farben für Akzente verwenden ohne Rücksprache.

### Nach jeder Änderung prüfen
Führe nach HTML/CSS-Änderungen das Prüfskript aus:
```bash
hugo && node check.mjs
```
Das Skript prüft automatisch:
- Hugo baut fehlerfrei
- Keine toten internen Links
- Alle 4 Ring-Chart Labels sichtbar (ERFASSEN, BEWERTEN, EMPFEHLEN, VERSTEHEN)
- Kein horizontaler Overflow auf allen Breakpoints (375px, 768px, 1024px, 1440px)
- Seitenränder (min 24px padding) bleiben erhalten
- Texte überlappen nicht mit Grafiken
- Ring-Chart Center-Text ist zentriert
- Responsive: Alle Sektionen sichtbar auf allen Breakpoints

### Commit-Stil
- Deutsche Commit-Messages
- Kurz und präzise, "was" und "warum"
- Co-Authored-By Zeile am Ende

## Dateistruktur

```
hugo.toml                    # Hugo-Konfiguration
content/                     # Markdown-Inhalte
  _index.md                  # Homepage (Template-gesteuert)
  impressum.md               # Legal (type: "legal")
  datenschutz.md             # Legal (type: "legal")
themes/kontainersh/
  layouts/
    index.html               # Homepage-Template
    _default/baseof.html     # Basis-Layout
    _default/single.html     # Legal-Seiten
    partials/                # head, header, footer, ring-chart
  static/
    css/main.css             # Gesamtes CSS
    images/                  # Logo-PNGs, Favicon
```

## Offene Punkte (TODO.md)
- blog.html fehlt (Nav-Link ohne Ziel)
- Formspree-Endpoint ist Platzhalter
