import { createStore, combineReducers } from "redux";

import { reducer as holdMenuReducer } from "./src/data/HoldMenuReducer";

const appReducer = combineReducers({
  HoldMenu: holdMenuReducer,
});

export const store = createStore(appReducer, {});

/**
 * @param {object} initialState
 * @param {boolean} options.isServer indicates whether it is a server side or client side
 * @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
 * @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
 * @param {boolean} options.debug User-defined debug mode param
 * @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR
 */
export const makeStore = (initialState: any, options: any) => {
  return store;
};
