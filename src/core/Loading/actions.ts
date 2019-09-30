import { SET_STATE } from "./constants";

export function setState(name: string, state: boolean) {
  return {
    type: SET_STATE,
    data: { name, state },
  };
}
