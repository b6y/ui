import { History } from "history";
import { Reducer, Store as ReduxStore } from "redux";
import { Saga, Task } from "redux-saga";

import { Modes } from "./constants";

export interface SagaDescriptor {
    saga?: Saga;
    mode?: keyof Modes;
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
}

export { Reducer } from "redux";
