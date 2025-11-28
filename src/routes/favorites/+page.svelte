<script>
    import RecipeCard from "$lib/components/Recipecard.svelte";
    import { favorites } from "$lib/stores/favorites.js";

    let { data } = $props();
    
    // Abgeleiteter State - reagiert automatisch auf $favorites
    let favoriteRecipes = $derived(
        data.recipes.filter(r => $favorites.includes(r._id))
    );
</script>

<h1>Meine Rezepte</h1>
<p class="subtitle">Deine gespeicherten & eigenen Kreationen</p>

<div class="recipe-grid">
    {#if favoriteRecipes.length > 0}
        {#each favoriteRecipes as recipe}
            <RecipeCard {recipe} />
        {/each}
    {:else}
        <p>Du hast noch keine Rezepte gespeichert ❤️</p>
    {/if}
</div>

<style>
h1 {
    font-size: 2.2rem;
    margin-bottom: 0.3rem;
}

.subtitle {
    color: #777;
    margin-bottom: 2rem;
}

.recipe-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 1.5rem;
}
</style>
