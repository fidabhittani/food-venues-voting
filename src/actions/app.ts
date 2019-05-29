import { SET_MESSAGE, SET_LOADING, RESET_MESSAGE } from "../config/constants";

/**
 *  APP wide loader
 */
export const setLoading = (payload: any) => {
  return {
    type: SET_LOADING,
    payload
  };
};
/**
 * APP wide messages
 */
export const setMessage = (payload: any) => {
  return {
    type: SET_MESSAGE,
    payload
  };
};

/**
 * Reset App wide messages
 */
export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
