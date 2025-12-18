<script>
    import RecipeCard from "$lib/components/RecipeCard.svelte";
    import { favorites } from "$lib/stores/favorites.js";

    let { data } = $props();
    
    // Abgeleiteter State - reagiert automatisch auf $favorites
    let favoriteRecipes = $derived(
        data.recipes.filter(r => $favorites.includes(r._id))
    );
</script>

<div class="page-wrap">
    <div class="page-header">
        <h1>Meine Rezepte</h1>
        <p class="subtitle">Deine gespeicherten & eigenen Kreationen</p>
    </div>

    <div class="recipe-grid">
    {#if favoriteRecipes.length > 0}
        {#each favoriteRecipes as recipe}
            <RecipeCard {recipe} />
        {/each}
    {:else}
        <p>Du hast noch keine Rezepte gespeichert ❤️</p>
    {/if}
    </div>
</div>

<style>
.page-wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1.25rem 2rem; /* Abstand links/rechts/oben */
}

.page-header { 
    margin-bottom: 1rem; 
}

h1 {
    font-size: 2.2rem;
    font-weight: 800;
    margin: 0 0 0.25rem 0; /* Überschrift klar platziert */
}

.subtitle {
    color: #777;
    margin: 0 0 1.25rem 0;
}

.recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.6rem;
}

@media (max-width: 768px) {
    .page-wrap { padding: 1rem 1rem 2rem; }
    h1 { font-size: 1.8rem; }
}
</style>
