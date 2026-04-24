# TODO – kontainer.sh Homepage

## BLOCKER (verhindert Go-Live)

- [ ] **Kontaktformular Platzhalter** – `formspreeEndpoint` in hugo.toml ist `placeholder`. Formular-Submits schlagen fehl. Echte Formspree-ID eintragen oder Alternative (z.B. Netlify Forms, mailto-Fallback).
- [ ] **Blog-Link führt zu 404** – Nav verlinkt auf `/blog/`, Seite existiert nicht. Link entfernen oder Platzhalter-Seite erstellen.
- [ ] **robots.txt fehlt** – Suchmaschinen finden keine Crawling-Anweisungen. `static/robots.txt` erstellen mit Sitemap-Verweis und Disallow für /categories/, /tags/.

## WICHTIG (vor Go-Live fixen)

- [ ] **DSGVO-Mängel in Datenschutzerklärung** – Fehlende Abschnitte: Speicherdauer, Google Fonts als Drittlandsübermittlung, Hosting-Anbieter (Name, DPA), Widerspruchsrecht. Rechtlich relevant.
- [ ] **Open Graph Image fehlt** – Kein `og:image` Tag → Social-Media-Shares (LinkedIn etc.) zeigen kein Thumbnail. Bild erstellen und Meta-Tag ergänzen.
- [ ] **Inline JavaScript → externe Datei** – Hamburger-Menü nutzt `onclick` inline. Kann zu CSP-Problemen führen. In `static/js/main.js` auslagern.
- [ ] **Canonical Tag nur auf Homepage** – Legal-Seiten (Impressum, Datenschutz) haben keinen Canonical Tag. Für alle Seiten setzen.
- [ ] **Heading-Hierarchie** – Homepage hat kein `<h1>` im Template (nur h2/h3). Der H1 ist zwar in der Hero-Section, aber es sollte verifiziert werden dass die Hierarchie korrekt ist.
- [ ] **Farbkontrast prüfen** – `--gray-400` (#94A3B8) auf Weiß könnte WCAG AA Mindestkontrast (4.5:1) nicht erfüllen. Messen und ggf. anpassen.

## NICE-TO-HAVE (nach Go-Live iterieren)

### Visuelles Polish
- [ ] **Mindestens ein Bild** – Seite ist 100% Text+SVG. Foto/Illustration in Erfahrung-Sektion für Vertrauen/Persönlichkeit.
- [ ] **Brand-Keyvisual als Hintergrund-Motiv** – Verschlungene Kreise dezent/halbtransparent in 1-2 Sektionen.
- [ ] **Sektionsübergänge glätten** – Dunkel→Weiß→Grau wechselt hart. Subtile Trennlinien oder Gradient-Overlaps.
- [ ] **Ring-Chart Labels mit Verbindungslinien** – Dünne Linien von Labels zu Segmenten.
- [ ] **Scroll-Animationen** – Fade-in-up bei Scroll für progressive Sichtbarkeit.
- [ ] **Footer erweitern** – Kurze Wiederholung des Value-Prop.
- [ ] **Ring-Chart Segmente animiert einlaufen** – Beim ersten Sichtbar-werden.
- [ ] **Erfahrung-Sektion Hintergrund** – Dezentes Foto oder Pattern.
- [x] **Hover-Effekte** – Feature-Items, Report-Card, Tech-Tags, Problem-Items.
- [x] **Report-Card aufwerten** – Box-Shadow, Zeilentrenner, größere Severity-Dots.
- [x] **Problem-Sektion visuell auflockern** – Farbige Heading-Underlines, größere Indikatoren, Result-Items mit Border.

### Technisch
- [ ] **Dark-Mode Support** – Seite ist eh halb-dunkel, vollständiger Dark-Mode wäre wenig Aufwand.
- [ ] **Sitemap bereinigen** – /categories/ und /tags/ aus sitemap.xml ausschließen (leere Hugo-Defaults).
- [ ] **Keyboard-Navigation Hamburger-Menü** – onclick ist nicht keyboard-zugänglich, Enter/Escape-Handler ergänzen.
- [ ] **Formular UX** – Client-side Validierung, Lade-Spinner, Erfolgs-/Fehlermeldung.

## Erledigt

### Mockup-Umsetzung
- [x] Ring-Chart mit 4 Prozess-Labels (ERFASSEN/BEWERTEN/EMPFEHLEN/VERSTEHEN)
- [x] Kompletter Textrewrite nach OCR-Extraktion
- [x] 3-Spalten Problem-Sektion (Für wen? / Das Problem / Unser Ergebnis)
- [x] Beispiel-Report Card mit Top-Risiken und Top-Maßnahmen
- [x] Kundenzitat + Technologie-Tags in Erfahrung-Sektion
- [x] Trust-Indikatoren (Vertraulich, 48-72h, kein Produktionszugriff)
- [x] Kontinuierliche Begleitung (optional) Subsection

### Brand Guide (CI/CD)
- [x] Schrift: Titillium Web
- [x] Farben: #54FFE3 (Neon-Türkis), #2B3040 (Dunkelblau)
- [x] Logo: KONTAINER.SH PNG (horizontal negativ) auf allen Seiten
- [x] Favicon: Brand-konform (.svg + .ico)

### Funktionalität
- [x] Kontaktformular (Formspree-ready, Platzhalter-Action)
- [x] Mobile Hamburger-Menü
- [x] Anker-Links vollständig
- [x] SEO Meta-Tags, OG, Twitter-Card
- [x] Accessibility (aria-labels, aria-hidden)
- [x] Responsive auf allen Breakpoints (375–1440px)
- [x] Automatisiertes Prüfskript (check.mjs, 59 Checks)
- [x] Hugo-Migration mit eigenem Theme "kontainersh"

### Firmendaten
- [x] Impressum mit echten Daten (KONTAINER.SH GmbH, HRB 725522)
- [x] Datenschutzerklärung DSGVO-konform (Basis)
- [x] Social-Media-Links (GitHub, LinkedIn) korrekt
- [x] E-Mail: info@kontainer.sh
- [x] AGB-Seite entfernt (nicht vorgesehen)
