<script>
  import { SPINNER_ANIMATION_DURATION, SPINNER_UPDATE_SPEED } from "$lib/utils/constants.js";
  import { goto } from "$app/navigation";

  let { recipes = [], isOpen = false, onClose } = $props();

  let isSpinning = $state(false);
  let randomRecipe = $state(null);
  let showModal = $state(false);
  let spinInterval = null;

  function pickRandomRecipe() {
    if (!recipes || recipes.length === 0 || isSpinning) {
      console.warn("Cannot pick recipe - recipes not available or already spinning");
      return;
    }

    isSpinning = true;
    showModal = false;
    randomRecipe = null;

    if (spinInterval) clearInterval(spinInterval);

    const startTime = Date.now();
    let isAnimationComplete = false;

    // Animate spinning through recipes
    spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (!isAnimationComplete && elapsed < SPINNER_ANIMATION_DURATION) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        randomRecipe = { ...recipes[randomIndex] };
      }

      // Stop animation and select final recipe
      if (elapsed >= SPINNER_ANIMATION_DURATION && !isAnimationComplete) {
        isAnimationComplete = true;
        clearInterval(spinInterval);
        spinInterval = null;

        const finalIndex = Math.floor(Math.random() * recipes.length);
        randomRecipe = { ...recipes[finalIndex] };
        
        isSpinning = false;
        showModal = true;
      }
    }, SPINNER_UPDATE_SPEED);
  }

  function closeModal() {
    isSpinning = false;
    showModal = false;
    randomRecipe = null;

    if (spinInterval !== null) {
      clearInterval(spinInterval);
      spinInterval = null;
    }

    onClose?.();
  }

  function goToRecipe() {
    if (!showModal || !randomRecipe?._id) {
      console.error("Cannot navigate - invalid recipe state");
      return;
    }

    closeModal();
    goto(`/Rezepte/${randomRecipe._id}`);
  }
</script>

<button class="random-btn" on:click={pickRandomRecipe} disabled={isSpinning}>
  🎲 Zufallsrezept
</button>

{#if showModal && randomRecipe}
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <button class="modal-close" on:click={closeModal}>✕</button>

      <img
        src={randomRecipe.image || "/images/placeholder.jpg"}
        alt={randomRecipe.title}
        class="modal-image"
      />

      <h2 class="modal-title">{randomRecipe.title}</h2>

      <div class="modal-info">
        <span>⏱️ {randomRecipe.time} Min</span>
        <span>👥 {randomRecipe.portions} Portionen</span>
        <span>⭐ {randomRecipe.rating.average}</span>
      </div>

      <div class="modal-categories">
        {#each randomRecipe.category || [] as cat}
          <span class="category-badge">{cat}</span>
        {/each}
      </div>

      <button class="modal-btn primary" on:click={goToRecipe}>
        👀 Zum Rezept
      </button>
      <button class="modal-btn secondary" on:click={closeModal}>
        🎲 Nächstes
      </button>
    </div>
  </div>
{/if}

<style>
  .random-btn {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .random-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(255, 107, 107, 0.3);
  }

  .random-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
  }

  .modal-content {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    position: relative;
    animation: slideUp 0.3s ease;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }

  .modal-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1rem 0;
  }

  .modal-info {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.95rem;
  }

  .modal-categories {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .category-badge {
    background: #f0f0f0;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
  }

  .modal-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .modal-btn.primary {
    background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
    color: white;
  }

  .modal-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(76, 175, 80, 0.3);
  }

  .modal-btn.secondary {
    background: #f0f0f0;
    color: #333;
  }

  .modal-btn.secondary:hover {
    background: #e0e0e0;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>
