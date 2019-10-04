import { History } from "history";
import { Reducer, Store as ReduxStore } from "redux";
import { useStore as reduxUseStore } from "react-redux";
import { Saga, Task } from "redux-saga";

import { Mode } from "./constants";

export interface SagaDescriptor {
    saga?: Saga;
    mode?: Mode;
    task?: Task;
}

export interface Sagas {  [key: string]: SagaDescriptor; }
export interface Reducers { [key: string]: Reducer; }

export interface Store extends ReduxStore {
    mergeReducers: (newReducers: Reducers) => void;
    injectedSagas: Sagas;
    injectedReducers: Reducers;
    runSaga: <S extends Saga>(saga: S, ...args: Parameters<S>) => Task;
    history: History;
    reducers: Reducers;
    select: <T>(selector: (state: any) => T | undefined) => T | undefined;
    [key: string]: any;
}

export const useStore = (): Store => {
    const store = reduxUseStore();

    if (store.hasOwnProperty("@b6y/store")) {
        return store as unknown as Store;
    }

    throw new Error("Store not present");
};

export { Reducer } from "redux";
