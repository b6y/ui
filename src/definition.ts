import { createMemoryHistory, History } from "history";
import { AnyAction, Reducer, Store } from "redux";

import { configureStore } from "./redux/configureStore";
import { Theme } from "./styled";

export const initialState = {};

const storeFactory = (history: History, reducers: { [key: string]: Reducer }) =>
  configureStore(initialState, history, reducers);

export interface DefinitionParams {
  reducerCreator?: (injectedReducers: any) => Reducer<any, AnyAction>;
  messages?: any;
  reducers?: { [key: string]: Reducer };
  history?: History;
  store?: Store;
  theme?: (defaultTheme: Theme) => Theme;
  meta?: { [key: string]: any };
}

export class Definition {
  public reducerCreator?: (injectedReducers: any) => Reducer<any, AnyAction>;
  public messages: any;
  public reducers: { [key: string]: Reducer };
  public history: History;
  public store: Store;
  public theme: (defaultTheme: Theme) => Theme;
  public meta: { [key: string]: any };

  constructor(params: DefinitionParams) {
    this.reducers = params.reducers || {};

    if (!params.history) {
      params.history = createMemoryHistory();
    }

    this.history = params.history;
    this.messages = { ...params.messages };
    this.store = storeFactory(this.history, params.reducers || {});

    this.meta = params.meta || {};
    this.theme = (defaultTheme: Theme): Theme => {
      return defaultTheme;
    };
  }

  public withMessages(messages: any) {
    this.messages = messages;
    return this;
  }
}

export function createDefinition(definition: DefinitionParams): Definition {
  return new Definition(definition);
}
