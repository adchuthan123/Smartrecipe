# Bewertungs- und Kommentar-System

## Übersicht
Das Bewertungs- und Kommentar-System ermöglicht es Benutzern, Rezepte mit 1-5 Sternen zu bewerten und Kommentare abzugeben.

## Implementierte Features

### 1. Datenmodell (MongoDB Collection "ratings")
**Felder:**
- `_id` - Eindeutige ID (MongoDB ObjectId)
- `recipeId` - Referenz auf das Rezept (String)
- `userId` - Optional, Referenz auf den Benutzer (null für anonyme Bewertungen)
- `stars` - Bewertung von 1-5 (Integer)
- `comment` - Kommentartext (String)
- `createdAt` - Zeitstempel (Date)

### 2. Datenbank-Funktionen (`src/lib/db.js`)

#### `getRatingsForRecipe(recipeId)`
Lädt alle Bewertungen für ein bestimmtes Rezept, sortiert nach Datum (neueste zuerst).

**Rückgabe:** Array von Rating-Objekten

#### `createRating(rating)`
Erstellt eine neue Bewertung und aktualisiert automatisch die Durchschnittsbewertung des Rezepts.

**Parameter:**
```javascript
{
  recipeId: String,
  userId: String | null,
  stars: Number (1-5),
  comment: String
}
```

**Validierung:**
- Stars müssen zwischen 1 und 5 liegen
- recipeId ist erforderlich

**Rückgabe:** ID der neuen Bewertung oder null bei Fehler

#### `getAverageRatingForRecipe(recipeId)`
Berechnet die Durchschnittsbewertung und Anzahl der Bewertungen für ein Rezept mittels MongoDB Aggregation.

**Rückgabe:**
```javascript
{
  average: Number (auf 1 Dezimalstelle gerundet),
  count: Number
}
```

#### `updateRecipeAverageRating(recipeId)`
Aktualisiert das `rating`-Feld im Rezept-Dokument mit dem aktuellen Durchschnitt.

### 3. Rezept-Detailseite

#### Server-Seite (`src/routes/Rezepte/[rezepte_id]/+page.server.js`)

**Load-Funktion:**
- Lädt das Rezept
- Lädt alle Bewertungen für das Rezept

**Actions:**
- `delete` - Löscht das Rezept
- `addRating` - Fügt eine neue Bewertung hinzu
  - Validiert Sterneanzahl (1-5)
  - Erstellt Bewertung in DB
  - Gibt Erfolg oder Fehler zurück

#### Client-Seite (`src/routes/Rezepte/[rezepte_id]/+page.svelte`)

**Bewertungs-Zusammenfassung:**
- Zeigt durchschnittliche Bewertung groß an
- Zeigt Anzahl der Bewertungen
- Visuelle Darstellung mit Sternen

**Bewertungsformular:**
- 5-Sterne-Auswahl (Radio Buttons mit visueller Darstellung)
- Optionales Kommentarfeld
- Submit-Button
- Validierung (mindestens 1 Stern erforderlich)

**Bewertungsliste:**
- Zeigt alle vorhandenen Bewertungen
- Jede Bewertung zeigt:
  - Sterne-Anzahl
  - Datum (formatiert als DD.MM.YYYY)
  - Kommentar (falls vorhanden)
- Nachricht wenn keine Bewertungen vorhanden

### 4. Rezept-Übersicht

#### RecipeCard-Komponente (`src/lib/components/Recipecard.svelte`)
- Zeigt Durchschnittsbewertung als Stern + Zahl
- Zeigt Anzahl der Bewertungen in Klammern (z.B. "⭐ 4.3 (12)")
- Styling: Gelbe Farbe für Sterne, graue Farbe für Anzahl

#### Übersichtsseiten
- `/Rezepte` - Zeigt alle Rezepte mit ihren Bewertungen
- `/favorites` - Zeigt favorisierte Rezepte mit ihren Bewertungen

## Verwendung

### Bewertung abgeben:
1. Gehe auf die Detailseite eines Rezepts
2. Scrolle zur Bewertungs-Sektion
3. Wähle 1-5 Sterne aus
4. Optional: Schreibe einen Kommentar
5. Klicke auf "Bewertung absenden"
6. Die Seite wird automatisch aktualisiert

### Bewertungen ansehen:
- **Übersicht:** Jede Rezeptkarte zeigt den Durchschnitt
- **Detail:** Alle Bewertungen und Kommentare werden angezeigt

## Technische Details

### Error Handling
- Validierung der Sterneanzahl (1-5)
- Try-Catch-Blöcke in allen DB-Funktionen
- Fehler werden in die Konsole geloggt
- Benutzerfreundliche Fehlermeldungen

### Performance
- MongoDB Aggregation für effiziente Durchschnittsberechnung
- Sortierung direkt in der Datenbank
- Minimale Datenübertragung

### Sicherheit
- Server-seitige Validierung
- Prepared Statements durch MongoDB Driver
- Input-Sanitization durch FormData

## Zukünftige Erweiterungen

### Mögliche Features:
- Benutzer-Authentifizierung (userId)
- Bewertungen editieren/löschen
- Bewertungen als hilfreich markieren
- Bilder zu Kommentaren hinzufügen
- Antworten auf Kommentare
- Sortierung der Bewertungen (neueste, beste, etc.)
- Filter in der Übersicht nach Bewertung

## Styling

### Farbschema:
- Sterne: `#ffc107` (Gelb)
- Submit-Button: `#28a745` (Grün)
- Hintergründe: `#f8f9fa` (Hellgrau)
- Karten: `white` mit leichten Schatten

### Responsive Design:
- Mobile-optimiert
- Angepasste Padding/Margins für kleinere Bildschirme
- Touch-freundliche Button-Größen

## Testing

### Manuell testen:
```powershell
cd C:\Users\adsay\Smartrecipe
npm run dev
```

1. Öffne http://localhost:5173
2. Gehe zu einem Rezept
3. Füge eine Bewertung hinzu
4. Prüfe, ob der Durchschnitt aktualisiert wurde
5. Gehe zur Übersicht und prüfe die Anzeige

### Zu testende Szenarien:
- ✅ Bewertung mit nur Sternen (ohne Kommentar)
- ✅ Bewertung mit Sternen und Kommentar
- ✅ Mehrere Bewertungen für ein Rezept
- ✅ Durchschnittsberechnung mit verschiedenen Sternen
- ✅ Anzeige in der Übersicht
- ✅ Formular-Validierung (Versuch ohne Sterne abzusenden)

## Fehlerbehebung

### Problem: Bewertungen werden nicht angezeigt
- Prüfe MongoDB-Verbindung
- Prüfe Console für Fehler
- Stelle sicher, dass `data.ratings` korrekt geladen wird

### Problem: Durchschnitt wird nicht aktualisiert
- Prüfe, ob `updateRecipeAverageRating` aufgerufen wird
- Prüfe MongoDB-Logs
- Stelle sicher, dass die Aggregation funktioniert

### Problem: Formular sendet nicht ab
- Prüfe Browser-Console für JavaScript-Fehler
- Stelle sicher, dass mindestens 1 Stern ausgewählt ist
- Prüfe Network-Tab für Serverantwort
