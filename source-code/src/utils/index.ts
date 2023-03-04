import { flattenDeep, uniq } from "lodash";

export function createClasses(...classes: any[]) {
  return uniq(flattenDeep(classes)).filter(Boolean).join(" ");
}
