import { Modes } from "./constants";
import { SagaDescriptor, Store } from "./store";

const NULL_TASK: SagaDescriptor = {};

export function injectSagaFactory(store: Store, isValid?: boolean) {
  return function injectSaga(key: string, descriptor: SagaDescriptor = {}, args: any) {
    const newDescriptor: SagaDescriptor = {
      ...descriptor,
      mode: descriptor.mode || Modes.DEFAULT,
    };

    const { saga, mode } = newDescriptor;

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga && oldDescriptor.task) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== Modes.DAEMON && mode !== Modes.ONCE_TILL_UNMOUNT)
    ) {
      if (saga) {
        store.injectedSagas[key] = {
          ...newDescriptor,
          task: store.runSaga(saga, args),
        };
      }
    }
  };
}

export function ejectSagaFactory(store: Store, isValid: boolean) {
  return function ejectSaga(key: string) {
    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== Modes.DAEMON && descriptor.task) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === "production") {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = NULL_TASK; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: Store) {
  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
