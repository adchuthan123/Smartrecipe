<script>
  import RecipeRow from "$lib/components/RecipeRow.svelte";
  import RecipeCarousel from "$lib/components/RecipeCarousel.svelte";

  /**
   * RecipesHomePage - Netflix-style recipe overview with multiple horizontal rows
   * Props:
   *   - recipes: Recipe[] - Array of all recipes
   */
  let { recipes = [] } = $props();

  // Search state
  let searchQuery = $state("");

  // Search results
  let searchResults = $derived.by(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return recipes.filter(r => 
      r.title.toLowerCase().includes(query) ||
      r.category?.some(cat => cat.toLowerCase().includes(query))
    ).slice(0, 10);
  });

  // Compute categorized recipe lists
  let popular = $derived.by(() => {
    return [...recipes]
      .sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
      .slice(0, 10);
  });

  let topRated = $derived.by(() => {
    return [...recipes]
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
      .filter(r => (r.rating?.count || 0) > 0)
      .slice(0, 10);
  });

  let vegan = $derived.by(() => {
    return recipes.filter(r => r.category?.includes("Vegan")).slice(0, 10);
  });

  let vegetarian = $derived.by(() => {
    return recipes.filter(r => r.category?.includes("Vegetarisch")).slice(0, 10);
  });

  let quickAndEasy = $derived.by(() => {
    return recipes
      .filter(r => (r.time || 0) <= 20 && (r.steps?.length || 0) < 5)
      .slice(0, 10);
  });

  let lowCal = $derived.by(() => {
    return recipes
      .filter(r => (r.nutrition?.calories || 0) <= 400)
      .slice(0, 10);
  });

  let highProtein = $derived.by(() => {
    return recipes
      .filter(r => (r.nutrition?.protein || 0) >= 25)
      .sort((a, b) => (b.nutrition?.protein || 0) - (a.nutrition?.protein || 0))
      .slice(0, 10);
  });
</script>

<div class="home-container">
  <!-- Header Section -->
  <div class="header-section">
    <h1 class="main-title">Rezepte für dich</h1>
    <p class="subtitle">Speziell ausgewählt für dein Ziel</p>

    <!-- Search Bar -->
    <div class="search-bar-wrapper">
      <input
        type="text"
        placeholder="Rezepte durchsuchen..."
        bind:value={searchQuery}
        class="search-input"
      />
      <span class="search-icon">🔍</span>
    </div>
  </div>

  <!-- Content Rows -->
  <div class="rows-container">
    {#if searchQuery.trim() && searchResults.length > 0}
      <RecipeRow title="🔍 Suchergebnisse für '{searchQuery}'" recipes={searchResults} />
    {/if}

    {#if searchQuery.trim() && searchResults.length === 0}
      <div class="no-results-container">
        <p class="no-results-text">Keine Rezepte gefunden für '{searchQuery}'</p>
      </div>
    {/if}

    {#if !searchQuery.trim()}
      {#if popular.length > 0}
        <RecipeRow title="🔥 Beliebte Rezepte" recipes={popular} seeAllHref="/Rezepte" />
      {/if}

      {#if topRated.length > 0}
        <RecipeCarousel title="⭐ Top bewertet" recipes={topRated} seeAllHref="/Rezepte" />
      {/if}

      {#if vegan.length > 0}
        <RecipeRow title="🌱 Vegan geniessen" recipes={vegan} seeAllHref="/Rezepte" />
      {/if}

      {#if vegetarian.length > 0}
        <RecipeRow title="🥬 Vegetarisch" recipes={vegetarian} seeAllHref="/Rezepte" />
      {/if}

      {#if quickAndEasy.length > 0}
        <RecipeRow title="⚡ Schnell & einfach" recipes={quickAndEasy} seeAllHref="/Rezepte" />
      {/if}

      {#if lowCal.length > 0}
        <RecipeRow title="🍃 Kalorienarme Favoriten" recipes={lowCal} seeAllHref="/Rezepte" />
      {/if}

      {#if highProtein.length > 0}
        <RecipeRow title="💪 Proteinreich" recipes={highProtein} seeAllHref="/Rezepte" />
      {/if}
    {/if}
  </div>
</div>

<style>
  .home-container {
    width: 100%;
    padding: 2rem 1rem;
    background: #ffffff;
  }

  .header-section {
    max-width: 1200px;
    margin: 0 auto 3rem;
    text-align: center;
  }

  .main-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin: 0 0 0.5rem;
    letter-spacing: -0.5px;
  }

  .subtitle {
    font-size: 1.1rem;
    color: #6b7280;
    margin: 0 0 1.5rem;
  }

  .search-bar-wrapper {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
  }

  .search-input {
    width: 100%;
    padding: 0.75rem 2.5rem 0.75rem 1.2rem;
    border: 2px solid #e5e7eb;
    border-radius: 28px;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: white;
  }

  .search-input:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
  }

  .search-input::placeholder {
    color: #9ca3af;
  }

  .search-icon {
    position: absolute;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #9ca3af;
    font-size: 1.1rem;
  }

  .rows-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .no-results-container {
    max-width: 1400px;
    margin: 3rem auto;
    padding: 2rem;
    text-align: center;
    background: #f8f9fa;
    border-radius: 12px;
  }

  .no-results-text {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }

  @media (max-width: 640px) {
    .home-container {
      padding: 1.5rem 0.5rem;
    }

    .main-title {
      font-size: 1.75rem;
    }

    .subtitle {
      font-size: 0.95rem;
    }

    .rows-container {
      padding: 0 0.5rem;
    }
  }

  @media (min-width: 768px) {
    .home-container {
      padding: 2.5rem 1.5rem;
    }

    .rows-container {
      padding: 0 3rem;
    }
  }

  @media (min-width: 1024px) {
    .header-section {
      margin-bottom: 4rem;
    }

    .main-title {
      font-size: 2.8rem;
    }

    .rows-container {
      padding: 0;
    }
  }
</style>
