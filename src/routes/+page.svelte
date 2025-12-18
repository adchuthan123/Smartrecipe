<script>
  import "./styles.css";
  import { goto } from '$app/navigation';
  import CommentsCarousel from '$lib/components/CommentsCarousel.svelte';

  let { data } = $props();
  let recipes = $derived(data.recipes || []);
  let recentComments = $derived(data.recentComments || []);

  // Hero Slideshow State
  let currentSlideIndex = $state(0);
  let slideshowRecipes = $state([]);
  let slideshowInterval = null;

  // Initialize slideshow with 6 random recipes
  $effect(() => {
    if (recipes && recipes.length > 0 && slideshowRecipes.length === 0) {
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      slideshowRecipes = shuffled.slice(0, Math.min(6, recipes.length));
      
      // Start auto-rotation every 4 seconds
      if (slideshowInterval) clearInterval(slideshowInterval);
      slideshowInterval = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slideshowRecipes.length;
      }, 4000);
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

  // Zufalls-Rezept State
  let isSpinning = $state(false);
  let randomRecipe = $state(null);
  let showRandomRecipe = $state(false);
  let spinInterval = null;

  // Zufalls-Rezept Funktion mit garantiertem Stop
  function pickRandomRecipe() {
    // Guard: Nur wenn nicht bereits spinning und Rezepte vorhanden
    if (!recipes || recipes.length === 0 || isSpinning) {
      console.warn('⚠️ Cannot pick recipe:', {
        recipesAvailable: recipes?.length ?? 0,
        isSpinning,
        recipesExist: !!recipes
      });
      return;
    }

    console.log('🎲 Starting random recipe selection, recipes available:', recipes.length);
    console.log('📦 First recipe structure:', recipes[0]);
    
    // Reset State
    isSpinning = true;
    showRandomRecipe = false;
    randomRecipe = null;

    // Stoppe ggf. vorherigen Interval
    if (spinInterval) clearInterval(spinInterval);

    const animationDuration = 1500; // 1.5 Sekunden
    const spinSpeed = 100; // Update alle 100ms
    const startTime = Date.now();
    let isAnimationComplete = false;

    // Animation: Schneller Wechsel zwischen Rezepten
    spinInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Wähle zufälliges Rezept während Animation läuft
      if (!isAnimationComplete && elapsed < animationDuration) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        const selectedRecipe = recipes[randomIndex];
        randomRecipe = { ...selectedRecipe }; // Explizit kopieren
      }

      // Animation stoppen nach Dauer
      if (elapsed >= animationDuration && !isAnimationComplete) {
        isAnimationComplete = true;
        clearInterval(spinInterval);
        spinInterval = null;

        // FINAL: Wähle finales Rezept
        const finalIndex = Math.floor(Math.random() * recipes.length);
        const finalRecipe = recipes[finalIndex];
        randomRecipe = { ...finalRecipe }; // Explizit kopieren
        
        // State Update - WICHTIG für Modal-Anzeige
        isSpinning = false;
        showRandomRecipe = true;

        console.log('✅ Final recipe selected:', {
          title: randomRecipe?.title,
          id: randomRecipe?._id,
          time: randomRecipe?.time,
          portions: randomRecipe?.portions,
          category: randomRecipe?.category,
          rating: randomRecipe?.rating,
          image: randomRecipe?.image ? '✓ has image' : '✗ no image',
          fullObject: randomRecipe
        });
      }
    }, spinSpeed);
  }

  function closeRandomRecipe() {
    // Stoppe sofort jegliche Animationen
    isSpinning = false;
    showRandomRecipe = false;
    
    // Cleanup Interval SOFORT
    if (spinInterval !== null) {
      clearInterval(spinInterval);
      spinInterval = null;
    }
    
    // Setze Recipe zurück (optional, aber sauberer)
    randomRecipe = null;
    
    console.log('🔄 Modal geschlossen, Cleanup abgeschlossen');
  }

  function goToRecipeDetail() {
    // Sicherheit: Modal muss offen sein
    if (!showRandomRecipe) {
      console.error('❌ Modal nicht offen');
      return;
    }

    // Sicherheit: Rezept muss existieren
    if (!randomRecipe) {
      console.error('❌ Kein Rezept ausgewählt');
      return;
    }

    // Sicherheit: Rezept muss ID haben
    if (!randomRecipe._id) {
      console.error('❌ Rezept hat keine ID:', randomRecipe);
      return;
    }

    const recipeId = randomRecipe._id;
    console.log('✅ Navigiere zu Rezept:', recipeId, '—', randomRecipe.title);
    
    // Cleanup SOFORT vor Navigation
    closeRandomRecipe();
    
    // Gehe zur Detailseite (asynchron, aber warte nicht)
    goto(`/Rezepte/${recipeId}`);
  }
