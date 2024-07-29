<script>
  export let data;
</script>

<div class="container mx-auto grid grid-cols-1">
  <h1>Albums</h1>
  <ul>
    {#each data.albums as album}
      <li>{album.id}: {album.name}</li>
    {/each}
  </ul>
</div>
