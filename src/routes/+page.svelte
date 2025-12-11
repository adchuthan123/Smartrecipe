<script>
  import "./styles.css";
  import { goto } from '$app/navigation';

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

  // Zufalls-Rezept State
  let isSpinning = $state(false);
  let randomRecipe = $state(null);
  let showRandomRecipe = $state(false);
  let spinInterval = null;

  // Zufalls-Rezept Funktion mit garantiertem Stop
  function pickRandomRecipe() {
    // Guard: Nur wenn nicht bereits spinning und Rezepte vorhanden
    if (!recipes || recipes.length === 0 || isSpinning) {
      console.warn('⚠️ Cannot pick recipe:', {
        recipesAvailable: recipes?.length ?? 0,
        isSpinning,
        recipesExist: !!recipes
      });
      return;
    }

    console.log('🎲 Starting random recipe selection, recipes available:', recipes.length);
    console.log('📦 First recipe structure:', recipes[0]);
    
    // Reset State
    isSpinning = true;
    showRandomRecipe = false;
    randomRecipe = null;

    // Stoppe ggf. vorherigen Interval
    if (spinInterval) clearInterval(spinInterval);

    const animationDuration = 1500; // 1.5 Sekunden
    const spinSpeed = 100; // Update alle 100ms
    const startTime = Date.now();
    let isAnimationComplete = false;

    // Animation: Schneller Wechsel zwischen Rezepten
    spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Wähle zufälliges Rezept während Animation läuft
      if (!isAnimationComplete && elapsed < animationDuration) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const selectedRecipe = recipes[randomIndex];
        randomRecipe = { ...selectedRecipe }; // Explizit kopieren
      }

      // Animation stoppen nach Dauer
      if (elapsed >= animationDuration && !isAnimationComplete) {
        isAnimationComplete = true;
        clearInterval(spinInterval);
        spinInterval = null;

        // FINAL: Wähle finales Rezept
        const finalIndex = Math.floor(Math.random() * recipes.length);
        const finalRecipe = recipes[finalIndex];
        randomRecipe = { ...finalRecipe }; // Explizit kopieren
        
        // State Update - WICHTIG für Modal-Anzeige
        isSpinning = false;
        showRandomRecipe = true;

        console.log('✅ Final recipe selected:', {
          title: randomRecipe?.title,
          id: randomRecipe?._id,
          time: randomRecipe?.time,
          portions: randomRecipe?.portions,
          category: randomRecipe?.category,
          rating: randomRecipe?.rating,
          image: randomRecipe?.image ? '✓ has image' : '✗ no image',
          fullObject: randomRecipe
        });
      }
    }, spinSpeed);
  }

  function closeRandomRecipe() {
    // Stoppe sofort jegliche Animationen
    isSpinning = false;
    showRandomRecipe = false;
    
    // Cleanup Interval SOFORT
    if (spinInterval !== null) {
      clearInterval(spinInterval);
      spinInterval = null;
    }
    
    // Setze Recipe zurück (optional, aber sauberer)
    randomRecipe = null;
    
    console.log('🔄 Modal geschlossen, Cleanup abgeschlossen');
  }

  function goToRecipeDetail() {
    // Sicherheit: Modal muss offen sein
    if (!showRandomRecipe) {
      console.error('❌ Modal nicht offen');
      return;
    }

    // Sicherheit: Rezept muss existieren
    if (!randomRecipe) {
      console.error('❌ Kein Rezept ausgewählt');
      return;
    }

    // Sicherheit: Rezept muss ID haben
    if (!randomRecipe._id) {
      console.error('❌ Rezept hat keine ID:', randomRecipe);
      return;
    }

    const recipeId = randomRecipe._id;
    console.log('✅ Navigiere zu Rezept:', recipeId, '—', randomRecipe.title);
    
    // Cleanup SOFORT vor Navigation
    closeRandomRecipe();
    
    // Gehe zur Detailseite (asynchron, aber warte nicht)
    goto(`/Rezepte/${recipeId}`);
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

<!-- Zufalls-Rezept Spiel -->
<section class="random-recipe-game">
  <div class="container">
    <div class="game-card">
      <div class="game-header">
        <span class="game-icon">🎲</span>
        <h2 class="game-title">Kannst du dich nicht entscheiden?</h2>
        <p class="game-subtitle">Lass das Glück für dich wählen! Drücke den Button und wir wählen ein zufälliges Rezept für dich aus.</p>
      </div>

      <button 
        onclick={pickRandomRecipe} 
        class="random-btn" 
        class:spinning={isSpinning}
        disabled={isSpinning || recipes.length === 0}
      >
        <span class="btn-icon">{isSpinning ? '🔄' : '🎰'}</span>
        <span class="btn-text">{isSpinning ? 'Wähle aus...' : 'Zufälliges Rezept'}</span>
      </button>

      {#if isSpinning && randomRecipe}
        <div class="spinning-preview">
          <div class="spinning-text">🔄 {randomRecipe.title}</div>
        </div>
      {/if}
    </div>
  </div>
</section>

<!-- Zufalls-Rezept Modal -->
{#if showRandomRecipe && randomRecipe}
  <div class="modal-overlay" onclick={closeRandomRecipe}>
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={closeRandomRecipe}>×</button>
      
      <div class="modal-header">
        <h2 class="modal-title">🎉 Dein Rezept wurde ausgewählt!</h2>
      </div>

      <div class="modal-body">
        <div class="modal-image">
          <img 
            src={randomRecipe.image || '/images/placeholder.jpg'} 
            alt={randomRecipe.title}
            onerror={(e) => (e.target.src = '/images/placeholder.jpg')}
          />
        </div>

        <div class="modal-info">
          <h3 class="recipe-title">{randomRecipe?.title || 'Rezept'}</h3>
          
          <div class="recipe-meta">
            {#if randomRecipe?.time}
              <span class="meta-item">⏱️ {randomRecipe.time} Min</span>
            {/if}
            {#if randomRecipe?.portions}
              <span class="meta-item">👥 {randomRecipe.portions} Portionen</span>
            {/if}
            {#if randomRecipe?.category && randomRecipe.category.length > 0}
              <span class="meta-item">🏷️ {randomRecipe.category[0]}</span>
            {/if}
          </div>

          {#if randomRecipe?.rating && randomRecipe.rating > 0}
            <div class="recipe-rating">
              <span class="stars">{'⭐'.repeat(Math.round(randomRecipe.rating))}</span>
              <span class="rating-text">{randomRecipe.rating.toFixed(1)}</span>
            </div>
          {/if}

          <div class="modal-actions">
            <button 
              type="button"
              onclick={goToRecipeDetail} 
              class="btn-view"
              disabled={!randomRecipe?._id}
            >
              🍳 Rezept ansehen
            </button>
            <button 
              type="button"
              onclick={pickRandomRecipe} 
              class="btn-retry"
            >
              🔄 Nochmal würfeln
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

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

  /* Random Recipe Game Styles */
  .random-recipe-game {
    padding: 3rem 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .game-card {
    max-width: 700px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    padding: 2.5rem;
    text-align: center;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .game-header {
    margin-bottom: 2rem;
  }

  .game-icon {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .game-title {
    font-size: 1.8rem;
    color: #1e293b;
    margin: 0 0 0.75rem;
    font-weight: 800;
  }

  .game-subtitle {
    color: #64748b;
    font-size: 1.05rem;
    line-height: 1.6;
    margin: 0;
  }

  .random-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 1.25rem 3rem;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
  }

  .random-btn:hover:not(:disabled) {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 40px rgba(102, 126, 234, 0.5);
  }

  .random-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .random-btn.spinning {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .btn-icon {
    font-size: 1.5rem;
    display: inline-block;
  }

  .spinning .btn-icon {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .spinning-preview {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #f1f5f9;
    border-radius: 12px;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .spinning-text {
    font-size: 1.1rem;
    color: #475569;
    font-weight: 600;
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 1rem;
    animation: fadeIn 0.3s ease;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(50px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.1);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 1;
  }

  .modal-close:hover {
    background: rgba(0, 0, 0, 0.2);
    transform: rotate(90deg);
  }

  .modal-header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: 2rem;
    border-radius: 20px 20px 0 0;
  }

  .modal-title {
    color: white;
    margin: 0;
    font-size: 1.6rem;
    font-weight: 800;
  }

  .modal-body {
    padding: 0;
  }

  .modal-image {
    width: 100%;
    height: 300px;
    overflow: hidden;
  }

  .modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-info {
    padding: 2rem;
  }

  .recipe-title {
    font-size: 1.6rem;
    color: #1e293b;
    margin: 0 0 1rem;
    font-weight: 700;
  }

  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .meta-item {
    color: #64748b;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .recipe-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .stars {
    font-size: 1.2rem;
  }

  .rating-text {
    color: #64748b;
    font-weight: 600;
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn-view {
    flex: 1;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1rem 2rem;
    border-radius: 12px;
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
  }

  .btn-view:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  .btn-retry {
    flex: 1;
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 1rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-retry:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .game-card {
      padding: 2rem 1.5rem;
    }

    .game-icon {
      font-size: 3rem;
    }

    .game-title {
      font-size: 1.4rem;
    }

    .random-btn {
      padding: 1rem 2rem;
      font-size: 1rem;
      width: 100%;
      justify-content: center;
    }

    .modal-actions {
      flex-direction: column;
    }

    .modal-info {
      padding: 1.5rem;
    }

    .modal-image {
      height: 200px;
    }
  }
</style>
