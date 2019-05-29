import { SET_LOADING, SET_MESSAGE, RESET_MESSAGE } from "./../config/constants";

/**
 *  Used Interfaces and types in app reducer
 */
interface ILoading {
  status: boolean;
  text: string;
}

interface IMessage {
  message: string;
  type: string;
  errorDetails?: any;
}

interface IState {
  loading: ILoading;
  message: null | IMessage;
}

const initialState = {
  loading: {
    status: false,
    text: ""
  },

  message: null
};

interface IAction {
  type: string;
  payload: any;
}

export default (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: {
          ...action.payload
        }
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: {
          ...action.payload
        }
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: null
      };

    default:
      return state;
  }
};
