<script lang="ts" >
  import { reload } from '$lib/data/api';

  import Pagination from '$lib/datatable/components/Pagination.svelte';
  import RowCount from '$lib/datatable/components/RowCount.svelte';
  import RowsPerPage from '$lib/datatable/components/RowsPerPage.svelte';
  import Search from '$lib/datatable/components/Search.svelte';
  import ThFilter from '$lib/datatable/components/ThFilter.svelte';
  import ThSort from '$lib/datatable/components/ThSort.svelte';
  import type { Track } from '$lib/types';
    
  import type { State } from '@vincjo/datatables/remote';
  import { DataHandler } from '@vincjo/datatables/remote';
  import { onMount } from 'svelte';

  const handler = new DataHandler<Track>([], { rowsPerPage: 10, totalRows: 200 });
  const rows = handler.getRows();

  onMount(() => {
    handler.onChange((state: State) => reload(state));
    handler.invalidate();
  });
</script>

<div class="overflow-y-auto space-y-4">
	<header class="flex justify-between">
		<Search {handler} />
		<RowsPerPage {handler} />
	</header>
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="artist_sort">Artist</ThSort>
				<ThSort {handler} orderBy="title">Title</ThSort>
			</tr>
			<tr>
        <ThFilter {handler} filterBy="artist" />
				<ThFilter {handler} filterBy="title" />
			</tr>
		</thead>
		<tbody>
      {#if Array.isArray($rows) && $rows.length >= 0 }
        {#each $rows as row}
          <tr>
            <td>{row.artist}</td>
            <td>{row.title}</td>
          </tr>
        {/each}
      {/if}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>