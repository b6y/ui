import { FetchResult } from "apollo-link";
import { DocumentNode } from "graphql";
import * as R from "ramda";

import * as error from "@b6y/error";

import { clientCreator } from "./client";

export interface CreateGraphQLParams {
  endpoint: string;
  headers?: { [key: string]: string };
}

export interface Variables {
  [key: string]: any;
}

export interface QueryOptions<TVariables = Variables> {
  query: DocumentNode;
  variables?: TVariables;
}

export interface MutateOptions<TVariables = Variables> {
  mutation: DocumentNode;
  variables?: TVariables;
}

export interface Response<TResponse = any> {
  result?: TResponse;
  errors: ReadonlyArray<error.Error>;
  successful: boolean;
}

export interface GraphQLMethods {
  query<TResponse = any>(resultKey: string, options: QueryOptions): Promise<Response<TResponse>>;
  mutate<TResponse = any>(resultKey: string, options: MutateOptions): Promise<Response<TResponse>>;
}

const upgradeErrors = (resultKey = "result", errors: any[]): error.Error[] => {
  return errors.map((x) => {
    let path = null;

    if (x.path) {
      const [head] = x.path;
      let [, ...localPath] = x.path;

      if (head !== resultKey) {
        localPath = [head, ...localPath];
      }

      if (Array.isArray(localPath) && localPath[0] !== "$") {
        localPath = ["$", ...localPath];
      }

      path = localPath;
    } else {
      path = ["$"];
    }

    return {
      path,
      key: path.join("."),
      message: x.message,
      meta: {
        extensions: x.extensions || {},
      },
    } as error.Error;
  });

  // return [
  //   {
  //     path: ["$"],
  //     key: "$",
  //     message: e.message,
  //     extensions: {},
  //   } as UpgradedError,
  // ];
};

export function createGraphQL(params: CreateGraphQLParams): GraphQLMethods {
  const wrap = <TResponse>(resultKey: string, promise: Promise<FetchResult<any>>): Promise<Response<TResponse>> =>
    promise
      .catch((ex) => {
        return {
          errors: upgradeErrors(resultKey, R.pathOr([], ["networkError", "result", "errors"], ex)),
          result: undefined,
          successful: false,
        } as Response<TResponse>;
      })
      .then((res) => {
        const errors = upgradeErrors(resultKey, R.pathOr([], ["errors"], res));

        return {
          errors,
          result: R.pathOr(undefined, ["data", resultKey], res),
          successful: errors.length < 1,
        } as Response<TResponse>;
      });

  const client = clientCreator(params);

  const mutate = <TResponse>(resultKey: string, options: MutateOptions): Promise<Response<TResponse>> =>
    wrap(resultKey, client.mutate<TResponse>(options));
  const query = <TResponse>(resultKey: string, options: QueryOptions): Promise<Response<TResponse>> =>
    wrap(resultKey, client.query<TResponse>(options));

  return { query, mutate };
}
