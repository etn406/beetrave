import { db } from '$lib/server/db';
import { trackTable } from '$lib/server/db/schema';
import { applyOrderByToQuery, checkParams, getFiltersAsSQLLikes, parseParams, type SelectParams } from '$lib/server/db/select-tracks';
import { and, isNull, sql } from 'drizzle-orm';
import type { PgSelect } from 'drizzle-orm/pg-core';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const uncheckedParams = parseParams(url);
  const params = checkParams(uncheckedParams);

  const data = await getDataQuery(params);
  const totalRows = await getCountQuery(params);

  return new Response(JSON.stringify({
    data,
    totalRows: totalRows[0]?.totalRows ?? 0,
  }));
};

function getDataQuery(params: SelectParams): PgSelect {
  const query = db.select().from(trackTable).$dynamic();

  applyOrderByToQuery(query, params.orderBy);
  query.limit(params.limit);
  query.offset(params.offset);

  query.where(and(
    isNull(trackTable.album_id),
    ...getFiltersAsSQLLikes(params.filters),
  ));

  return query;
}

function getCountQuery(params: SelectParams): PgSelect {
  const query
  = db.select({ totalRows: sql`count(*) OVER()`.as('totalRows') })
    .from(trackTable)
    .limit(1)
    .$dynamic();

  query.where(and(
    isNull(trackTable.album_id),
    ...getFiltersAsSQLLikes(params.filters),
  ));

  return query;
}
