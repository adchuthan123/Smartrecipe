<script>
  import { SLIDESHOW_ROTATION_INTERVAL, SLIDESHOW_COUNT } from "$lib/utils/constants.js";

  let { recipes = [] } = $props();
  
  let currentSlideIndex = $state(0);
  let slideshowRecipes = $state([]);
  let slideshowInterval = null;

  // Initialize slideshow with random recipes
  $effect(() => {
    if (recipes && recipes.length > 0 && slideshowRecipes.length === 0) {
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      slideshowRecipes = shuffled.slice(0, Math.min(SLIDESHOW_COUNT, recipes.length));
      
      // Start auto-rotation
      if (slideshowInterval) clearInterval(slideshowInterval);
      slideshowInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slideshowRecipes.length;
      }, SLIDESHOW_ROTATION_INTERVAL);
    }

    // Cleanup on unmount
    return () => {
      if (slideshowInterval) clearInterval(slideshowInterval);
    };
  });

  let currentRecipe = $derived(slideshowRecipes[currentSlideIndex] || null);

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slideshowRecipes.length;
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slideshowRecipes.length) % slideshowRecipes.length;
  }
</script>

{#if currentRecipe}
  <div class="slideshow-container">
    <div class="slide">
      <img 
        src={currentRecipe.image || "/images/placeholder.jpg"} 
        alt={currentRecipe.title}
        class="slide-image"
      />
      <div class="slide-content">
        <h2 class="slide-title">{currentRecipe.title}</h2>
        <div class="slide-meta">
          <span>⏱️ {currentRecipe.time} Min</span>
          <span>👥 {currentRecipe.portions} Portionen</span>
          <span>⭐ {currentRecipe.rating.average}</span>
        </div>
      </div>
    </div>

    <button class="slide-button prev" on:click={prevSlide}>❮</button>
    <button class="slide-button next" on:click={nextSlide}>❯</button>

    <div class="slide-indicators">
      {#each slideshowRecipes as _, index}
        <button
          class="indicator"
          class:active={index === currentSlideIndex}
          on:click={() => currentSlideIndex = index}
        />
      {/each}
    </div>
  </div>
{/if}

<style>
  .slideshow-container {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
    height: 400px;
  }

  .slide {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .slide-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .slide-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
    color: white;
    padding: 2rem;
  }

  .slide-title {
    font-size: 1.8rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }

  .slide-meta {
    display: flex;
    gap: 1.5rem;
    font-size: 0.95rem;
  }

  .slide-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .slide-button:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .slide-button.prev {
    left: 1rem;
  }

  .slide-button.next {
    right: 1rem;
  }

  .slide-indicators {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .indicator.active {
    background: white;
    transform: scale(1.2);
  }
</style>
