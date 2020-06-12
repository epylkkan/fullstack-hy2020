import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry  } from '../types';

const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const getNonSensitivePatients = (): NonSensitivePatient [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      entries,
      occupation
    }));
  };

const generateRandomString = (length=4): string=> {
    return Math.random().toString(20).substr(2, length); 
};

const addPatient = (entry: NewPatient): Patient => {
  
  const numbersForId: Array<number> =  patients.map(d => Number(d.id.substring(1, 5) ) +1 );    
  const nextNumberForId  =  Math.max(...numbersForId);      
  const nextNumberForIdAsString: string = nextNumberForId.toString();  
  const nextThreeRandomCharacters: string = generateRandomString(3);

  const firstLetterInId = "d";
  //const lastLettersInId = "xyz-f723-11e9-8f0b-362b9e155667";
  const lastLettersInId = "-f723-11e9-8f0b-362b9e155667";

  const newId = firstLetterInId.concat(nextNumberForIdAsString).concat(nextThreeRandomCharacters).concat(lastLettersInId);
  
  const newPatient = {    
    id: newId, 
    ...entry 
  };

  patients.push(newPatient);
  return newPatient;
};



export const addEntry = (patient: Patient, entry: NewEntry ): Entry => {

  const id_part1: string = generateRandomString(8).concat("-");
  const id_part2: string = generateRandomString().concat("-");
  const id_part3: string = generateRandomString().concat("-");
  const id_part4: string = generateRandomString().concat("-");
  const id_part5: string = generateRandomString(12);

  const newId: string  = id_part1.concat(id_part2).concat(id_part3).concat(id_part4).concat(id_part5);
  console.log(newId); 
  //'d811e46d-70b3-4d90-b090-4535c7cf8fb1',  

  const newEntry = {    
    id: newId, 
    ...entry, 
  };

  patient.entries.push(newEntry);
  return newEntry;
};


export default {
  getEntries,
  addPatient,
  addEntry,
  getNonSensitivePatients,
  findById
};