</script>

<section class="welcome-banner">
  <div class="container">
    <h1 class="welcome-title">Willkommen bei SmartRecipe</h1>
    <p class="welcome-lead">
      SmartRecipe hilft dir dabei, schnell passende Rezepte zu finden – basierend auf den Zutaten, die du bereits zuhause hast. Statt lange zu suchen, siehst du sofort, welche Gerichte wirklich zu deinem Vorrat passen.
    </p>
    <p class="welcome-text">
      Egal ob du Reste verwerten möchtest, neue Kochideen suchst oder deine eigenen Rezepte sammeln willst: SmartRecipe vereint intelligente Zutaten-Suche, eine übersichtliche Rezeptdatenbank und Community-Feedback in einer einfachen, modernen Anwendung.
    </p>
  </div>
</section>

<section class="how-it-works">
  <div class="container">
    <h2 class="how-title">So funktioniert's</h2>
    <div class="steps-grid-five">
      <div class="step">
        <div class="step-icon">🥗</div>
        <div class="step-number">1</div>
        <h3 class="step-title">Zutaten eingeben</h3>
        <p class="step-description">Gib ein, was du zuhause hast – SmartRecipe nutzt das als Basis fürs Matching.</p>
      </div>
      <div class="step">
        <div class="step-icon">🔍</div>
        <div class="step-number">2</div>
        <h3 class="step-title">Passende Rezepte entdecken</h3>
        <p class="step-description">Du bekommst sofort passende Rezepte inklusive Match-Score und fehlenden Zutaten.</p>
      </div>
      <div class="step">
        <div class="step-icon">🎲</div>
        <div class="step-number">3</div>
        <h3 class="step-title">Inspiration auf Knopfdruck</h3>
        <p class="step-description">Keine Idee? Hol dir ein Zufallsrezept für spontane Kochideen.</p>
      </div>
      <div class="step">
        <div class="step-icon">⭐</div>
        <div class="step-number">4</div>
        <h3 class="step-title">Rezepte speichern</h3>
        <p class="step-description">Markiere Favoriten oder speichere eigene Rezepte mit Bild und Anleitung.</p>
      </div>
      <div class="step">
        <div class="step-icon">💬</div>
        <div class="step-number">5</div>
        <h3 class="step-title">Kochen & bewerten</h3>
        <p class="step-description">Bewerte Rezepte und teile Tipps – so profitieren alle.</p>
      </div>
    </div>
  </div>
</section>

