import { createContext, useContext, useReducer } from "react";
import { todosReducer } from "../reducers/todosReducer";

const TodosContext = createContext([]);
const DispatchContext = createContext([]);

export const TodosProvider = ({ children }) => {
  const [todoslist, todosDispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={ todoslist }>
      <DispatchContext.Provider value={ todosDispatch }>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodoslist = () => {
  return useContext(TodosContext);
};
export const useDispatch = () => {
  return useContext(DispatchContext);
};
