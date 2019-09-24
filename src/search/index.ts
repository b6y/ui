import { MessageDescriptor } from "react-intl";

import * as error from "@b6y/error";

export interface SortedField {
  name: string;
  priority: number;
  order: 1 | 0 | -1;
}

export interface Field {
  id: string;
  name?: string | MessageDescriptor;
  help?: string | MessageDescriptor;
  width?: number;
  type?: string;
  virtual?: boolean;
  path?: string;
  fields?: Field[];
  requires?: string[];
  renderValue?: (row: any) => any;
}

export interface Result {
  scrollId: string;
  total: number;
  totalUnfiltered: number;
  remaining: number;
  fromOffset: number;
  toOffset: number;
  totalOnPage: number;
  totalOfPages: number;
  currentPage: number;
  itemsPerPage: number;
  hasMore: boolean;
  items: any[];
}

export interface Query {
  scrollId: string;
  fields: Field[];
  sort: SortedField[];
  page: number;
  limit: number;
  search: any;
  previousSearch: any;
}

export class ResponseError extends Error {
  public errors: ReadonlyArray<error.Error>;
  constructor(errors: ReadonlyArray<error.Error>) {
    super("Request failed");

    this.errors = errors;
  }
}

export interface Adapter<AdapterContext> {
  run(query: Query, context: AdapterContext, state: any, env: any): Promise<Result>;
}
