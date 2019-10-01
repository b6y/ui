import hoistNonReactStatic from "hoist-non-react-statics";
import React from "react";

import { DocumentNode } from "graphql";
import ApplicationContext from "../../core/Application/context";
import { Adapter, OptionType } from "../../core/SelectInput/adapter";
import { Definition } from "../../definition";
import clientCreator from "../client";

interface GraphQLParams {
  headers: { [key: string]: string };
}

interface GraphQLAdapterOptionsSearch {
  defaultFields: string[];
  text: string;
  props: any;
  page: number;
  limit: number;
}

interface GraphQLAdapterOptionsByIds {
  ids: any;
  props: any;
}

interface GraphQLAdapterOptionsResult {
  response: any;
  props: any;
  currentPage: number;
  fromOffset: number;
  hasMore: boolean;
  items: any[];
  itemsPerPage: number;
  remaining: number;
  toOffset: number;
  total: number;
  totalOfPages: number;
  totalOnPage: number;
  totalUnfiltered: number;
}

interface GraphQLAdapterOptionsByIdsResult {
  response: any;
  items: any[];
  props: any;
}

interface GraphQLAdapterOptionsByIdsQuery {
  query: DocumentNode;
  variables: any;
  transformResponse?: (response: any) => GraphQLAdapterOptionsByIdsResult;
  transform: (item: any, a: GraphQLAdapterOptionsByIdsResult) => OptionType;
}

interface GraphQLAdapterOptionsSearchQuery {
  query: DocumentNode;
  variables: any;
  transformResponse?: (response: any) => GraphQLAdapterOptionsResult;
  transform: (item: any, a: GraphQLAdapterOptionsResult) => OptionType;
}

export class GraphQLAdapterOptions {
  public endpoint: string;
  public searchQuery: (a: GraphQLAdapterOptionsSearch) => GraphQLAdapterOptionsSearchQuery;
  public byIdsQuery: (a: GraphQLAdapterOptionsByIds) => GraphQLAdapterOptionsByIdsQuery;
  public limit: number = 150;
  public headers: (ctx: Definition) => { [key: string]: string };

  constructor(
    endpoint: string,
    searchQuery: (a: GraphQLAdapterOptionsSearch) => GraphQLAdapterOptionsSearchQuery,
    byIds: (a: GraphQLAdapterOptionsByIds) => GraphQLAdapterOptionsByIdsQuery,
    headers: (a: Definition) => { [key: string]: string },
    limit: number = 150,
  ) {
    this.endpoint = endpoint;
    this.searchQuery = searchQuery;
    this.byIdsQuery = byIds;
    this.headers = headers;
    this.limit = limit;
  }
}

export class GraphQLAdapter extends Adapter {
  public options: GraphQLAdapterOptions;
  public params: (a: GraphQLAdapterOptions) => GraphQLParams;

  constructor(options: GraphQLAdapterOptions, params: (a: GraphQLAdapterOptions) => GraphQLParams) {
    super();

    this.options = options;
    this.params = params;
  }

  public search(input: string, props: any): Promise<OptionType[]> {
    const params = this.params(this.options);
    const client = clientCreator({
      headers: params.headers,
      endpoint: this.options.endpoint,
    });

    const query = this.options.searchQuery({
      text: input,
      defaultFields: [
        "currentPage",
        "fromOffset",
        "hasMore",
        "itemsPerPage",
        "remaining",
        "toOffset",
        "total",
        "totalOfPages",
        "totalOnPage",
        "totalUnfiltered",
      ],
      props,
      limit: this.options.limit,
      page: 1,
    });

    const transformResponse = query.transformResponse || ((res) => {
      const result = res.data.result;

      return {
        response: res,
        props,
        currentPage: result.currentPage,
        fromOffset: result.fromOffset,
        hasMore: result.hasMore,
        items: result.items,
        itemsPerPage: result.itemsPerPage,
        remaining: result.remaining,
        toOffset: result.toOffset,
        total: result.total,
        totalOfPages: result.totalOfPages,
        totalOnPage: result.totalOnPage,
        totalUnfiltered: result.totalUnfiltered,
      };
    });

    return client.query({
      query: query.query,
      variables: query.variables,
    }).then((res) => {
      const newRes = transformResponse(res);

      return newRes.items.map((item: any) => query.transform(item, newRes));
    });
  }

  public byIds(ids: any[], props: any): Promise<OptionType[]> {
    const params = this.params(this.options);
    const client = clientCreator({
      headers: params.headers,
      endpoint: this.options.endpoint,
    });

    const query = this.options.byIdsQuery({
      ids,
      props,
    });

    const transformResponse = query.transformResponse || ((res) => {
      return {
        items: res.data.result,
        response: res,
        props,
      };
    });

    return client.query({
      query: query.query,
      variables: query.variables,
    }).then((res) => {
      const newRes = transformResponse(res);

      return newRes.items.map((item: any) => query.transform(item, newRes));
    });
  }
}

export const withGraphQLAdapter = <K extends string, P, S>(
  key: K,
  WrappedComponent: React.ComponentType<P & { children?: React.ReactNode } & Record<K, GraphQLAdapter>>,
  options: GraphQLAdapterOptions,
): React.ComponentClass<Pick<P, Exclude<keyof P, K>>> => {
  class Enhance extends React.PureComponent<Pick<P, Exclude<keyof P, K>>> {
    public static contextType = ApplicationContext;

    public context!: React.ContextType<typeof ApplicationContext>;

    public render() {
      if (!this.context) {
        return null;
      }

      const adapter = new GraphQLAdapter(options, () => ({
        endpoint: options.endpoint,
        headers: options.headers(this.context!),
      }));

      const props: P & { children?: React.ReactNode } & Record<K, GraphQLAdapter> = {
        ...(this.props as any),
        [key as K]: adapter,
      };

      return <WrappedComponent {...props} />;
    }
  }

  return hoistNonReactStatic(Enhance, WrappedComponent);
};
