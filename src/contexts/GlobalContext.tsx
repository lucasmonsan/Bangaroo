import { createContext, Dispatch, FC, ReactNode, useContext, useMemo, useReducer } from "react";

interface GlobalState {
  modal: string;
  cityId: string;
  country: string;
  footer: string;
  loading: boolean
}

interface GlobalAction {
  field: keyof GlobalState;
  payload: string | boolean;
}

const initialState: GlobalState = {
  modal: "",
  cityId: "",
  country: "Brazil",
  footer: "",
  loading: false
};

function globalReducer(state: GlobalState, action: GlobalAction): GlobalState {
  if (typeof state[action.field] !== typeof action.payload) {
    console.error(`Tipo incompatível para o campo ${action.field}`);
    return state; // Retorna o estado atual sem modificações
  }
  return { ...state, [action.field]: action.payload };
}

interface GlobalContextType {
  global: GlobalState;
  setGlobal: Dispatch<GlobalAction>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [global, setGlobal] = useReducer(globalReducer, initialState);
  const value = useMemo(() => ({ global, setGlobal }), [global]);
  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
