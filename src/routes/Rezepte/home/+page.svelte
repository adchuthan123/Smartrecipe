<script>
  import RecipesHomePage from "$lib/components/RecipesHomePage.svelte";

  let { data } = $props();
</script>

<RecipesHomePage recipes={data.recipes} />
