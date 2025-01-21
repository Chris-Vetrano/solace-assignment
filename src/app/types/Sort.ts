import { SortField } from "./SortField";
import { SortOrder } from "./SortOrder";

export interface Sort {
  field: SortField;
  order: SortOrder;
}