<section class="site-hero">
  <div class="hero-inner">
    <div class="hero-grid">
      <div class="hero-visual">
        {#if currentRecipe}
          <img 
            src={currentRecipe.image || '/images/placeholder.jpg'} 
            alt={currentRecipe.title}
            onerror={(e) => (e.target.src = '/images/placeholder.jpg')}
          />
          
          <!-- Navigation Arrows -->
          <button class="slide-arrow slide-arrow-left" onclick={prevSlide} aria-label="Vorheriges Rezept">
            ‹
          </button>
          <button class="slide-arrow slide-arrow-right" onclick={nextSlide} aria-label="Nächstes Rezept">
            ›
          </button>
          
          <div class="slideshow-indicators">
            {#each slideshowRecipes as _, index}
              <button 
                class="indicator" 
                class:active={index === currentSlideIndex}
                onclick={() => currentSlideIndex = index}
                aria-label="Gehe zu Rezept {index + 1}"
              ></button>
            {/each}
          </div>
        {:else}
          <img src="/images/placeholder.jpg" alt="Kochen mit frischen Zutaten" loading="lazy" />
        {/if}
      </div>

      <div class="hero-card">
        <div class="pill">Rezepte</div>
        <h1 class="hero-title">Was koche ich heute?</h1>
        <p class="hero-sub">
          Keine Idee, was heute auf den Teller kommt? Hol dir Inspiration für jeden Geschmack – von schnellen Alltagsgerichten bis zu kreativen Wochenend-Ideen.
        </p>
        <ul class="hero-points">
          <li>Mit der Zutaten-Suche sofort passende Rezepte sehen</li>
          <li>Zufallsrezept für schnelle Inspiration entdecken</li>
          <li>Eigene Lieblingsrezepte speichern und teilen</li>
        </ul>
        <div class="hero-actions">
          {#if currentRecipe}
            <a class="btn btn-primary" href="/Rezepte/{currentRecipe._id}">
              🍳 {currentRecipe.title}
            </a>
          {:else}
            <a class="btn btn-primary" href="/Rezepte">Rezepte entdecken</a>
          {/if}
          <a class="btn btn-ghost" href="/Rezepte">Alle Rezepte ansehen</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Schnellaktionen Grid -->
<section class="quick-actions">
  <div class="container">
    <div class="actions-grid">
      <div class="action-card">
        <div class="action-icon">🎲</div>
        <h3 class="action-title">Zufallsrezept</h3>
        <p class="action-description">Lass das Glück entscheiden und entdecke neue Rezepte</p>
        <button 
          onclick={pickRandomRecipe} 
          class="btn btn-primary"
          disabled={isSpinning || recipes.length === 0}
        >
          {isSpinning ? '🔄 Wählt aus...' : '🎰 Jetzt würfeln'}
        </button>
      </div>

      <div class="action-card">
        <div class="action-icon">🥕</div>
        <h3 class="action-title">Zutaten-Suche</h3>
        <p class="action-description">Gib Zutaten ein und finde passende Rezepte</p>
        <a href="/Zutaten" class="btn btn-primary">Zur Zutaten‑Suche</a>
      </div>

      <div class="action-card">
        <div class="action-icon">🔍</div>
        <h3 class="action-title">Rezepte durchsuchen</h3>
        <p class="action-description">Stöbere durch alle verfügbaren Rezepte und Filter</p>
        <a href="/Rezepte" class="btn btn-primary">Jetzt durchsuchen</a>
      </div>

      <div class="action-card">
        <div class="action-icon">➕</div>
        <h3 class="action-title">Neues Rezept</h3>
        <p class="action-description">Teile deine eigenen Lieblingsrezepte mit der Community</p>
        <a href="/Rezepte/create" class="btn btn-primary">Rezept erstellen</a>
      </div>
    </div>
  </div>
</section>

<!-- Zufalls-Rezept Modal -->
{#if showRandomRecipe && randomRecipe}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-overlay" onclick={closeRandomRecipe}>
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={closeRandomRecipe}>×</button>
      
      <div class="modal-header">
        <h2 class="modal-title">🎉 Dein Rezept wurde ausgewählt!</h2>
      </div>

      <div class="modal-body">
        <div class="modal-image">
          <img 
            src={randomRecipe.image || '/images/placeholder.jpg'} 
            alt={randomRecipe.title}
            onerror={(e) => (e.target.src = '/images/placeholder.jpg')}
          />
        </div>

        <div class="modal-info">
          <h3 class="recipe-title">{randomRecipe?.title || 'Rezept'}</h3>
          
          <div class="recipe-meta">
            {#if randomRecipe?.time}
              <span class="meta-item">⏱️ {randomRecipe.time} Min</span>
            {/if}
            {#if randomRecipe?.portions}
              <span class="meta-item">👥 {randomRecipe.portions} Portionen</span>
            {/if}
            {#if randomRecipe?.category && randomRecipe.category.length > 0}
              <span class="meta-item">🏷️ {randomRecipe.category[0]}</span>
            {/if}
          </div>

          {#if randomRecipe?.rating && randomRecipe.rating > 0}
            <div class="recipe-rating">
              <span class="stars">{'⭐'.repeat(Math.round(randomRecipe.rating))}</span>
              <span class="rating-text">{randomRecipe.rating.toFixed(1)}</span>
            </div>
          {/if}

          <div class="modal-actions">
            <button 
              type="button"
              onclick={goToRecipeDetail} 
              class="btn-view"
              disabled={!randomRecipe?._id}
            >
              🍳 Rezept ansehen
            </button>
            <button 
              type="button"
              onclick={pickRandomRecipe} 
              class="btn-retry"
            >
              🔄 Nochmal würfeln
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Letzte Kommentare Carousel -->
<section class="recent-comments-section">
  <div class="container">
    <div class="section-header">
      <h2 class="section-title">💬 Letzte Kommentare</h2>
      <p class="section-subtitle">Was unsere Community über die Rezepte sagt</p>
    </div>
    <div class="comments-shell">
      <CommentsCarousel comments={recentComments} />
    </div>
  </div>
</section>

<!-- Global Footer kommt aus +layout.svelte; lokales Duplikat entfernt -->

<style>
  /* Design System Variables */
  :global(:root) {
    --max-width: 1200px;
    --border-radius: 16px;
    --border-radius-sm: 12px;
    --shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
    --shadow-hover: 0 16px 48px rgba(15, 23, 42, 0.12);
    --spacing-section: 4.5rem;
    --spacing-lg: 3rem;
    --spacing-md: 2rem;
    --spacing-sm: 1rem;
    --surface: #ffffff;
    --surface-soft: #f5f7fb;
    --text-strong: #0f172a;
    --text-soft: #475569;
    --accent: linear-gradient(135deg, #635bff, #7c3aed);
    --primary: #635bff;
    --primary-strong: #4f46e5;
    --border-soft: #e2e8f0;
  }

  /* Container */
  .container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }

  /* Welcome Banner */
  .welcome-banner {
    background: var(--surface-soft);
    padding: 2.75rem 0 1.5rem;
  }

  .welcome-title {
    margin: 0 0 0.75rem;
    font-size: clamp(1.8rem, 3.2vw, 2.4rem);
    font-weight: 800;
    color: var(--text-strong);
    letter-spacing: -0.4px;
  }

  .welcome-lead {
    margin: 0 0 0.75rem;
    color: var(--text-soft);
    font-size: 1.05rem;
    line-height: 1.7;
  }

  .welcome-text {
    margin: 0;
    color: var(--text-soft);
    font-size: 1.02rem;
    line-height: 1.7;
  }

  .welcome-banner .container {
    max-width: 1080px;
  }

  /* Hero Section */
  .site-hero {
    background: var(--surface-soft);
    padding: calc(var(--spacing-section) + 0.5rem) 0;
  }

  .hero-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: calc(var(--spacing-lg) + 0.5rem);
    align-items: center;
  }

  .hero-visual {
    background: #0f172a;
    border-radius: 26px;
    overflow: hidden;
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.12);
    position: relative;
  }

  .hero-visual img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.5s ease;
  }

  .slideshow-indicators {
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
    padding: 0;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.2);
  }

  .indicator.active {
    background: white;
    width: 24px;
    border-radius: 5px;
  }

  .slide-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
    backdrop-filter: blur(4px);
  }

  .slide-arrow:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: translateY(-50%) scale(1.1);
  }

  .slide-arrow-left {
    left: 1rem;
  }

  .slide-arrow-right {
    right: 1rem;
  }

  .hero-card {
    background: var(--surface);
    border-radius: 24px;
    padding: calc(var(--spacing-lg) + 0.25rem);
    box-shadow: 0 14px 48px rgba(99, 91, 255, 0.08);
    border: 1px solid var(--border-soft);
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .pill {
    align-self: flex-start;
    background: #fce7f3;
    color: #be185d;
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.2px;
  }

  .hero-title {
    font-size: clamp(2.35rem, 4.2vw, 3.15rem);
    margin: 0;
    color: var(--text-strong);
    font-weight: 800;
    letter-spacing: -0.8px;
  }

  .hero-sub {
    color: var(--text-soft);
    font-size: clamp(1.02rem, 2.1vw, 1.12rem);
    line-height: 1.65;
    margin: 0;
  }

  .hero-points {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 0.5rem;
  }

  .hero-points li {
    color: var(--text-soft);
    font-size: 0.98rem;
    line-height: 1.5;
    padding-left: 1.6rem;
    position: relative;
  }

  .hero-points li::before {
    content: '•';
    position: absolute;
    left: 0.3rem;
    top: 0;
    color: var(--primary-strong);
    font-weight: 800;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  /* How It Works */
  .how-it-works {
    padding: calc(var(--spacing-section) - 0.5rem) 0;
    background: var(--surface-soft);
  }

  .how-title {
    color: var(--text-strong);
    font-size: clamp(1.6rem, 3vw, 2rem);
    font-weight: 800;
    text-align: center;
    margin: 0 0 2rem;
    letter-spacing: -0.2px;
  }

  .steps-grid-five {
    display: grid;
    grid-template-columns: repeat(5, minmax(180px, 1fr));
    gap: 1rem;
    max-width: 1400px;
    margin: 0 auto;
    justify-items: center;
  }

  @media (max-width: 1200px) {
    .steps-grid-five {
      grid-template-columns: repeat(4, minmax(180px, 1fr));
    }
  }

  @media (max-width: 1000px) {
    .steps-grid-five {
      grid-template-columns: repeat(3, minmax(180px, 1fr));
    }
  }

  @media (max-width: 800px) {
    .steps-grid-five {
      grid-template-columns: repeat(2, minmax(160px, 1fr));
    }
  }

  @media (max-width: 560px) {
    .steps-grid-five {
      grid-template-columns: 1fr;
    }
  }

  .step {
    background: var(--surface);
    border: 1px solid var(--border-soft);
    border-radius: 16px;
    padding: 1.1rem;
    text-align: center;
    position: relative;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 240px;
    display: flex;
    flex-direction: column;
    min-height: 180px;
    box-shadow: var(--shadow);
  }

  .step:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-hover);
  }

  .step-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .step-number {
    position: absolute;
    top: 0.6rem;
    right: 0.6rem;
    background: #e2e8f0;
    color: var(--text-strong);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 0.8rem;
  }

  .step-title {
    color: var(--text-strong);
    font-size: 1rem;
    font-weight: 800;
    margin: 0 0 0.5rem;
  }

  .step-description {
    color: var(--text-soft);
    font-size: 0.95rem;
    line-height: 1.55;
    margin: 0;
    flex-grow: 1;
  }

  /* Unified Button System */
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

  .btn-primary {
    background: var(--accent);
    color: white;
    box-shadow: var(--shadow);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  .btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .btn-ghost {
    background: white;
    color: var(--primary-strong);
    border: 1.5px solid var(--border-soft);
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
  }

  .btn-ghost:hover:not(:disabled) {
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-hover);
  }

  /* Section Headers (Unified) */
  .section-header {
    text-align: center;
    margin-bottom: var(--spacing-lg);
  }

  .section-title {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    color: #1e293b;
    margin: 0 0 0.75rem;
    font-weight: 800;
  }

  .section-subtitle {
    color: #64748b;
    font-size: clamp(1rem, 2vw, 1.125rem);
    margin: 0;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Quick Actions Grid */
  .quick-actions {
    padding: calc(var(--spacing-section) - 0.25rem) 0;
    background: var(--surface-soft);
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--spacing-md);
  }

  @media (max-width: 1200px) {
    .actions-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 960px) {
    .actions-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .actions-grid {
      grid-template-columns: 1fr;
    }
  }

  .action-card {
    background: var(--surface);
    border-radius: 20px;
    padding: calc(var(--spacing-md) + 0.25rem);
    box-shadow: 0 14px 40px rgba(15, 23, 42, 0.06);
    text-align: center;
    transition: all 0.25s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #e2e8f0;
  }

  .action-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-hover);
  }

  .action-icon {
    width: 64px;
    height: 64px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: #f3f4ff;
    color: var(--primary-strong);
    font-size: 2.25rem;
    margin-bottom: var(--spacing-sm);
    line-height: 1;
  }

  .action-title {
    font-size: 1.28rem;
    color: var(--text-strong);
    margin: 0 0 0.5rem;
    font-weight: 800;
  }

  .action-description {
    color: var(--text-soft);
    font-size: 0.98rem;
    line-height: 1.55;
    margin: 0 0 1.15rem;
    flex-grow: 1;
  }

  .action-card .btn {
    width: 100%;
    max-width: 240px;
  }

  /* Recent Comments Section */
  .recent-comments-section {
    padding: var(--spacing-section) calc(var(--spacing-section) * 1.5);
    background: var(--surface-soft);
  }

  .comments-shell {
    background: var(--surface);
    border-radius: 20px;
    padding: calc(var(--spacing-lg) + 1rem);
    box-shadow: 0 14px 38px rgba(15, 23, 42, 0.08);
    border: 1px solid var(--border-soft);
    min-height: 420px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .comments-shell > :global(*) {
    width: 100%;
    margin: 0 auto;
  }

  /* Random Recipe Modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: var(--spacing-sm);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: white;
    border-radius: var(--border-radius);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 1.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 1;
    color: #1e293b;
  }

  .modal-close:hover {
    background: white;
    transform: rotate(90deg);
    box-shadow: var(--shadow);
  }

  .modal-header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    padding: var(--spacing-md);
    border-radius: var(--border-radius) var(--border-radius) 0 0;
  }

  .modal-title {
    color: white;
    margin: 0;
    font-size: clamp(1.4rem, 3vw, 1.75rem);
    font-weight: 800;
  }

  .modal-body {
    padding: 0;
  }

  .modal-image {
    width: 100%;
    height: 320px;
    overflow: hidden;
  }

  .modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .modal-info {
    padding: var(--spacing-md);
  }

  .recipe-title {
    font-size: clamp(1.4rem, 3vw, 1.75rem);
    color: #1e293b;
    margin: 0 0 var(--spacing-sm);
    font-weight: 700;
  }

  .recipe-meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-sm);
  }

  .meta-item {
    color: #64748b;
    font-size: 1rem;
    font-weight: 500;
  }

  .recipe-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: var(--spacing-md);
  }

  .stars {
    font-size: 1.3rem;
  }

  .rating-text {
    color: #64748b;
    font-weight: 600;
    font-size: 1rem;
  }

  .modal-actions {
    display: flex;
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
  }

  .btn-view {
    flex: 1;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-sm);
    text-decoration: none;
    font-weight: 700;
    text-align: center;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }

  .btn-view:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  .btn-retry {
    flex: 1;
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-sm);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 1rem;
  }

  .btn-retry:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    :global(:root) {
      --spacing-section: 3rem;
      --spacing-lg: 2rem;
    }

    .hero-grid {
      grid-template-columns: 1fr;
    }

    .hero-card {
      order: -1;
    }

    .steps-grid-five {
      grid-template-columns: 1fr !important;
      gap: var(--spacing-sm);
    }

    .step {
      padding: 1.25rem;
      max-width: 100%;
      min-height: auto;
    }

    .modal-actions {
      flex-direction: column;
    }

    .btn-view,
    .btn-retry {
      width: 100%;
    }

    .modal-image {
      height: 240px;
    }
  }

  @media (max-width: 480px) {
    :global(:root) {
      --spacing-section: 2.5rem;
      --spacing-md: 1.5rem;
    }
  }

  /* Footer-Styles aus dieser Seite entfernt; global in +layout.svelte definiert */
</style>
