<script>
  import { favorites } from "$lib/stores/favorites.js";

  // Runes-Mode: Props so wie bei dir
  let { recipe } = $props();

  // Reaktiver State - immer updated wenn $favorites sich ändert
  let isFavorite = $derived($favorites.includes(recipe._id));

  function toggleFavorite() {
    favorites.update((ids) => {
      const set = new Set(ids);

      if (set.has(recipe._id)) {
        // Entfernen
        set.delete(recipe._id);
      } else {
        // Hinzufügen
        set.add(recipe._id);
      }

      // Neue Liste als Array zurückgeben
      return [...set];
    });
  }
</script>

<a href={"/Rezepte/" + recipe._id} class="card-link">
  <div class="card">
    <!-- Image Container -->
    <div class="card-image-container">
      <img
        src={recipe.image || "/images/placeholder.jpg"}
        alt={recipe.title}
        class="card-img"
        on:error={(e) => (e.target.src = "/images/placeholder.jpg")}
      />
      
      <!-- Overlay Gradient -->
      <div class="image-overlay"></div>

      <!-- ❤️ Herz-Icon -->
      <button 
        class="heart-btn"
        class:active={isFavorite}
        on:click|preventDefault|stopPropagation={toggleFavorite}
        type="button"
        aria-label="Add to favorites"
      >
        {#if isFavorite}
          ❤️
        {:else}
          🤍
        {/if}
      </button>

      <!-- Categories -->
      {#if recipe.category && recipe.category.length > 0}
        <div class="category-badges">
          {#each recipe.category.slice(0, 2) as cat}
            <span class="category-badge">{cat}</span>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Card Content -->
    <div class="card-body">
      <h3 class="card-title">{recipe.title}</h3>

      <!-- Meta Info -->
      <div class="meta-container">
        <span class="meta-item">⏱️ {recipe.time} Min</span>
        <span class="meta-item">👥 {recipe.portions}P</span>
      </div>

      <!-- Nutrition Info -->
      {#if recipe.nutrition}
        <div class="nutrition-info">
          <span class="nutrition-item">{recipe.nutrition.calories} kcal</span>
          <span class="nutrition-item">{recipe.nutrition.protein}g Protein</span>
        </div>
      {/if}

      <!-- Rating -->
      <div class="rating-container">
        <span class="rating">⭐ {recipe.rating.average}</span>
      </div>
    </div>
  </div>
</a>

<style>
  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }

  .card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
  }

  .card-image-container {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  }

  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .card:hover .card-img {
    transform: scale(1.08);
  }

  .image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    pointer-events: none;
  }

  .heart-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    transition: transform 0.18s ease, opacity 0.18s ease;
    z-index: 10;
    box-shadow: none;
    line-height: 1;
  }

  .heart-btn:hover {
    transform: scale(1.12);
    opacity: 0.95;
    background: transparent;
  }

  .heart-btn.active {
    /* keep a subtle hint when active (no square) */
    transform: scale(1.06);
  }

  .category-badges {
    position: absolute;
    bottom: 12px;
    left: 12px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    z-index: 5;
  }

  .category-badge {
    background: rgba(0, 123, 255, 0.9);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(4px);
  }

  .card-body {
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: #222;
    margin: 0 0 1rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta-container {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nutrition-info {
    display: flex;
    gap: 1rem;
    padding: 0.8rem;
    background: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }

  .nutrition-item {
    font-weight: 600;
    color: #007bff;
  }

  .rating-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: auto;
  }

  .rating {
    font-weight: 700;
    color: #ffc107;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .card-image-container {
      height: 200px;
    }

    .card-title {
      font-size: 1rem;
    }
  }
</style>
