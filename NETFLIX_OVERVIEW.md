# Netflix-Style Recipe Overview

Diese Komponenten implementieren eine Netflix-ähnliche Rezept-Übersicht für deine SmartRecipe-App.

## 🎬 Komponenten

### 1. **RecipeRow.svelte**
Eine horizontal scrollbare Reihe von Rezept-Karten.

**Props:**
- `title` (string) - Titel der Reihe, z.B. "Beliebte Rezepte"
- `recipes` (Recipe[]) - Array von Rezepten zum Anzeigen
- `seeAllHref` (string, optional) - Link zum "Alle anzeigen" Button

**Features:**
- 🎯 Horizontales Scrollen mit Touch/Maus-Unterstützung
- ⬅️ ➡️ Optional: Scroll-Pfeile auf Desktop (verborgen auf Mobile)
- 📱 Responsive: 220-240px Karten-Breite
- ✨ Smooth Scroll Animation

**Verwendung:**
```svelte
<RecipeRow 
  title="🔥 Beliebte Rezepte" 
  recipes={popularRecipes}
  seeAllHref="/Rezepte"
/>
```

---

### 2. **RecipesHomePage.svelte**
Die Hauptseite mit mehreren RecipeRow-Komponenten.

**Props:**
- `recipes` (Recipe[]) - Array von allen Rezepten

**Features:**
- 📊 Automatische Kategorisierung:
  - Beliebte (nach Bewertungsanzahl sortiert)
  - Top bewertet (nach durchschnittlicher Bewertung)
  - Vegan
  - Vegetarisch
  - Schnell & einfach (≤20 Min, <5 Schritte)
  - Kalorienarm (≤400 kcal)
  - Proteinreich (≥25g)
- 🔍 Suchleiste (Placeholder)
- 📱 Vollständig responsive

**Verwendung:**
```svelte
<RecipesHomePage recipes={allRecipes} />
```

---

### 3. **Updated: Rezepte +page.svelte**
Die Rezepte-Seite mit **zwei Ansichten**:

#### 🏠 **Home-Ansicht** (Standard)
Netflix-Style Übersicht mit horizontalen Reihen.

#### 🔍 **Filter-Ansicht**
Traditionelle Filter & Such-Interface mit:
- Kategorie-Filter
- Erweiterte Filter (Kalorien, Zeit, Rating, etc.)
- Allergie-Filter
- Sortierungsoptionen
- Pagination (20 Rezepte pro Seite)

**View-Toggle:**
- Fixierter Button unten rechts
- Schaltet zwischen Home und Filter um
- Zeigt den aktiven Status an

---

## 🎨 Design-Features

### Responsive Breakpoints
- **Mobile** (<640px): 
  - Kleinere Karten (220px)
  - Keine Scroll-Pfeile
  - Single-Column Layout

- **Tablet** (640-1024px):
  - 240px Karten
  - Scroll-Pfeile auf einigen Komponenten

- **Desktop** (>1024px):
  - 240-280px Karten
  - Volles Scroll-Button-Layout
  - Mehrere Karten sichtbar

### Styling
- Tailwind CSS + inline CSS
- Smooth Transitions & Hover Effects
- Moderne Shadows & Rounded Corners
- Custom Scrollbar Styling

---

## 📊 Recipe-Daten-Struktur

```typescript
interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface Rating {
  average: number;  // 0-5 stars
  count: number;    // Anzahl Bewertungen
}

interface Recipe {
  id: number;
  title: string;
  category: string[];      // z.B. ["Vegan", "Glutenfrei"]
  time: number;            // Minuten
  portions: number;
  image: string;           // Image URL
  nutrition: Nutrition;
  ingredients?: string[];  // Optional
  steps?: string[];        // Optional
  rating: Rating;
}
```

---

## 🚀 Deployment & Performance

### Optimierungen
- ✅ Pagination (20 Rezepte pro Seite im Filter-Modus)
- ✅ $derived für reaktive Berechnungen
- ✅ Lazy Scrolling Container
- ✅ Optimierte CSS für Scroll-Performance

### Browser-Support
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Mobile Browser (Touch-optimiert)

---

## 🔧 Zukünftige Verbesserungen

- [ ] Infinite Scroll statt Pagination
- [ ] Recipe Details Modal
- [ ] User-spezifische Empfehlungen (basierend auf Favoriten)
- [ ] Animation: Page Transitions
- [ ] Carousel Auto-Scroll mit Controls
- [ ] Search mit Autocomplete

---

## 📝 Notizen

- Die RecipeCard-Komponente wird in RecipeRow und über die recipeFilters.ts verwaltet
- Die Datenbankfunktion `getRecipesPaginated()` wird für Performance im Filter-Modus verwendet
- Alle Komponenten sind Svelte 5 Runes-kompatibel ($props, $derived, $state)
