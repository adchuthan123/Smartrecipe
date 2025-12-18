<script>
  import RecipeCard from "$lib/components/RecipeCard.svelte";
  import RecipesHomePage from "$lib/components/RecipesHomePage.svelte";
  import { favorites } from "$lib/stores/favorites.js";
  import { filterRecipes } from "$lib/recipeFilters";
  
  let { data } = $props();
  
  // View Mode: 'home' oder 'filter'
  let viewMode = $state('home');
  
  // Filter-State (Kategorien)
  let activeFilters = $state([]);
  let searchQuery = $state("");
  
  // Erweiterte Filter-State
  let kalorienarm = $state(false);
  let kohlenhydratreich = $state(false);
  let fettarm = $state(false);
  let schnell = $state(false);
  let einfach = $state(false);
  let minRating = $state(0);
  let allergyInput = $state("");
  let sortBy = $state(undefined);
  
  // Infinite Load - "Weitere laden" Button
  let itemsToShow = $state(20);
  const itemsPerLoad = 20;
  
  // Verfügbare Filter (basierend auf den category-Werten)
  const filters = [
    { id: 'vegan', label: '🌱 Vegan', category: 'Vegan' },
    { id: 'vegetarian', label: '🥬 Vegetarisch', category: 'Vegetarisch' },
    { id: 'protein', label: '💪 Proteinreich', category: 'Proteinreich' },
    { id: 'glutenfree', label: '🌾 Glutenfrei', category: 'Glutenfrei' }
  ];

  // Erweiterte Filter
  const advancedFilters = [
    { id: 'kalorienarm', label: '🍃 Kalorienarm', key: 'kalorienarm' },
    { id: 'kohlenhydratreich', label: '🍞 Kohlenhydratreich', key: 'kohlenhydratreich' },
    { id: 'fettarm', label: '💧 Fettarm', key: 'fettarm' },
    { id: 'schnell', label: '⚡ Schnell', key: 'schnell' },
    { id: 'einfach', label: '👍 Einfach', key: 'einfach' }
  ];

  let showAdvancedFilters = $state(false);
  
  // Gefilterte Rezepte mit erweiterten Filtern
  let filteredRecipes = $derived.by(() => {
    let results = data.recipes;
    
    // 1. Kategorie-Filter (bestehend)
    if (activeFilters.length > 0) {
      results = results.filter(recipe => {
        const recipeCategories = recipe.category || [];
        return activeFilters.some(filterCategory => 
          recipeCategories.includes(filterCategory)
        );
      });
    }
    
    // 2. Suchfeld-Filter (bestehend)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(query)
      );
    }

    // 3. Erweiterte Filter über filterRecipes()
    const allergies = allergyInput.trim() ? allergyInput.split(',').map(a => a.trim()) : [];
    
    results = filterRecipes(results, {
      kalorienarm,
      kohlenhydratreich,
      fettarm,
      schnell,
      einfach,
      allergies: allergies.length > 0 ? allergies : undefined,
      minRating: minRating > 0 ? minRating : undefined,
      sortBy
    });
    
    return results;
  });
  
  function toggleFilter(category) {
    if (activeFilters.includes(category)) {
      activeFilters = activeFilters.filter(f => f !== category);
    } else {
      activeFilters = [...activeFilters, category];
    }
    currentPage = 1; // Reset zu erster Seite
  }
  
  function clearAllFilters() {
    activeFilters = [];
    kalorienarm = false;
    kohlenhydratreich = false;
    fettarm = false;
    schnell = false;
    einfach = false;
    minRating = 0;
    allergyInput = "";
    sortBy = undefined;
    searchQuery = "";
    itemsToShow = 20; // Reset auf erste 20 Items
  }
  
  function loadMore() {
    itemsToShow += itemsPerLoad;
    // Optional: Smooth scroll zum Button
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  }
  
  // Infinite Load - Nur bis itemsToShow rendern
  let displayedRecipes = $derived.by(() => {
    return filteredRecipes.slice(0, itemsToShow);
  });
  
  let hasMoreRecipes = $derived(itemsToShow < filteredRecipes.length);

  function toggleAdvancedFilter(key) {
    if (key === 'kalorienarm') kalorienarm = !kalorienarm;
    else if (key === 'kohlenhydratreich') kohlenhydratreich = !kohlenhydratreich;
    else if (key === 'fettarm') fettarm = !fettarm;
    else if (key === 'schnell') schnell = !schnell;
    else if (key === 'einfach') einfach = !einfach;
  }

  function isAdvancedFilterActive(key) {
    if (key === 'kalorienarm') return kalorienarm;
    if (key === 'kohlenhydratreich') return kohlenhydratreich;
    if (key === 'fettarm') return fettarm;
    if (key === 'schnell') return schnell;
    if (key === 'einfach') return einfach;
    return false;
  }

  let hasActiveAdvancedFilters = $derived(
    kalorienarm || kohlenhydratreich || fettarm || schnell || einfach || 
    minRating > 0 || allergyInput.trim() !== "" || sortBy !== undefined
  );
