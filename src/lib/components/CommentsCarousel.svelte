<script>
  let { comments = [] } = $props();
  
  let currentSlide = $state(0);
  let autoplayInterval = null;
  let isPaused = $state(false);

  // Auto-advance alle 5 Sekunden
  function startAutoplay() {
    if (comments.length <= 1) return;
    
    autoplayInterval = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % comments.length;
  }

  function prevSlide() {
    currentSlide = currentSlide === 0 ? comments.length - 1 : currentSlide - 1;
  }

  function goToSlide(index) {
    currentSlide = index;
  }

  function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  // Start autoplay when component mounts
  $effect(() => {
    startAutoplay();
    return () => stopAutoplay();
  });
</script>

{#if comments.length === 0}
  <div class="no-comments">
    <div class="no-comments-icon">💬</div>
    <h3>Noch keine Kommentare vorhanden</h3>
    <p>Sei der Erste, der ein Rezept bewertet und kommentiert!</p>
  </div>
{:else}
  <div 
    class="carousel-container"
    role="region"
    aria-label="Kommentar Carousel"
    onmouseenter={() => isPaused = true}
    onmouseleave={() => isPaused = false}
  >
    <div class="carousel-wrapper">
      {#each comments as comment, index}
        <div 
          class="carousel-slide" 
          class:active={index === currentSlide}
        >
          <div class="quote-icon">❝</div>
          
          <div class="comment-content">
            <p class="comment-text">{comment.comment}</p>
            
            <div class="comment-rating">
              <span class="stars">{'⭐'.repeat(comment.stars)}</span>
            </div>
          </div>

          <div class="comment-meta">
            {#if comment.createdAt}
              <span class="comment-date">{formatDate(comment.createdAt)}</span>
            {/if}
          </div>

          <div class="recipe-link">
            <a href="/Rezepte/{comment.recipeId}" class="recipe-button">
              <span class="recipe-name">{comment.recipeTitle}</span>
              <span class="arrow">→</span>
            </a>
          </div>
        </div>
      {/each}
    </div>

    {#if comments.length > 1}
      <button 
        class="carousel-control prev" 
        onclick={prevSlide}
        aria-label="Vorheriger Kommentar"
      >
        ‹
      </button>
      <button 
        class="carousel-control next" 
        onclick={nextSlide}
        aria-label="Nächster Kommentar"
      >
        ›
      </button>

      <div class="carousel-indicators">
        {#each comments as _, index}
          <button 
            class="indicator" 
            class:active={index === currentSlide}
            onclick={() => goToSlide(index)}
            aria-label="Gehe zu Kommentar {index + 1}"
          >
          </button>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  .no-comments {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
  }

  .no-comments-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .no-comments h3 {
    font-size: 1.5rem;
    color: #1e293b;
    margin: 0 0 0.5rem;
  }

  .no-comments p {
    font-size: 1rem;
    margin: 0;
  }

  .carousel-container {
    position: relative;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 4rem;
  }

  .carousel-wrapper {
    position: relative;
    width: 100%;
    min-height: 300px;
  }

  .carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
    transform: scale(0.95);
    transition: opacity 0.5s ease, transform 0.5s ease;
    pointer-events: none;
    background: white;
    border-radius: 20px;
    padding: 3rem 2.5rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  .carousel-slide.active {
    opacity: 1;
    transform: scale(1);
    pointer-events: auto;
  }

  .quote-icon {
    font-size: 4rem;
    color: #667eea;
    opacity: 0.2;
    line-height: 1;
    margin-bottom: 1rem;
  }

  .comment-content {
    margin-bottom: 2rem;
  }

  .comment-text {
    font-size: 1.35rem;
    line-height: 1.7;
    color: #1e293b;
    font-style: italic;
    margin: 0 0 1.5rem;
    font-weight: 500;
  }

  .comment-rating {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .stars {
    font-size: 1.5rem;
  }

  .comment-meta {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    color: #64748b;
    font-size: 0.95rem;
  }

  .comment-date {
    font-style: italic;
  }

  .recipe-link {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .recipe-button {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 700;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .recipe-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .recipe-name {
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .arrow {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }

  .recipe-button:hover .arrow {
    transform: translateX(4px);
  }

  .carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: 2px solid #e2e8f0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 2rem;
    line-height: 1;
    color: #667eea;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .carousel-control:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
    transform: translateY(-50%) scale(1.1);
  }

  .carousel-control.prev {
    left: 0;
  }

  .carousel-control.next {
    right: 0;
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #cbd5e1;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .indicator:hover {
    background: #94a3b8;
    transform: scale(1.2);
  }

  .indicator.active {
    background: #667eea;
    width: 32px;
    border-radius: 6px;
  }

  @media (max-width: 768px) {
    .carousel-container {
      padding: 1.5rem 3rem;
    }

    .carousel-slide {
      padding: 2rem 1.5rem;
      min-height: 350px;
    }

    .quote-icon {
      font-size: 3rem;
    }

    .comment-text {
      font-size: 1.1rem;
      line-height: 1.6;
    }

    .carousel-control {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
    }

    .recipe-button {
      padding: 0.875rem 1.5rem;
      font-size: 0.9rem;
    }

    .recipe-name {
      max-width: 200px;
    }
  }

  @media (max-width: 480px) {
    .carousel-container {
      padding: 1rem 2.5rem;
    }

    .carousel-slide {
      padding: 1.5rem 1rem;
    }

    .comment-text {
      font-size: 1rem;
    }

    .carousel-control {
      width: 35px;
      height: 35px;
      font-size: 1.25rem;
    }
  }
</style>
