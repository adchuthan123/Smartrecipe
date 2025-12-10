<script>
  import RecipeCard from "./RecipeCard.svelte";

  /**
   * RecipeRow - Horizontally scrollable row of recipe cards (Netflix-style)
   * Props:
   *   - title: string - Title of the row (e.g. "Popular recipes")
   *   - recipes: Recipe[] - Array of recipes to display
   *   - seeAllHref: string - Optional link for "See all" button
   */
  let { title, recipes = [], seeAllHref } = $props();

  let scrollContainer;

  function scrollLeft() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
    }
  }

  function scrollRight() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
    }
  }
</script>

<div class="recipe-row-wrapper">
  <!-- Row Header -->
  <div class="row-header">
    <h2 class="row-title">{title}</h2>
    {#if seeAllHref}
      <a href={seeAllHref} class="see-all-link">
        Alle anzeigen →
      </a>
    {/if}
  </div>

  <!-- Scrollable Container with Arrows -->
  <div class="scroll-wrapper">
    <!-- Left Arrow (hidden on mobile) -->
    <button 
      class="scroll-btn scroll-btn-left hidden md:flex"
      onclick={scrollLeft}
      aria-label="Scroll left"
    >
      ←
    </button>

    <!-- Recipe Cards Container -->
    <div class="recipes-scroll" bind:this={scrollContainer}>
      {#each recipes as recipe (recipe.id)}
        <div class="recipe-card-wrapper">
          <RecipeCard {recipe} />
        </div>
      {/each}
    </div>

    <!-- Right Arrow (hidden on mobile) -->
    <button 
      class="scroll-btn scroll-btn-right hidden md:flex"
      onclick={scrollRight}
      aria-label="Scroll right"
    >
      →
    </button>
  </div>
</div>

<style>
  .recipe-row-wrapper {
    margin-bottom: 3rem;
  }

  .row-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;
    padding: 0 0.5rem;
  }

  .row-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  .see-all-link {
    color: #0066ff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: color 0.2s ease;
  }

  .see-all-link:hover {
    color: #0046b3;
  }

  .scroll-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .recipes-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 0.5rem;
    scroll-behavior: smooth;
    flex: 1;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #d1d5db #f3f4f6;
  }

  .recipes-scroll::-webkit-scrollbar {
    height: 6px;
  }

  .recipes-scroll::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 10px;
  }

  .recipes-scroll::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }

  .recipes-scroll::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  .recipe-card-wrapper {
    min-width: 240px;
    max-width: 240px;
    flex-shrink: 0;
  }

  /* Scroll Buttons */
  .scroll-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #1f2937;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 10;
  }

  .scroll-btn:hover {
    background: #f3f4f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .scroll-btn:active {
    transform: translateY(-50%) scale(0.95);
  }

  .scroll-btn-left {
    left: -60px;
  }

  .scroll-btn-right {
    right: -60px;
  }

  @media (max-width: 768px) {
    .scroll-btn {
      display: none;
    }

    .recipe-card-wrapper {
      min-width: 220px;
      max-width: 220px;
    }

    .row-title {
      font-size: 1.25rem;
    }
  }
</style>
