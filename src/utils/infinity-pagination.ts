import { IPaginationOptions } from './types/pagination-options';

export const infinityPagination = <T>(
  data: T[],
  options: IPaginationOptions,
  count: number,
) => {
  return {
    data,
    hasNextPage: data.length === options.limit,
    count,
  };
};
