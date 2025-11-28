<script>
  let { form } = $props();
  
  // Verfügbare Kategorien
  const availableCategories = [
    { id: 'vegan', label: '🌱 Vegan', value: 'Vegan' },
    { id: 'vegetarian', label: '🥬 Vegetarisch', value: 'Vegetarisch' },
    { id: 'protein', label: '💪 Proteinreich', value: 'Proteinreich' },
    { id: 'glutenfree', label: '🌾 Glutenfrei', value: 'Glutenfrei' },
    { id: 'calories', label: '🔥 Kalorienarm', value: 'Kalorienarm' }
  ];
  
  let selectedCategories = $state([]);
  
  function toggleCategory(value) {
    if (selectedCategories.includes(value)) {
      selectedCategories = selectedCategories.filter(c => c !== value);
    } else {
      selectedCategories = [...selectedCategories, value];
    }
  }
</script>

<a href="/Rezepte">Zurück</a>

<h1>Neues Rezept hinzufügen</h1>

<form method="POST" action="?/create">
  <div class="mb-3">
    <label class="form-label">Name des Rezepts</label>
    <input name="name" class="form-control" type="text" required />
  </div>

  <div class="mb-3">
    <label class="form-label">Dauer (Minuten)</label>
    <input name="duration" class="form-control" type="number" min="1" required />
  </div>

  <div class="mb-3">
    <label class="form-label">Portionen</label>
    <input name="servings" class="form-control" type="number" min="1" required />
  </div>

  <div class="mb-3">
    <label class="form-label">Kategorien</label>
    <div class="categories-container">
      {#each availableCategories as cat}
        <label class="category-checkbox">
          <input
            type="checkbox"
            value={cat.value}
            checked={selectedCategories.includes(cat.value)}
            onchange={(e) => toggleCategory(cat.value)}
          />
          <span class="category-label">{cat.label}</span>
        </label>
      {/each}
    </div>
    <!-- Hidden input for form submission -->
    <input type="hidden" name="categories" value={selectedCategories.join(',')} />
  </div>

  <div class="mb-3">
    <label class="form-label">Bild-URL (optional)</label>
    <input name="image" class="form-control" type="text" placeholder="/images/placeholder.jpg" />
  </div>

  <div class="mb-3">
    <label class="form-label">Zutaten (je Zeile eine)</label>
    <textarea name="ingredients" class="form-control" rows="5" placeholder="z.B.&#10;300g Hähnchenbrust&#10;1 TL Salz&#10;2 EL Öl"></textarea>
  </div>

  <div class="mb-3">
    <label class="form-label">Zubereitung (je Schritt eine Zeile)</label>
    <textarea name="instructions" class="form-control" rows="6" placeholder="z.B.&#10;Hähnchen würzen und anbraten&#10;Salat waschen&#10;Dressing anrühren"></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Rezept hinzufügen</button>
</form>

{#if form?.success}
  <p class="text-success mt-3">Rezept erfolgreich erstellt!</p>
{/if}

<style>
  a {
    color: #007bff;
    text-decoration: none;
    margin-bottom: 1rem;
    display: inline-block;
    font-weight: 500;
  }

  a:hover {
    color: #0056b3;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }

  .categories-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
  }

  .category-checkbox {
    display: flex;
    align-items: center;
    padding: 0.8rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: white;
  }

  .category-checkbox:hover {
    border-color: #007bff;
    background: #f8f9ff;
  }

  .category-checkbox input[type="checkbox"] {
    margin-right: 0.8rem;
    cursor: pointer;
    width: 18px;
    height: 18px;
    accent-color: #007bff;
  }

  .category-label {
    font-weight: 500;
    color: #333;
  }

  .category-checkbox input[type="checkbox"]:checked ~ .category-label {
    color: #007bff;
    font-weight: 600;
  }

  .form-label {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    display: block;
  }

  .form-control {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0.6rem 0.8rem;
    font-size: 1rem;
    width: 100%;
  }

  .mb-3 {
    margin-bottom: 1.5rem;
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  }

  .text-success {
    color: #28a745;
    font-weight: 600;
    margin-top: 1rem;
  }
</style>