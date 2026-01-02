# SmartRecipe - Codebase Struktur

## 📁 Verzeichnisstruktur

```
src/
├── lib/
│   ├── components/
│   │   ├── index.js                    # Component exports
│   │   ├── RecipeCard.svelte           # Individual recipe card
│   │   ├── RecipeCarousel.svelte       # Recipe carousel slider
│   │   ├── RecipeRow.svelte            # Recipe row display
│   │   ├── CommentsCarousel.svelte     # Comments/ratings carousel
│   │   ├── RecipesHomePage.svelte      # Recipes home layout
│   │   ├── HeroSlideshow.svelte        # Hero image slideshow (NEW)
│   │   └── RandomRecipeSpinner.svelte  # Random recipe picker (NEW)
│   │
│   ├── utils/
│   │   ├── index.js                    # Utils exports
│   │   ├── constants.js                # Global constants (NEW)
│   │   ├── imageUtils.js               # Image handling utilities (NEW)
│   │   └── recipeUtils.js              # Recipe utilities (NEW)
│   │
│   ├── stores/
│   │   └── favorites.js                # Favorites store
│   │
│   ├── db.js                           # MongoDB operations
│   └── recipeFilters.ts                # Recipe filtering logic
│
├── routes/
│   ├── +layout.svelte                  # Root layout
│   ├── +page.server.js                 # Root server load
│   ├── +page.svelte                    # Homepage
│   ├── favorites/                      # Favorites route
│   │   ├── +page.server.js
│   │   └── +page.svelte
│   ├── Zutaten/                        # Ingredients search
│   │   ├── +page.server.js
│   │   └── +page.svelte
│   ├── Rezepte/                        # Recipes section
│   │   ├── +page.server.js
│   │   ├── +page.svelte
│   │   ├── home/
│   │   ├── create/
│   │   └── [rezepte_id]/               # Recipe detail page
│   │       ├── +page.server.js
│   │       └── +page.svelte
│   │
│   └── styles.css                      # Global styles
│
├── app.html                            # HTML template
└── static/                             # Static assets
    └── images/                         # Recipe images
```

## 🔧 Utilities

### Constants (`utils/constants.js`)
Zentrale Konstanten für:
- Image handling (Placeholder)
- Pagination defaults
- Slideshow/Animation settings
- Nutrition limits
- Rating defaults

### Image Utils (`utils/imageUtils.js`)
- `applyImageFallback()` - Setzt Fallback-Image wenn leer
- `getSafeImageUrl()` - Gibt sichere Image-URL zurück

### Recipe Utils (`utils/recipeUtils.js`)
- `normalizeRecipeId()` - Konvertiert MongoDB ObjectId zu String
- `formatRecipe()` - Formatiert Rezeptdaten für Display
- `isValidRecipe()` - Validiert Rezeptstruktur

## 🎨 Komponenten

### HeroSlideshow
Automatisiertes Bild-Karussell für Homepage
- Auto-Rotation nach X Sekunden
- Manuelle Navigation mit Pfeilen
- Indicator-Punkte

### RandomRecipeSpinner
Zufallsrezept-Picker mit Animation
- Spinning-Animation während Auswahl
- Modal-Dialog zur Anzeige
- Navigation zum Rezept

### RecipeCard
Einzelne Rezeptkarte mit:
- Image, Title, Metadata
- Favoriten-Toggle
- Rating Display
- Kategorie-Badges

### Weitere Komponenten
- `RecipeCarousel` - Rezept-Schieber
- `RecipeRow` - Rezept-Reihe
- `CommentsCarousel` - Kommentare-Anzeige
- `RecipesHomePage` - Home-Layout

## 💾 Datenbank

### db.js
Exportiert folgende Funktionen:
```javascript
// Recipes
getRecipes()
getRecipesPaginated(skip, limit)
getTotalRecipeCount()
getRecipe(id)
createRecipe(recipe)
updateRecipe(recipe)
deleteRecipe(id)

// Ratings
getRatingsForRecipe(recipeId)
createRating(rating)
getAverageRatingForRecipe(recipeId)
updateRecipeAverageRating(recipeId)

// Comments
getRecentComments(limit)
```

## 🎯 Best Practices

1. **Importe** - Nutze die Index-Dateien für saubere Imports
   ```javascript
   import { HeroSlideshow, RandomRecipeSpinner } from "$lib/components";
   import { SLIDESHOW_COUNT, SPINNER_DURATION } from "$lib/utils";
   ```

2. **Utils** - Extrahiere wiederverwendbare Logik in Utils
3. **Komponenten** - Halten dich modular und fokussiert
4. **Constants** - Zentral definieren, nicht hardcoded

## ✨ Optimierungen durchgeführt

✅ Image-Fallback aus `db.js` in `imageUtils.js` verschoben  
✅ Slideshow-Logik in `HeroSlideshow.svelte` komponenti​siert  
✅ Random-Recipe-Spinner in `RandomRecipeSpinner.svelte` komponenti​siert  
✅ Globale Konstanten in `constants.js` zentralisiert  
✅ Index-Dateien für bessere Imports erstellt  
✅ Redundanzen entfernt, Code sauberer strukturiert
