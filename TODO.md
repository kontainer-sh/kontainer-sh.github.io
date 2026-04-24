# TODO – kontainer.sh Homepage

## Offen – Funktionalität

- [ ] **blog.html fehlt** – Im Nav verlinkt, Seite existiert nicht. Platzhalter oder Link entfernen.
- [ ] **Kontaktformular Platzhalter** – Formspree-Action ist `placeholder`, Formular funktioniert nicht produktiv. Echte Formspree-ID oder Alternative nötig.

## Offen – Visuelles Polish (Prio hoch → niedrig)

### Hoher Impact
- [ ] **Hover-Effekte** – Feature-Items, Report-Card, Tech-Tags, Nav-Links reagieren nicht auf Hover. Subtile Transitions (Lift, Border-Color, Hintergrund-Shift).
- [ ] **Report-Card aufwerten** – Box-Shadow, Zeilentrenner, Severity-Badges (rot/gelb/grün) vor Risiken.
- [ ] **Problem-Sektion visuell auflockern** – Farbige Dots zu klein (8px), größere Icons oder Akzente bei Spalten-Headings.
- [ ] **Mindestens ein Bild** – Seite ist 100% Text+SVG. Foto/Illustration in Erfahrung-Sektion für Vertrauen/Persönlichkeit.

### Mittlerer Impact
- [ ] **Brand-Keyvisual als Hintergrund-Motiv** – Verschlungene Kreise dezent/halbtransparent in 1-2 Sektionen.
- [ ] **Sektionsübergänge glätten** – Dunkel→Weiß→Grau wechselt hart. Subtile Trennlinien oder Gradient-Overlaps.
- [ ] **Ring-Chart Labels mit Verbindungslinien** – Dünne Linien von Labels zu Segmenten wie bei Infografiken.
- [ ] **Scroll-Animationen** – Fade-in-up bei Scroll für progressive Sichtbarkeit.

### Nice-to-have
- [ ] **Footer erweitern** – Kurze Wiederholung des Value-Prop.
- [ ] **Ring-Chart Segmente animiert einlaufen** – Beim ersten Sichtbar-werden.
- [ ] **Erfahrung-Sektion Hintergrund** – Dezentes Foto oder Pattern.
- [ ] **Dark-Mode Support** – Seite ist eh halb-dunkel, vollständiger Dark-Mode wäre wenig Aufwand.

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

### Firmendaten
- [x] Impressum mit echten Daten (KONTAINER.SH GmbH, HRB 725522)
- [x] Datenschutzerklärung DSGVO-konform
- [x] Social-Media-Links (GitHub, LinkedIn) korrekt
- [x] E-Mail: info@kontainer.sh
- [x] AGB-Seite entfernt (nicht vorgesehen)
