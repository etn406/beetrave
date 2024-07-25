<script>
  export let data;
</script>

<h1>Albums</h1>
<ul>
  {#each data.albums as album}
    <li>{album.id}: {album.name}</li>
  {/each}
</ul>
