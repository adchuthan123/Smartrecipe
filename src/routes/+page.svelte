<script>
  import "./styles.css";

  let { data } = $props();
  let recipes = $derived(data.recipes || []);

  // Zutaten-Matching State
  let ingredientInput = $state("");
  let userIngredients = $state([]);
  let matchedRecipes = $state([]);
  let showResults = $state(false);

  // Füge Zutat hinzu
  function addIngredient() {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !userIngredients.includes(trimmed)) {
      userIngredients = [...userIngredients, trimmed];
      ingredientInput = "";
      findMatches();
    }
  }

  // Entferne Zutat
  function removeIngredient(ingredient) {
    userIngredients = userIngredients.filter(i => i !== ingredient);
    if (userIngredients.length > 0) {
      findMatches();
    } else {
      showResults = false;
      matchedRecipes = [];
    }
  }

  // Matching-Algorithmus
  function findMatches() {
    if (userIngredients.length === 0) {
      matchedRecipes = [];
      showResults = false;
      return;
    }

    const results = recipes.map(recipe => {
      // Normalisiere Rezept-Zutaten
      const recipeIngredients = recipe.ingredients
        .map(ing => ing.toLowerCase().trim())
        .join(" ");

      // Zähle Übereinstimmungen
      let matchCount = 0;
      let matchedItems = [];
      let missingItems = [];

      userIngredients.forEach(userIng => {
        if (recipeIngredients.includes(userIng)) {
          matchCount++;
          matchedItems.push(userIng);
        } else {
          missingItems.push(userIng);
        }
      });

      return {
        ...recipe,
        matchCount,
        matchedItems,
        missingItems,
        matchPercentage: Math.round((matchCount / userIngredients.length) * 100)
      };
    })
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);

    matchedRecipes = results;
    showResults = true;
  }

  // Enter-Taste Handler
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  }
</script>

<section class="site-hero">
  <div class="hero-inner">
    <h1 class="hero-title">SmartRecipe</h1>
    <p class="hero-sub">Entdecke leckere Rezepte — schnell gekocht und einfach erklärt. Deine persönliche Rezeptsammlung, smart und übersichtlich.</p>

    <div class="hero-cta">
      <a href="/Rezepte" class="btn primary">Jetzt Rezepte entdecken</a>
      <a href="/Rezepte/create" class="btn outline">Neues Rezept hinzufügen</a>
    </div>
  </div>
</section>

