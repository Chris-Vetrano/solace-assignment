import { ActiveFilters } from "./ActiveFilters";
import { Advocate } from "./Advocate";
import { FilterOptions } from "./FilterOptions";
import { Pagination } from "./Pagination";
import { Sort } from "./Sort";

export interface ApiResponse {
  data: Advocate[];
  pagination: Pagination;
  filters: ActiveFilters;
  sort: Sort;
  filterOptions: FilterOptions;
}
