<script>
  export let data;
  let recipe = data.recipe;
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
        <span class="meta-item">⭐ {recipe.rating.average}</span>
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
</style>