<!-- Zutaten-Matching Sektion -->
<section class="ingredient-matcher">
  <div class="container">
    <h2 class="matcher-title">🍳 Finde Rezepte mit deinen Zutaten</h2>
    <p class="matcher-subtitle">Gib deine vorhandenen Zutaten ein und wir zeigen dir passende Rezepte</p>

    <div class="input-section">
      <div class="input-wrapper">
        <input
          type="text"
          bind:value={ingredientInput}
          onkeypress={handleKeyPress}
          placeholder="z.B. Hähnchen, Tomaten, Zwiebeln..."
          class="ingredient-input"
        />
        <button onclick={addIngredient} class="add-btn" disabled={!ingredientInput.trim()}>
          Hinzufügen
        </button>
      </div>

      {#if userIngredients.length > 0}
        <div class="ingredients-chips">
          {#each userIngredients as ingredient}
            <span class="chip">
              {ingredient}
              <button onclick={() => removeIngredient(ingredient)} class="chip-remove">×</button>
            </span>
          {/each}
        </div>
      {/if}
    </div>

    {#if showResults}
      <div class="results-section">
        <h3 class="results-title">
          {matchedRecipes.length} {matchedRecipes.length === 1 ? 'Rezept gefunden' : 'Rezepte gefunden'}
        </h3>

        <div class="results-grid">
          {#each matchedRecipes as recipe}
            <a href="/Rezepte/{recipe._id}" class="result-card">
              <div class="result-image">
                <img 
                  src={recipe.image || '/images/placeholder.jpg'} 
                  alt={recipe.title}
                  onerror={(e) => (e.target.src = '/images/placeholder.jpg')}
                />
                <div class="match-badge">{recipe.matchPercentage}% Match</div>
              </div>
              
              <div class="result-content">
                <h4 class="result-title">{recipe.title}</h4>
                
                <div class="result-meta">
                  <span>⏱️ {recipe.duration} Min</span>
                  <span>👥 {recipe.servings} Portionen</span>
                </div>

                <div class="match-info">
                  <div class="matched">
                    <strong>{recipe.matchCount}</strong> von <strong>{userIngredients.length}</strong> Zutaten vorhanden
                  </div>
                  
                  {#if recipe.matchedItems.length > 0}
                    <div class="matched-items">
                      ✓ {recipe.matchedItems.slice(0, 3).join(', ')}
                      {#if recipe.matchedItems.length > 3}
                        <span class="more">+{recipe.matchedItems.length - 3} weitere</span>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {:else if userIngredients.length > 0}
      <div class="no-results">
        <p>Keine Rezepte mit diesen Zutaten gefunden. Versuche andere Zutaten!</p>
      </div>
    {/if}
  </div>
</section>

<section class="features">
  <div class="container">
    <h2 class="features-title">Warum SmartRecipe?</h2>

    <div class="features-grid">
      <div class="feature-card">
        <div class="feature-icon">🧑‍🍳</div>
        <h3>Einfache Anleitungen</h3>
        <p>Schritt-für-Schritt erklärt — perfekt für Anfänger.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">⏱️</div>
        <h3>Schnelle Rezepte</h3>
        <p>Viele Gerichte in unter 30 Minuten zubereitet.</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📖</div>
        <h3>Deine Sammlung</h3>
        <p>Eigene Rezepte hinzufügen und Favoriten verwalten.</p>
      </div>
    </div>
  </div>
</section>

<style>
  .site-hero {
    background: linear-gradient(180deg, #0f1724 0%, #111827 60%);
    color: white;
    padding: 4.5rem 0 3.5rem;
  }

  .hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    text-align: center;
    padding: 0 1rem;
  }

  .hero-title {
    font-size: 3.2rem;
    margin: 0 0 0.6rem;
    font-weight: 800;
    letter-spacing: -1px;
  }

  .hero-sub {
    color: #cbd5e1;
    font-size: 1.05rem;
    max-width: 820px;
    margin: 0 auto 1.6rem;
    line-height: 1.6;
  }

  .hero-cta .btn {
    margin: 0 0.5rem;
  }

  .btn.primary {
    background: linear-gradient(90deg,#0066ff,#0046b3);
    color: white;
    padding: 0.8rem 1.25rem;
    border-radius: 10px;
    font-weight: 700;
    text-decoration: none;
    display: inline-block;
  }

  .btn.outline {
    background: transparent;
    color: #cbd5e1;
    border: 2px solid rgba(203,213,225,0.12);
    padding: 0.7rem 1.1rem;
    border-radius: 10px;
    text-decoration: none;
    margin-left: 0.5rem;
  }

  .features {
    padding: 3rem 0 4rem;
    background: #f7fafc;
  }

  .features-title {
    text-align: center;
    font-size: 1.65rem;
    margin-bottom: 1.75rem;
    color: #111827;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.25rem;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .feature-card {
    background: white;
    border-radius: 12px;
    padding: 1.6rem;
    box-shadow: 0 6px 20px rgba(16,24,40,0.06);
    text-align: center;
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }

  .feature-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(16,24,40,0.09);
  }

  .feature-icon {
    font-size: 1.9rem;
    margin-bottom: 0.8rem;
  }

  .feature-card h3 {
    margin: 0 0 0.6rem;
    font-size: 1.05rem;
    color: #0f1724;
  }

  .feature-card p {
    color: #475569;
    font-size: 0.95rem;
    margin: 0;
  }

  @media (max-width: 900px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-title { font-size: 2.4rem; }
    .hero-sub { font-size: 1rem; }
  }

  @media (max-width: 560px) {
    .features-grid { grid-template-columns: 1fr; }
    .hero-title { font-size: 2rem; }
  }

  /* Ingredient Matcher Styles */
  .ingredient-matcher {
    padding: 3rem 0 4rem;
    background: white;
  }

  .matcher-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  .matcher-subtitle {
    text-align: center;
    color: #64748b;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  .input-section {
    max-width: 700px;
    margin: 0 auto 2rem;
    padding: 0 1rem;
  }

  .input-wrapper {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .ingredient-input {
    flex: 1;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .ingredient-input:focus {
    outline: none;
    border-color: #0066ff;
  }

  .add-btn {
    background: linear-gradient(90deg, #0066ff, #0046b3);
    color: white;
    border: none;
    padding: 0.875rem 1.5rem;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
  }

  .add-btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .ingredients-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #f1f5f9;
    color: #1e293b;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .chip-remove {
    background: #cbd5e1;
    color: #475569;
    border: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 1.2rem;
    line-height: 1;
    transition: background 0.2s;
  }

  .chip-remove:hover {
    background: #94a3b8;
    color: white;
  }

  .results-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .results-title {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: #111827;
    text-align: center;
  }

  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .result-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    text-decoration: none;
    color: inherit;
    display: block;
  }

  .result-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .result-image {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .match-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 0.85rem;
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
  }

  .result-content {
    padding: 1.25rem;
  }

  .result-title {
    font-size: 1.15rem;
    margin: 0 0 0.75rem;
    color: #111827;
    font-weight: 700;
  }

  .result-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    color: #64748b;
    font-size: 0.9rem;
  }

  .match-info {
    border-top: 1px solid #e2e8f0;
    padding-top: 1rem;
  }

  .matched {
    color: #10b981;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }

  .matched-items {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .more {
    color: #94a3b8;
    font-style: italic;
  }

  .no-results {
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }

  @media (max-width: 768px) {
    .results-grid {
      grid-template-columns: 1fr;
    }

    .input-wrapper {
      flex-direction: column;
    }
  }
</style>