</script>

{#if viewMode === 'home'}
  <!-- HOME VIEW -->
  <RecipesHomePage recipes={data.recipes} />
  
  <!-- View Mode Toggle (bottom right) -->
  <div class="view-toggle">
    <button 
      class="toggle-btn active" 
      onclick={() => viewMode = 'home'}
      title="Netflix-Style Übersicht"
    >
      🏠 Home
    </button>
    <button 
      class="toggle-btn" 
      onclick={() => viewMode = 'filter'}
      title="Filter & Such-Ansicht"
    >
      🔍 Filter
    </button>
  </div>

{:else}
  <!-- FILTER VIEW -->
  <div class="page-wrap">
    <h2 class="section-title">Rezepte für dich</h2>
    <p class="section-subtitle">Speziell ausgewählt für dein Ziel</p>

  <!-- Create Button + Search + Filter Bar Container -->
  <div class="controls-container">
    <a href="/Rezepte/create" class="create-btn">
      ➕ Neues Rezept
    </a>

    <!-- Suchfeld -->
    <div class="search-container">
      <input
        type="text"
        placeholder="Rezepte durchsuchen..."
        bind:value={searchQuery}
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>

    <!-- Filter-Bar -->
    <div class="filter-bar">
      {#each filters as filter}
        <button
          class="filter-btn"
          class:active={activeFilters.includes(filter.category)}
          onclick={() => toggleFilter(filter.category)}
        >
          {filter.label}
        </button>
      {/each}
      
      <button 
        class="filter-btn advanced-toggle-btn" 
        class:active={showAdvancedFilters}
        onclick={() => showAdvancedFilters = !showAdvancedFilters}
      >
        ⚙️ Erweitert {hasActiveAdvancedFilters ? '●' : ''}
      </button>
      
    {#if activeFilters.length > 0 || hasActiveAdvancedFilters}
      <button class="filter-btn clear-btn" onclick={clearAllFilters}>
        ✕ Alle Filter löschen ({filteredRecipes.length} gefunden)
      </button>
    {/if}
  </div>
  </div><!-- Erweiterte Filter Panel -->
{#if showAdvancedFilters}
  <div class="advanced-filters-panel">
    <div class="advanced-filters-content">
      
      <!-- Nährwert & Zeit Filter -->
      <div class="filter-section">
        <h3 class="filter-section-title">Eigenschaften</h3>
        <div class="filter-chips">
          {#each advancedFilters as filter}
            <button
              class="chip-btn"
              class:active={isAdvancedFilterActive(filter.key)}
              onclick={() => toggleAdvancedFilter(filter.key)}
            >
              {filter.label}
            </button>
          {/each}
        </div>
      </div>

      <!-- Bewertung -->
      <div class="filter-section">
        <h3 class="filter-section-title">Mindestbewertung</h3>
        <div class="rating-selector">
          <input 
            type="range" 
            min="0" 
            max="5" 
            step="0.5"
            bind:value={minRating}
            class="rating-slider"
          />
          <span class="rating-value">
            {#if minRating > 0}
              ⭐ {minRating}+
            {:else}
              Alle
            {/if}
          </span>
        </div>
      </div>

      <!-- Allergien -->
      <div class="filter-section">
        <h3 class="filter-section-title">Allergien / Unverträglichkeiten</h3>
        <input
          type="text"
          placeholder="z.B. nuss, laktose, gluten (mit Komma trennen)"
          bind:value={allergyInput}
          class="allergy-input"
        />
        {#if allergyInput.trim()}
          <p class="allergy-hint">Rezepte mit diesen Zutaten werden ausgeblendet</p>
        {/if}
      </div>

      <!-- Sortierung -->
      <div class="filter-section">
        <h3 class="filter-section-title">Sortierung</h3>
        <div class="sort-options">
          <button
            class="sort-btn"
            class:active={sortBy === undefined}
            onclick={() => sortBy = undefined}
          >
            Standard
          </button>
          <button
            class="sort-btn"
            class:active={sortBy === 'bestRating'}
            onclick={() => sortBy = 'bestRating'}
          >
            ⭐ Beste Bewertung
          </button>
          <button
            class="sort-btn"
            class:active={sortBy === 'mostComments'}
            onclick={() => sortBy = 'mostComments'}
          >
            💬 Meist kommentiert
          </button>
        </div>
      </div>

    </div>
  </div>
{/if}

<!-- Rezepte-Grid -->
<div class="recipe-grid">
  {#if displayedRecipes.length > 0}
    {#each displayedRecipes as recipe}
      <RecipeCard {recipe} />
    {/each}
  {:else}
    <p class="no-results">Keine Rezepte mit diesen Filtern gefunden 😔</p>
  {/if}
</div>

<!-- Load More Button -->
{#if hasMoreRecipes}
  <div class="load-more-container">
    <p class="load-more-info">
      Zeige {displayedRecipes.length} von {filteredRecipes.length} Rezepten
    </p>
    <button 
      class="load-more-btn"
      onclick={loadMore}
    >
      Weiter
    </button>
  </div>
{:else if filteredRecipes.length > 0}
  <div class="load-more-container">
    <p class="load-more-info">
      ✅ Alle {filteredRecipes.length} Rezepte angezeigt
    </p>
  </div>
{/if}
  </div>

  <!-- View Mode Toggle (bottom right) -->
  <div class="view-toggle">
    <button 
      class="toggle-btn" 
      onclick={() => viewMode = 'home'}
      title="Netflix-Style Übersicht"
    >
      🏠 Home
    </button>
    <button 
      class="toggle-btn active" 
      onclick={() => viewMode = 'filter'}
      title="Filter & Such-Ansicht"
    >
      🔍 Filter
    </button>
  </div>
{/if}

<style>
  .section-title {
    font-size: 2rem;
    font-weight: 800;
    margin: 0 0 0.4rem 0;
  }

  .section-subtitle {
    color: #777;
    margin: 0 0 1.25rem 0;
  }

  .page-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 2rem; /* Abstand links/rechts/oben */
  }

  .controls-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2.5rem;
    flex-wrap: wrap;
  }

  .create-btn {
    padding: 0.85rem 1.8rem;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    white-space: nowrap;
  }

  .create-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
    background: linear-gradient(135deg, #0056b3 0%, #003d82 100%);
  }

  .search-container {
    position: relative;
    flex: 1;
    min-width: 250px;
    max-width: 350px;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 28px;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background: white;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  .search-input::placeholder {
    color: #aaa;
  }

  .search-icon {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #999;
  }

  .filter-bar {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter-btn {
    padding: 0.7rem 1.4rem;
    border: 2px solid #e0e0e0;
    border-radius: 28px;
    background: white;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .filter-btn:hover {
    border-color: #999;
    background: #f9f9f9;
  }

  .filter-btn.active {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    border-color: #ff6b6b;
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
  }

  .clear-btn {
    background: #f5f5f5;
    border-color: #ccc;
    color: #333;
  }

  .clear-btn:hover {
    background: #ececec;
    border-color: #999;
  }

  .advanced-toggle-btn.active {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border-color: #007bff;
  }

  /* Advanced Filters Panel */
  .advanced-filters-panel {
    background: #f8f9fa;
    border-radius: 16px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    animation: slideDown 0.3s ease;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .advanced-filters-content {
    display: grid;
    gap: 2rem;
  }

  .filter-section {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
  }

  .filter-section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 1rem 0;
  }

  .filter-chips {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .chip-btn {
    padding: 0.6rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 20px;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .chip-btn:hover {
    border-color: #007bff;
    background: #f0f7ff;
  }

  .chip-btn.active {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border-color: #007bff;
  }

  .rating-selector {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .rating-slider {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: #e0e0e0;
    outline: none;
    -webkit-appearance: none;
  }

  .rating-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffc107;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .rating-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ffc107;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  .rating-value {
    min-width: 80px;
    text-align: center;
    font-weight: 600;
    color: #ffc107;
    font-size: 1.1rem;
  }

  .allergy-input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
  }

  .allergy-input:focus {
    outline: none;
    border-color: #007bff;
  }

  .allergy-hint {
    margin: 0.5rem 0 0 0;
    font-size: 0.85rem;
    color: #dc3545;
    font-style: italic;
  }

  .sort-options {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
  }

  .sort-btn {
    padding: 0.7rem 1.2rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .sort-btn:hover {
    border-color: #007bff;
    background: #f0f7ff;
  }

  .sort-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.6rem;
  }

  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    color: #999;
    padding: 3rem;
    font-size: 1.1rem;
  }

  .load-more-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 4rem;
    margin-bottom: 3rem;
  }

  .load-more-info {
    font-size: 0.95rem;
    color: #666;
    margin: 0;
    font-weight: 500;
  }

  .load-more-btn {
    padding: 0.9rem 2rem;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  .load-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 123, 255, 0.4);
  }

  .load-more-btn:active {
    transform: translateY(0);
  }

  .view-toggle {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: flex;
    gap: 0.5rem;
    background: white;
    border-radius: 50px;
    padding: 0.4rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    z-index: 100;
  }

  .toggle-btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 50px;
    background: #f0f0f0;
    color: #666;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    white-space: nowrap;
  }

  .toggle-btn:hover {
    background: #e0e0e0;
  }

  .toggle-btn.active {
    background: linear-gradient(135deg, #0066ff 0%, #0046b3 100%);
    color: white;
  }

  @media (max-width: 768px) {
    .advanced-filters-panel {
      padding: 1rem;
    }

    .filter-section {
      padding: 1rem;
    }

    .sort-options {
      flex-direction: column;
    }

    .sort-btn {
      width: 100%;
    }
  }
</style>