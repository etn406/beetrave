<script lang="ts">
  export let data;
</script>

<h1 class="h1">Scripts</h1>

<form action="/script/beets-import" method="post">
  <button type="submit" class="variant-filled-primary btn"> Run script Beets Import </button>
</form>

<h2 class="h2">Scripts Logs</h2>

{#if Array.isArray(data.scripts) && data.scripts.length > 0}
  <ul>
    {#each data.scripts as script}
      <li>
        {script.name}
      </li>
    {/each}
  </ul>
{:else}
  <p class="italic">There's no script executions in the database.</p>
{/if}
