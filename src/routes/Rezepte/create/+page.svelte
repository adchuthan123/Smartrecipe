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

<div class="form-shell">
  <div class="page-header">
    <a href="/Rezepte" class="back-link">Zurück</a>
    <h1 class="page-title">Neues Rezept hinzufügen</h1>
    <p class="page-sub">Gib Basisdaten an, wähle Kategorien und erfasse Zutaten & Schritte.</p>
  </div>

  <form method="POST" action="?/create" class="create-form">
    <section class="section-card">
      <div class="section-header">
        <h2>Basis</h2>
        <span>Allgemeine Informationen</span>
      </div>

      <div class="grid-2">
        <div class="mb-3">
          <label class="form-label">Name des Rezepts</label>
          <input name="name" class="form-control" type="text" required />
        </div>

        <div class="grid-2 compact">
          <div class="mb-3">
            <label class="form-label">Dauer (Minuten)</label>
            <input name="duration" class="form-control" type="number" min="1" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Portionen</label>
            <input name="servings" class="form-control" type="number" min="1" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Bild-URL (optional)</label>
          <input name="image" class="form-control" type="text" placeholder="/images/placeholder.jpg" />
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Kategorien</label>
        <div class="category-chips">
          {#each availableCategories as cat}
            <label class="chip" class:active={selectedCategories.includes(cat.value)}>
              <input
                type="checkbox"
                value={cat.value}
                checked={selectedCategories.includes(cat.value)}
                onchange={() => toggleCategory(cat.value)}
              />
              <span class="chip-label">{cat.label}</span>
            </label>
          {/each}
        </div>
        <input type="hidden" name="categories" value={selectedCategories.join(',')} />
      </div>
    </section>

    <section class="section-card">
      <div class="section-header">
        <h2>Details</h2>
        <span>Zutaten & Zubereitung</span>
      </div>

      <div class="grid-2">
        <div class="mb-3">
          <label class="form-label">Zutaten (je Zeile eine)</label>
          <textarea name="ingredients" class="form-control" rows="10" placeholder="z.B.&#10;300g Hähnchenbrust&#10;1 TL Salz&#10;2 EL Öl"></textarea>
        </div>
        <div class="mb-3">
          <label class="form-label">Zubereitung (je Schritt eine Zeile)</label>
          <textarea name="instructions" class="form-control" rows="10" placeholder="z.B.&#10;Hähnchen würzen und anbraten&#10;Salat waschen&#10;Dressing anrühren"></textarea>
        </div>
      </div>
    </section>

    <div class="save-bar">
      <div class="save-info">
        Änderungen werden als neues Rezept gespeichert.
      </div>
      <div class="save-actions">
        <a href="/Rezepte" class="btn btn-light">Abbrechen</a>
        <button type="submit" class="btn btn-primary">Rezept hinzufügen</button>
      </div>
    </div>
  </form>
</div>

{#if form?.success}
  <p class="text-success mt-3">Rezept erfolgreich erstellt!</p>
{/if}

<style>
  .form-shell {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2rem 1.25rem 6rem;
  }

  .page-header { margin-bottom: 1rem; }

  .back-link {
    color: #007bff;
    text-decoration: none;
    display: inline-block;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }
  .back-link:hover { color: #0056b3; }

  .page-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
  }
  .page-sub { color: #666; margin-top: 0.25rem; }

  .create-form { display: grid; gap: 1.5rem; }

  .section-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    padding: 1.25rem 1.25rem 1.5rem;
  }

  .section-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 1rem; }
  .section-header h2 { font-size: 1.25rem; font-weight: 700; margin: 0; }
  .section-header span { color: #777; font-size: 0.95rem; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .grid-2.compact { grid-template-columns: 1fr 1fr; }

  .form-label { font-weight: 600; color: #333; margin-bottom: 0.5rem; display: block; }
  .form-control { border: 1px solid #ddd; border-radius: 8px; padding: 0.7rem 0.9rem; }
  .mb-3 { margin-bottom: 1rem; }

  .category-chips { display: flex; flex-wrap: wrap; gap: 0.6rem; }
  .chip { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.55rem 0.9rem; border: 1.5px solid #e3e7ee; border-radius: 999px; cursor: pointer; transition: all 0.18s ease; background: #fff; }
  .chip:hover { border-color: #007bff; }
  .chip.active { background: #f0f6ff; border-color: #78b3ff; }
  .chip input { display: none; }
  .chip-label { font-weight: 600; color: #333; }

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
  .btn-light { background: #f5f7fb; color: #333; }

  .save-bar {
    position: sticky;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(180deg, #ffffff 0%, #f6f8fb 100%);
    border: 1px solid #e9eef5;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
    margin-top: 0.5rem;
  }
  .save-info { color: #666; font-weight: 500; }
  .save-actions { display: flex; gap: 0.6rem; }

  @media (max-width: 900px) {
    .grid-2 { grid-template-columns: 1fr; }
    .form-shell { padding-bottom: 5.5rem; }
    .save-bar { bottom: 0; }
  }
</style>