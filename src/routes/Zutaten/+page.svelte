<script>
  import "../styles.css";

  let { data } = $props();
  let recipes = $derived(data.recipes || []);

  // Zutaten-Matching State
  let ingredientInput = $state("");
  let userIngredients = $state([]);
  let matchedRecipes = $state([]);
  let showResults = $state(false);

  function addIngredient() {
    const trimmed = ingredientInput.trim().toLowerCase();
    if (trimmed && !userIngredients.includes(trimmed)) {
      userIngredients = [...userIngredients, trimmed];
      ingredientInput = "";
      findMatches();
    }
  }

  function removeIngredient(ingredient) {
    userIngredients = userIngredients.filter(i => i !== ingredient);
    if (userIngredients.length > 0) {
      findMatches();
    } else {
      showResults = false;
      matchedRecipes = [];
    }
  }

  function findMatches() {
    if (userIngredients.length === 0) {
      matchedRecipes = [];
      showResults = false;
      return;
    }

    const results = recipes.map(recipe => {
      const recipeIngredients = (recipe.ingredients || [])
        .map(ing => ing.toLowerCase().trim())
        .join(" ");

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

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  }
</script>

<section class="ingredient-finder">
  <div class="container">
    <div class="section-header">
      <h1 class="section-title">🍳 Finde Rezepte mit deinen Zutaten</h1>
      <p class="section-subtitle">Gib deine vorhandenen Zutaten ein und entdecke passende Rezepte</p>
    </div>

    <div class="finder-card">
      <div class="input-section">
        <div class="input-wrapper">
          <input
            type="text"
            bind:value={ingredientInput}
            onkeypress={handleKeyPress}
            placeholder="z.B. Hähnchen, Tomaten, Zwiebeln..."
            class="ingredient-input"
          />
          <button onclick={addIngredient} class="btn btn-primary" disabled={!ingredientInput.trim()}>
            Hinzufügen
          </button>
        </div>

        {#if userIngredients.length > 0}
          <div class="ingredients-chips">
            {#each userIngredients as ingredient}
              <span class="chip">
                {ingredient}
                <button onclick={() => removeIngredient(ingredient)} class="chip-remove" aria-label="Entfernen">×</button>
              </span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

{#if showResults || (userIngredients.length > 0 && matchedRecipes.length === 0)}
<section class="ingredient-results">
  <div class="container">
    {#if showResults}
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
    {:else}
      <div class="no-results">
        <p>Keine Rezepte mit diesen Zutaten gefunden. Versuche andere Zutaten!</p>
      </div>
    {/if}
  </div>
</section>
{/if}

<style>
  :global(:root) {
    --max-width: 1200px;
    --border-radius: 16px;
    --border-radius-sm: 12px;
    --shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    --shadow-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
    --spacing-section: 4rem;
    --spacing-lg: 3rem;
    --spacing-md: 2rem;
    --spacing-sm: 1rem;
  }

  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }

  .section-header { text-align: center; margin-bottom: var(--spacing-lg); }
  .section-title { font-size: clamp(1.75rem, 3vw, 2.25rem); color: #1e293b; margin: 0 0 0.75rem; font-weight: 800; }
  .section-subtitle { color: #64748b; font-size: clamp(1rem, 2vw, 1.125rem); margin: 0; max-width: 700px; margin-left: auto; margin-right: auto; }

  .btn {
    padding: 1rem 2rem;
    border-radius: var(--border-radius-sm);
    font-weight: 700;
    font-size: 1rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: none;
    white-space: nowrap;
  }
  .btn-primary { background: linear-gradient(135deg, #667eea, #764ba2); color: white; box-shadow: var(--shadow); }
  .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .ingredient-finder { padding: var(--spacing-section) 0; background: white; }
  .finder-card { background: #f8fafc; border-radius: var(--border-radius); padding: var(--spacing-md); box-shadow: var(--shadow); max-width: 800px; margin: 0 auto; }
  .input-section { width: 100%; }
  .input-wrapper { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); }
  .ingredient-input { flex: 1; padding: 1rem; border: 2px solid #e2e8f0; border-radius: var(--border-radius-sm); font-size: 1rem; transition: all 0.2s; background: white; }
  .ingredient-input:focus { outline: none; border-color: #667eea; box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1); }
  .ingredients-chips { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: var(--spacing-sm); }
  .chip { display: inline-flex; align-items: center; gap: 0.5rem; background: white; color: #1e293b; padding: 0.625rem 1rem; border-radius: 24px; font-size: 0.95rem; font-weight: 500; box-shadow: var(--shadow); transition: all 0.2s; }
  .chip:hover { transform: translateY(-2px); box-shadow: var(--shadow-hover); }
  .chip-remove { background: #f1f5f9; color: #64748b; border: none; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.25rem; line-height: 1; transition: all 0.2s; }
  .chip-remove:hover { background: #ef4444; color: white; }

  .ingredient-results { padding: var(--spacing-section) 0; background: #f8fafc; }
  .results-title { font-size: 1.5rem; margin-bottom: var(--spacing-md); color: #1e293b; text-align: center; font-weight: 700; }
  .results-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--spacing-md); }
  .result-card { background: white; border-radius: var(--border-radius); overflow: hidden; box-shadow: var(--shadow); transition: all 0.3s ease; text-decoration: none; color: inherit; display: block; }
  .result-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-hover); }
  .result-image { position: relative; width: 100%; height: 220px; overflow: hidden; }
  .result-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
  .result-card:hover .result-image img { transform: scale(1.05); }
  .match-badge { position: absolute; top: var(--spacing-sm); right: var(--spacing-sm); background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 0.5rem 1rem; border-radius: 24px; font-weight: 700; font-size: 0.9rem; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4); }
  .result-content { padding: 1.5rem; }
  .result-title { font-size: 1.25rem; margin: 0 0 var(--spacing-sm); color: #1e293b; font-weight: 700; }
  .result-meta { display: flex; gap: var(--spacing-sm); margin-bottom: var(--spacing-sm); color: #64748b; font-size: 0.95rem; }
  .match-info { border-top: 2px solid #f1f5f9; padding-top: var(--spacing-sm); margin-top: var(--spacing-sm); }
  .matched { color: #10b981; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 600; }
  .matched-items { color: #64748b; font-size: 0.9rem; line-height: 1.6; }
  .more { color: #94a3b8; font-style: italic; }
  .no-results { text-align: center; padding: var(--spacing-lg); color: #64748b; font-size: 1.1rem; }

  @media (max-width: 768px) {
    :global(:root) { --spacing-section: 3rem; --spacing-lg: 2rem; }
    .input-wrapper { flex-direction: column; }
    .input-wrapper .btn { width: 100%; }
    .results-grid { grid-template-columns: 1fr; }
  }
</style>
