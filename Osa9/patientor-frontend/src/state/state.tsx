

import React, { createContext, useContext, useReducer } from "react";
import { Patient, Gender, Diagnose } from "../types";
import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient },
  patient: Patient, 
  diagnoses: { [id: string]: Diagnose },
  diagnose: Diagnose, 
};

const initialState: State = {
  patients: {}, 
  patient: {id: "", name: "", occupation: "", gender: Gender.Female, ssn:"", dateOfBirth: "", entries:[]},
  diagnoses: {}, 
  diagnose: {code: "", name: "", latin: ""},  
};


export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
// eslint-disable-next-line
export const useStateValue = () => useContext(StateContext);
