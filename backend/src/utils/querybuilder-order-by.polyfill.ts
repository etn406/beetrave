import { FindOptionsOrder, FindOptionsOrderValue, ObjectLiteral, OrderByCondition } from "typeorm";

type DeprecatedOrderValue = Extract<OrderByCondition[string], object>;
type DeprecatedDirection = DeprecatedOrderValue['order'];
type DeprecatedNulls = NonNullable<DeprecatedOrderValue['nulls']>

type Direction = Exclude<FindOptionsOrderValue, object>;
type Nulls = NonNullable<Extract<FindOptionsOrderValue, object>['nulls']>;

const directions: Direction[] = [1, -1, 'asc', 'ASC', 'desc', 'DESC'];

const DEFAULT_DIRECTION: Direction = 'ASC';
const DEFAULT_NULLS: Nulls = 'LAST';

function mapDirection(direction: Direction): DeprecatedDirection {
  if (direction === 1 || direction === 'asc' || direction === 'ASC') {
    return 'ASC'
  } else if (direction === -1 || direction === 'desc' || direction === 'DESC') {
    return 'DESC';
  } else {
    throw new Error(`Invalid order 'direction' value: ${direction}`)
  }
}

function mapNulls(nulls: Nulls): DeprecatedNulls {
  const nullsUpc = nulls.toUpperCase();
  if (nullsUpc === 'FIRST') {
    return 'NULLS FIRST';
  } else if (nullsUpc === 'LAST') {
    return 'NULLS LAST';
  } else {
    throw new Error(`Invalid order 'nulls' value: ${nulls}`)
  }
}

/**
 * Map an object FindOptionsOrder to the deprecated OrderByCondition type.
 * @see https://github.com/typeorm/typeorm/issues/10905
 * @param qb 
 * @param order 
 */
export function mapFindOptionsOrderToDeprecatedOrderByCondition<E extends ObjectLiteral>(order: FindOptionsOrder<E>): OrderByCondition {
  const deprecatedOrder: OrderByCondition = {};

  for (const [key, value] of Object.entries(order) as [string, FindOptionsOrderValue][]) {
    if (typeof value === 'object') {
      const deprecatedOrderValue: DeprecatedOrderValue = {
        order: mapDirection(value.direction ?? DEFAULT_DIRECTION),
        nulls: mapNulls(value.nulls ?? DEFAULT_NULLS),
      };

      if (value.nulls) {
        deprecatedOrderValue.nulls = mapNulls(value.nulls);
      }

      deprecatedOrder[key] = deprecatedOrderValue

    } else if (directions.includes(value)) {
      deprecatedOrder[key] = {
        order: mapDirection(value),
      }
    } else {
      throw new Error(`Invalid FindOptionsOrder object for key "${key}"`);
    }
  }

  console.log({ order, deprecatedOrder })

  return deprecatedOrder;
}