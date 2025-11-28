<script>
  import RecipeCard from "$lib/components/RecipeCard.svelte";
  import { favorites } from "$lib/stores/favorites.js";
  
  let { data } = $props();
  
  // Filter-State
  let activeFilters = $state([]);
  let searchQuery = $state("");
  
  // Verfügbare Filter (basierend auf den category-Werten)
  const filters = [
    { id: 'vegan', label: '🌱 Vegan', category: 'Vegan' },
    { id: 'vegetarian', label: '🥬 Vegetarisch', category: 'Vegetarisch' },
    { id: 'protein', label: '💪 Proteinreich', category: 'Proteinreich' },
    { id: 'glutenfree', label: '🌾 Glutenfrei', category: 'Glutenfrei' }
  ];
  
  // Gefilterte Rezepte
  let filteredRecipes = $derived.by(() => {
    let results = data.recipes;
    
    // Kategorie-Filter
    if (activeFilters.length > 0) {
      results = results.filter(recipe => {
        const recipeCategories = recipe.category || [];
        return activeFilters.some(filterCategory => 
          recipeCategories.includes(filterCategory)
        );
      });
    }
    
    // Suchfeld-Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(query)
      );
    }
    
    return results;
  });
  
  function toggleFilter(category) {
    if (activeFilters.includes(category)) {
      activeFilters = activeFilters.filter(f => f !== category);
    } else {
      activeFilters = [...activeFilters, category];
    }
  }
  
  function clearFilters() {
    activeFilters = [];
  }
</script>

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
        on:click={() => toggleFilter(filter.category)}
      >
        {filter.label}
      </button>
    {/each}
    
    {#if activeFilters.length > 0}
      <button class="filter-btn clear-btn" on:click={clearFilters}>
        ✕ Filter löschen
      </button>
    {/if}
  </div>
</div>

<!-- Rezepte-Grid -->
<div class="recipe-grid">
  {#if filteredRecipes.length > 0}
    {#each filteredRecipes as recipe}
      <RecipeCard {recipe} />
    {/each}
  {:else}
    <p class="no-results">Keine Rezepte mit diesen Filtern gefunden 😔</p>
  {/if}
</div>

<style>
  .section-title {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
    margin-top: 1.5rem;
  }

  .section-subtitle {
    color: #777;
    margin-bottom: 2rem;
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

  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    color: #999;
    padding: 3rem;
    font-size: 1.1rem;
  }
</style>