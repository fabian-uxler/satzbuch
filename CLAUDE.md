# Satzbuch
Offline-Web-App (PWA) zum Tracken von Krafttraining, gehostet auf GitHub Pages
(https://fabian-uxler.github.io/satzbuch/).

- Alles steckt in index.html (HTML, CSS, JS ohne Framework). sw.js ist der Service Worker.
- Daten liegen nur im localStorage des Handys (Schlüssel "satzbuch.v2").
  Datenformat nicht brechen, sonst gehen Trainings verloren.
- Bei jeder Änderung VERSION in sw.js hochzählen, sonst sieht das Handy das Update nicht.
- Trainingsplan: 4 Tage (Torso A/B, Limbs A/B), Übungen mit Gewicht, 3 Sätzen,
  Markierung Steigern/Senken, optional Varianten (z. B. zwei Latzug-Geräte).
- Sprache der Oberfläche: Deutsch.
