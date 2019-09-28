import produce from "immer";
import { IS_SUBMITTING, REGISTER } from "./constants";
import { AnyAction } from "redux";

interface ChannelState {
  isSubmitting: boolean;
}

interface State {
  [key: string]: ChannelState;
}

interface Action extends AnyAction {
  data?: any;
}

// The initial state of the App
const initialState: State = {};
const defaultChannelState = (): ChannelState => ({
  isSubmitting: false,
});

function formikChannelComponentReducer(state = initialState, action: Action) {
  return produce<State>(state, (draft) => {
    const { data } = action;

    switch (action.type) {
      case REGISTER:
        draft[data] = defaultChannelState();
        return;
      case IS_SUBMITTING:
        draft[data.name].isSubmitting = data.state;
        return;
      default:
        return state;
    }
  });
}

export default formikChannelComponentReducer;
