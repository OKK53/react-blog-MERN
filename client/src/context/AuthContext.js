import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "context/AuthReducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};
export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const data = {
    ...state,
    dispatch,
  };
  return <Context.Provider value={data}>{children}</Context.Provider>;
};
