<script>
  export let data;
  let recipe = data.recipe;
  
  // Wenn das Formular erfolgreich abgeschickt wurde, Seite neu laden
  import { enhance } from '$app/forms';
</script>

<div class="recipe-detail">
  <!-- Back Link -->
  <a href="/Rezepte" class="back-link">← Zurück zu Rezepten</a>

  <!-- Hero Section -->
  <div class="hero-section">
    <img 
      class="hero-image" 
      src={recipe.image || "/images/placeholder.jpg"} 
      alt={recipe.title}
      on:error={(e) => e.target.src = "/images/placeholder.jpg"}
    />
  </div>

  <!-- Content Section -->
  <div class="content-container">
    <!-- Title -->
    <div class="header">
      <h1>{recipe.title}</h1>
      <div class="meta-info">
        <span class="meta-item">⏱️ {recipe.time} Minuten</span>
        <span class="meta-item">👥 {recipe.portions} Portion{recipe.portions > 1 ? "en" : ""}</span>
        <span class="meta-item">
          ⭐ {recipe.rating.average}
          {#if recipe.rating.count > 0}
            <span class="rating-count-meta">({recipe.rating.count})</span>
          {/if}
        </span>
      </div>
    </div>

    <!-- Categories -->
    {#if recipe.category && recipe.category.length > 0}
      <div class="categories-section">
        {#each recipe.category as cat}
          <span class="category-tag">{cat}</span>
        {/each}
      </div>
    {/if}

    <!-- Two Column Layout -->
    <div class="two-columns">
      <!-- Left Column: Nutrition & Ingredients -->
      <div class="left-column">
        <!-- Nutrition Info -->
        {#if recipe.nutrition}
          <section class="section">
            <h2 class="section-title">💪 Nährwerte pro Portion</h2>
            <div class="nutrition-grid">
              <div class="nutrition-item">
                <span class="nutrition-label">Kalorien</span>
                <span class="nutrition-value">{recipe.nutrition.calories}</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-label">Protein</span>
                <span class="nutrition-value">{recipe.nutrition.protein}g</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-label">Kohlenhydrate</span>
                <span class="nutrition-value">{recipe.nutrition.carbs}g</span>
              </div>
              <div class="nutrition-item">
                <span class="nutrition-label">Fett</span>
                <span class="nutrition-value">{recipe.nutrition.fat}g</span>
              </div>
            </div>
          </section>
        {/if}

        <!-- Ingredients -->
        <section class="section">
          <h2 class="section-title">🛒 Zutaten</h2>
          <ul class="ingredients-list">
            {#each recipe.ingredients as ing}
              <li>{ing}</li>
            {/each}
          </ul>
        </section>
      </div>

      <!-- Right Column: Instructions -->
      <div class="right-column">
        <section class="section">
          <h2 class="section-title">👨‍🍳 Zubereitung</h2>
          <ol class="instructions-list">
            {#each recipe.steps as step, index}
              <li>
                <span class="step-number">{index + 1}</span>
                <span>{step}</span>
              </li>
            {/each}
          </ol>
        </section>
      </div>
    </div>

    <!-- Ratings Section -->
    <div class="ratings-section">
      <h2 class="section-title">⭐ Bewertungen & Kommentare</h2>

      <!-- Current Rating Summary -->
      <div class="rating-summary">
        <div class="rating-big">
          <span class="rating-number">{recipe.rating.average}</span>
          <span class="rating-stars">{"⭐".repeat(Math.round(recipe.rating.average))}</span>
        </div>
        <p class="rating-count">{recipe.rating.count} {recipe.rating.count === 1 ? "Bewertung" : "Bewertungen"}</p>
      </div>

      <!-- Add Rating Form -->
      <div class="add-rating-form">
        <h3>Deine Bewertung hinzufügen</h3>
        <form method="POST" action="?/addRating">
          <div class="form-group">
            <label for="stars">Sterne:</label>
            <div class="star-selector">
              {#each [5, 4, 3, 2, 1] as star}
                <input 
                  type="radio" 
                  name="stars" 
                  value={star} 
                  id="star-{star}"
                  required
                />
                <label for="star-{star}" class="star-label" data-value={star}>⭐</label>
              {/each}
            </div>
          </div>

          <div class="form-group">
            <label for="comment">Kommentar (optional):</label>
            <textarea 
              name="comment" 
              id="comment" 
              rows="4" 
              placeholder="Teile deine Erfahrung mit diesem Rezept..."
            ></textarea>
          </div>

          <button type="submit" class="btn-submit-rating">Bewertung absenden</button>
        </form>
      </div>

      <!-- Existing Ratings List -->
      {#if data.ratings && data.ratings.length > 0}
        <div class="ratings-list">
          <h3>{data.ratings.length} {data.ratings.length === 1 ? "Kommentar" : "Kommentare"}</h3>
          {#each data.ratings as rating}
            <div class="rating-card">
              <div class="rating-header">
                <span class="rating-stars-small">{"⭐".repeat(rating.stars)}</span>
                <span class="rating-date">{new Date(rating.createdAt).toLocaleDateString("de-DE")}</span>
              </div>
              {#if rating.comment}
                <p class="rating-comment">{rating.comment}</p>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <p class="no-ratings">Noch keine Bewertungen. Sei der Erste! 🎉</p>
      {/if}
    </div>

    <!-- Delete Button -->
    <div class="actions">
      <form method="POST" action="?/delete">
        <input type="hidden" name="id" value={recipe._id} />
        <button type="submit" class="btn-delete">🗑️ Rezept löschen</button>
      </form>
    </div>
  </div>
</div>

<style>
  .recipe-detail {
    max-width: 1200px;
    margin: 0 auto;
  }

  .back-link {
    display: inline-block;
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    margin-bottom: 2rem;
    transition: all 0.2s ease;
  }

  .back-link:hover {
    color: #0056b3;
    transform: translateX(-4px);
  }

  .hero-section {
    width: 100%;
    height: 400px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 3rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content-container {
    padding: 0 2rem 2rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #222;
  }

  .meta-info {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .meta-item {
    font-size: 1.1rem;
    color: #666;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rating-count-meta {
    font-size: 0.9rem;
    color: #999;
    font-weight: 400;
  }

  .categories-section {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  .category-tag {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .two-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 768px) {
    .two-columns {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .section {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #222;
    border-bottom: 3px solid #007bff;
    padding-bottom: 0.5rem;
  }

  .nutrition-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .nutrition-item {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    border-left: 4px solid #007bff;
  }

  .nutrition-label {
    display: block;
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .nutrition-value {
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
    color: #007bff;
  }

  .ingredients-list {
    list-style: none;
    padding: 0;
  }

  .ingredients-list li {
    padding: 0.8rem 0;
    padding-left: 2rem;
    position: relative;
    color: #333;
    border-bottom: 1px solid #eee;
  }

  .ingredients-list li:before {
    content: "✓";
    position: absolute;
    left: 0;
    color: #28a745;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .instructions-list {
    list-style: none;
    padding: 0;
    counter-reset: step-counter;
  }

  .instructions-list li {
    padding: 1.5rem;
    margin-bottom: 1rem;
    background: #f8f9fa;
    border-radius: 12px;
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    border-radius: 50%;
    font-weight: bold;
    flex-shrink: 0;
  }

  .actions {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid #eee;
  }

  .btn-delete {
    background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
  }

  .btn-delete:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(220, 53, 69, 0.4);
    background: linear-gradient(135deg, #c82333 0%, #a71d2a 100%);
  }

  /* Ratings Section */
  .ratings-section {
    margin-top: 4rem;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 16px;
  }

  .rating-summary {
    text-align: center;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .rating-big {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  .rating-number {
    font-size: 3rem;
    font-weight: bold;
    color: #ffc107;
  }

  .rating-stars {
    font-size: 1.5rem;
  }

  .rating-count {
    color: #666;
    font-size: 0.95rem;
  }

  .add-rating-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .add-rating-form h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.3rem;
    color: #333;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #555;
  }

  .star-selector {
    display: flex;
    gap: 0.5rem;
    flex-direction: row;
    justify-content: flex-start;
  }

  .star-selector input[type="radio"] {
    display: none;
  }

  .star-label {
    font-size: 2rem;
    cursor: pointer;
    transition: all 0.2s ease;
    filter: grayscale(100%);
    opacity: 0.4;
  }

  .star-selector input[type="radio"]:checked + .star-label {
    filter: grayscale(0%);
    opacity: 1;
  }

  .star-selector input[type="radio"]:checked ~ input[type="radio"] + .star-label {
    filter: grayscale(0%);
    opacity: 1;
  }

  .star-label:hover {
    filter: grayscale(0%);
    opacity: 1;
    transform: scale(1.1);
  }

  .star-selector:has(input[type="radio"]:hover) .star-label {
    filter: grayscale(100%);
    opacity: 0.4;
  }

  .star-selector input[type="radio"]:hover + .star-label,
  .star-selector input[type="radio"]:hover ~ input[type="radio"] + .star-label {
    filter: grayscale(0%);
    opacity: 1;
  }

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-family: inherit;
    font-size: 0.95rem;
    transition: border-color 0.2s ease;
    resize: vertical;
  }

  textarea:focus {
    outline: none;
    border-color: #007bff;
  }

  .btn-submit-rating {
    background: linear-gradient(135deg, #28a745 0%, #20873a 100%);
    color: white;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
  }

  .btn-submit-rating:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(40, 167, 69, 0.4);
    background: linear-gradient(135deg, #20873a 0%, #196f2e 100%);
  }

  .ratings-list {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .ratings-list h3 {
    margin: 0 0 1.5rem 0;
    font-size: 1.2rem;
    color: #333;
  }

  .rating-card {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
  }

  .rating-card:last-child {
    border-bottom: none;
  }

  .rating-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .rating-stars-small {
    font-size: 1.1rem;
  }

  .rating-date {
    color: #999;
    font-size: 0.85rem;
  }

  .rating-comment {
    color: #555;
    line-height: 1.6;
    margin: 0;
  }

  .no-ratings {
    text-align: center;
    color: #999;
    padding: 2rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .ratings-section {
      padding: 1rem;
    }

    .add-rating-form,
    .ratings-list {
      padding: 1.5rem;
    }

    .rating-number {
      font-size: 2.5rem;
    }
  }
</style>
