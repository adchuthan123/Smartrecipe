<script>
  /**
   * RecipeCarousel - Modern carousel slider with large image and recipe info
   * Props:
   *   - title: string - Title of the carousel
   *   - recipes: Recipe[] - Array of recipes to display
   *   - seeAllHref: string - Optional link for "See all" button
   */
  let { title, recipes = [], seeAllHref } = $props();

  let currentIndex = $state(0);

  $effect(() => {
    // Reset index when recipes change
    if (currentIndex >= recipes.length) {
      currentIndex = 0;
    }
  });

  function nextSlide() {
    if (currentIndex < recipes.length - 1) {
      currentIndex++;
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    }
  }

  function goToSlide(index) {
    currentIndex = index;
  }

  let currentRecipe = $derived(recipes[currentIndex]);
  let canGoNext = $derived(currentIndex < recipes.length - 1);
  let canGoPrev = $derived(currentIndex > 0);

  // Format rating stars
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '⭐';
    if (hasHalfStar) stars += '✨';
    return stars || '☆☆☆☆☆';
  }
</script>

<div class="carousel-wrapper">
  <!-- Carousel Header -->
  <div class="carousel-header">
    <h2 class="carousel-title">{title}</h2>
    {#if seeAllHref}
      <a href={seeAllHref} class="see-all-link">
        Alle anzeigen →
      </a>
    {/if}
  </div>

  {#if currentRecipe}
    <!-- Carousel Slide -->
    <div class="carousel-slide">
      <!-- Navigation Buttons -->
      <button
        class="nav-btn nav-btn-prev"
        onclick={prevSlide}
        disabled={!canGoPrev}
        aria-label="Vorheriges Rezept"
      >
        ❮
      </button>

      <button
        class="nav-btn nav-btn-next"
        onclick={nextSlide}
        disabled={!canGoNext}
        aria-label="Nächstes Rezept"
      >
        ❯
      </button>

      <!-- Slide Content -->
      <a href={`/Rezepte/${currentRecipe._id}`} class="slide-content">
        <!-- Left: Large Image -->
        <div class="slide-image">
          <img
            src={currentRecipe.image || '/images/placeholder.jpg'}
            alt={currentRecipe.title}
            class="recipe-image"
            onerror={(e) => (e.target.src = '/images/placeholder.jpg')}
          />
          <!-- Category Badges -->
          {#if currentRecipe.category && currentRecipe.category.length > 0}
            <div class="category-badges">
              {#each currentRecipe.category.slice(0, 3) as cat}
                <span class="category-badge">{cat}</span>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Right: Recipe Info -->
        <div class="slide-info">
          <h3 class="recipe-title">{currentRecipe.title}</h3>

          <!-- Meta Information -->
          <div class="recipe-meta">
            <div class="meta-item">
              <span class="meta-icon">⏱️</span>
              <div class="meta-content">
                <span class="meta-label">Zubereitungszeit</span>
                <span class="meta-value">{currentRecipe.time} Min</span>
              </div>
            </div>

            <div class="meta-item">
              <span class="meta-icon">👥</span>
              <div class="meta-content">
                <span class="meta-label">Portionen</span>
                <span class="meta-value">{currentRecipe.portions}</span>
              </div>
            </div>
          </div>

          <!-- Nutrition Info -->
          {#if currentRecipe.nutrition}
            <div class="nutrition-grid">
              <div class="nutrition-item">
                <span class="nutrition-value">{currentRecipe.nutrition.calories}</span>
                <span class="nutrition-label">kcal</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-value">{currentRecipe.nutrition.protein}g</span>
                <span class="nutrition-label">Protein</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-value">{currentRecipe.nutrition.carbs}g</span>
                <span class="nutrition-label">Kohlenhydrate</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-value">{currentRecipe.nutrition.fat}g</span>
                <span class="nutrition-label">Fett</span>
              </div>
            </div>
          {/if}

          <!-- Rating -->
          <div class="rating-section">
            <div class="stars">
              {renderStars(currentRecipe.rating?.average || 0)}
            </div>
            <div class="rating-details">
              <span class="rating-score">{currentRecipe.rating?.average?.toFixed(1) || '0.0'}</span>
              {#if currentRecipe.rating?.count > 0}
                <span class="rating-count">({currentRecipe.rating.count} Bewertungen)</span>
              {:else}
                <span class="rating-count">(Noch keine Bewertungen)</span>
              {/if}
            </div>
          </div>

          <!-- CTA Button -->
          <div class="cta-section">
            <span class="cta-btn">
              Rezept ansehen →
            </span>
          </div>
        </div>
      </a>
    </div>

    <!-- Pagination Dots -->
    <div class="carousel-pagination">
      {#each recipes as recipe, index}
        <button
          class="pagination-dot"
          class:active={index === currentIndex}
          onclick={() => goToSlide(index)}
          aria-label={`Rezept ${index + 1}`}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel-wrapper {
    margin-bottom: 4rem;
    position: relative;
  }

  .carousel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .carousel-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
  }

  .see-all-link {
    color: #0066ff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: color 0.2s ease;
  }

  .see-all-link:hover {
    color: #0046b3;
  }

  .carousel-slide {
    position: relative;
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .slide-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    height: 500px;
  }

  .slide-content:hover {
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.18);
    transform: translateY(-4px);
  }

  /* Left: Image */
  .slide-image {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .recipe-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .slide-content:hover .recipe-image {
    transform: scale(1.05);
  }

  .category-badges {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    z-index: 2;
  }

  .category-badge {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #1f2937;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Right: Info */
  .slide-info {
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    background: white;
    overflow-y: auto;
  }

  .recipe-title {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1f2937;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .recipe-meta {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    margin-bottom: 0;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meta-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border-radius: 10px;
  }

  .meta-content {
    display: flex;
    flex-direction: column;
  }

  .meta-label {
    font-size: 0.75rem;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .meta-value {
    font-size: 1.1rem;
    color: #1f2937;
    font-weight: 700;
  }

  .nutrition-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.8rem;
    padding: 1rem;
    background: #f9fafb;
    border-radius: 12px;
    margin-bottom: 0;
  }

  .nutrition-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nutrition-value {
    font-size: 1.5rem;
    font-weight: 800;
    color: #0066ff;
    line-height: 1;
  }

  .nutrition-label {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.3rem;
    font-weight: 500;
  }

  .rating-section {
    margin-bottom: 0;
  }

  .stars {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .rating-details {
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }

  .rating-score {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1f2937;
  }

  .rating-count {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .cta-section {
    margin-top: 0.5rem;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.9rem 1.8rem;
    background: linear-gradient(135deg, #0066ff 0%, #0046b3 100%);
    color: white;
    border-radius: 10px;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .slide-content:hover .cta-btn {
    background: linear-gradient(135deg, #0046b3 0%, #003d82 100%);
    transform: translateX(5px);
  }

  /* Navigation Buttons */
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #1f2937;
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .nav-btn-prev {
    left: -28px;
  }

  .nav-btn-next {
    right: -28px;
  }

  .nav-btn:hover:not(:disabled) {
    background: #0066ff;
    color: white;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 102, 255, 0.4);
  }

  .nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .nav-btn:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
  }

  /* Pagination Dots */
  .carousel-pagination {
    display: flex;
    justify-content: center;
    gap: 0.6rem;
    margin-top: 2rem;
  }

  .pagination-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #d1d5db;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .pagination-dot:hover {
    background: #9ca3af;
    transform: scale(1.2);
  }

  .pagination-dot.active {
    background: #0066ff;
    width: 32px;
    border-radius: 5px;
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .slide-content {
      grid-template-columns: 1fr;
      height: auto;
    }

    .slide-image {
      height: 350px;
    }

    .recipe-title {
      font-size: 1.5rem;
    }

    .nutrition-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .nav-btn {
      width: 48px;
      height: 48px;
      font-size: 1.5rem;
    }

    .nav-btn-prev {
      left: 10px;
    }

    .nav-btn-next {
      right: 10px;
    }
  }

  @media (max-width: 768px) {
    .carousel-title {
      font-size: 1.4rem;
    }

    .slide-info {
      padding: 1.5rem;
    }

    .recipe-title {
      font-size: 1.3rem;
    }

    .nutrition-grid {
      padding: 1rem;
      gap: 0.8rem;
    }

    .nutrition-value {
      font-size: 1.2rem;
    }

    .nutrition-label {
      font-size: 0.7rem;
    }
  }
</style>
