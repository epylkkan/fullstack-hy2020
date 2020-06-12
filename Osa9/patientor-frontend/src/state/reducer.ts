

import { State } from "./state";
import { Patient, Diagnose, Entry } from "../types";
//import { useStateValue } from "./state";


export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
     }
  | {
      type: "SELECT_PATIENT";
      payload: Patient;
    }
  | {    
      type: "SET_DIAGNOSE_LIST";
      payload: Diagnose[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":      
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };

    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };

    case "SELECT_PATIENT":        
       return {  ...state,        
        patient: action.payload
        };
        
    case "SET_DIAGNOSE_LIST":        
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
              {}
            ),
            ...state.diagnoses
          }
        };            

    default:
      return state;
    };
  }


  export const setPatientList = (patientListFromApi: Patient[]): Action => {    
    return (
     { type: "SET_PATIENT_LIST", payload: patientListFromApi }
     );      
  }

  export const selectPatient = (one: Patient): Action => {         
    return (
     { type: "SELECT_PATIENT", payload: one }
     );      
  }

  export const setDiagnoses = (diagnosesFromApi: Diagnose[]): Action => {    
    return (
     { type: "SET_DIAGNOSE_LIST", payload: diagnosesFromApi }
     );      
  }


