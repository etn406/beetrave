import { trackColumns } from '$lib/data/track-columns';
import { getZodEnumFromObjectKeys } from '$lib/utils/get-zod-enum-from-object-keys';
import { asc, desc, ilike, SQL } from 'drizzle-orm';
import type { PgColumn, PgSelect } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { trackTable } from './schema';

type OrderBy = [PgColumn, 'asc' | 'desc' | null];

export type UncheckedSelectParams = {
  orderBy: [string, string][];
  limit: number;
  offset: number;
  filters: [string, string][];
};

export type SelectParams = {
  orderBy: [PgColumn, 'asc' | 'desc' | null][];
  limit: number;
  offset: number;
  filters: [PgColumn, string][];
};

const TrackTableColumnsEnum = getZodEnumFromObjectKeys(trackColumns);

export function applyOrderByToQuery<Q extends PgSelect>(query: Q, orderBy: OrderBy[]) {
  for (const [column, dir] of orderBy) {
    if (dir === 'asc') {
      query.orderBy(asc(column));
    }
    else if (dir === 'desc') {
      query.orderBy(desc(column));
    }
    else {
      query.orderBy(column);
    }
  }
}

export function getFiltersAsSQLLikes(filters: [PgColumn, string][]): SQL[] {
  const likes: SQL[] = [];

  for (const [col, value] of filters) {
    const startsWith = value.startsWith('^');
    const endsWith = value.endsWith('$');

    const escape = (s: string) => s
      .replace(/\\/g, '\\\\')
      .replace(/%/g, '\\%')
      .replace(/_/g, '\\_');

    if (startsWith && endsWith) {
      likes.push(ilike(col, `${escape(value.slice(1, -1))}`));
    }
    else if (startsWith) {
      likes.push(ilike(col, `${escape(value.slice(1))}%`));
    }
    else if (endsWith) {
      likes.push(ilike(col, `%${escape(value.slice(0, -1))}`));
    }
    else {
      likes.push(ilike(col, `%${escape(value)}%`));
    }
  }

  return likes;
}

export function checkParams(uncheckedParams: UncheckedSelectParams): SelectParams {
  const paramsSchema = z.object({
    orderBy: z.array(z.tuple([
      TrackTableColumnsEnum,
      z.enum(['asc', 'desc']),
    ]).or(z.tuple([
      TrackTableColumnsEnum,
    ]))).nonempty().max(3),
    limit: z.number().int().positive().max(100),
    offset: z.number().int().nonnegative(),
    filters: z.array(z.tuple([TrackTableColumnsEnum, z.string().min(1).max(128)])).max(5),
  });

  const { filters, limit, offset, orderBy } = paramsSchema.parse(uncheckedParams);

  return {
    filters: filters.map(([col, val]) => [trackTable[col], val]),
    limit,
    offset,
    orderBy: orderBy.map(([col, dir]) => [trackTable[col], dir ?? null]),
  };
}

export function parseParams(url: URL): UncheckedSelectParams {
  let orderBy: [string, string][] = url.searchParams
    .getAll('orderBy')
    .map(tupleStr => tupleStr.split('.'))
    .map(([col, dir]) => [col, dir ?? null]);

  if (orderBy.length === 0) {
    orderBy = [['added', 'desc']];
  }

  const filters: [string, string][] = [...url.searchParams.entries()]
    .filter(([key, value]) => key.startsWith('filterBy_') && value.length > 0)
    .map(([key, value]) => [key.slice('filterBy_'.length), value]);

  return {
    orderBy,
    limit: Number(url.searchParams.get('limit')) || 10,
    offset: Number(url.searchParams.get('offset')) || 0,
    filters,
  };
}
