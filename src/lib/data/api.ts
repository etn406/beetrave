import type { State } from '@vincjo/datatables/remote';

export async function reload(state: State) {
  const response = await fetch(`/api/single-tracks?${getSearchParams(state)}`);
  const { data, totalRows } = await response.json();
  state.setTotalRows(totalRows);
  return data ?? [];
};

function getSearchParams(state: State): URLSearchParams {
  const { pageNumber, rowsPerPage, sort, filters, search } = state;

  const searchParams = new URLSearchParams();

  searchParams.set('offset', `${(pageNumber - 1) * rowsPerPage}`);

  // let params = `offset=${(pageNumber - 1) * rowsPerPage}`;

  if (rowsPerPage) {
    // params += `&limit=${rowsPerPage}`;
    searchParams.set('limit', `${rowsPerPage}`);
  }

  if (sort) {
    // params += `&orderBy=${sort.orderBy}.${sort.direction ?? 'desc'}`;
    searchParams.set('orderBy', `${sort.orderBy}.${sort.direction}`);
  }

  if (filters) {
    // params += filters.map(({ filterBy, value }) => `&${filterBy}=${value}`).join();
    for (const { filterBy, value } of filters) {
      searchParams.set(`filterBy_${filterBy}`, String(value));
    }
  }

  if (search) {
    // params += `&q=${search}`;
    searchParams.set('q', search);
  }

  return searchParams;
};
