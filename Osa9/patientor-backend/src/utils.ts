/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender, HealthCheckRating, Category, NewHealthCheckEntry, 
  NewHospitalEntry, NewOccupationalHealthcareEntry, Discharge, Diagnose } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isNumber = (num: any): num is number => {
    return typeof num === 'number' || num instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

 const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

 const isSSN = (ssn: string): boolean => {
    
    const day = Number(ssn.substring(0,2));
    const month = Number(ssn.substring(2,4));
    const year = Number(ssn.substring(4,6));
    const dash = ssn.substring(6,7);  
    const length = ssn.length; 

    if (!(day) || ((day < 0) || (day>31))) {return false}
    if (!(month) || ((month < 0) || (month>12))) {return false}
    if (!(year)) {return false}    
    if (dash !== '-') {return false}
    if (length !== 11) {return false}

    return true;     
  };

const parseNameOccupation = (nameOccupation: any): string => {
    if (!nameOccupation || !isString(nameOccupation)) {
      throw new Error('Incorrect or missing name or occupation: '.concat(nameOccupation));
    }
    return nameOccupation;
  };

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: '.concat(date));
    }
    return date;
 };

 const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender (female, male, other)');
    } 
    return gender;
 };
   
 const parseSSN = (ssn: string): string => {             
    if (!ssn || !isSSN(ssn)) {
        throw new Error('Incorrect or missing SSN (DDMMYY-????');
    }     
    return ssn;
 };

export const toNewPatient = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any; entries: Array<any> }): NewPatient => {
  const newEntry: NewPatient = {        
    name: parseNameOccupation(object.name),    
    dateOfBirth: parseDate(object.dateOfBirth),    
    ssn: parseSSN(object.ssn),
    entries: [],
    gender: parseGender(object.gender),
    occupation: parseNameOccupation(object.occupation),    
  };  
  return newEntry;
};

const parseHealthCheckRating = (rating: number): number => {    
  if (!(isNumber(rating))) {  
       throw new Error('Incorrect or missing health check rating');        
  } 
  if (rating < 0 || rating > 3) {    
    throw new Error('Incorrect or missing health check rating');      
  }    
  return rating;
};

const parseDescriptionSpecialistEmployername = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing description, specialist or employer: '.concat(param));
  }
  return param;
};

const parseDiagnosisCodes = (param: Array<string>): Array<string> => {

 if (!(Array.isArray(param)))  {
  throw new Error('Incorrect diagnosis codes ');
  }

  param.forEach(element => {
    if (!element || !isString(element)) {
      throw new Error('Incorrect diagnosis codes '.concat(element));
    }  
  });  
  return param;
};

const parseDischarge = (discharge: Discharge): Discharge => {
  if (!discharge.criteria || !isString(discharge.criteria) || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error('Incorrect or missing discharge information: '.concat(discharge.criteria).concat(discharge.date));
  }
  return discharge;
};

export const toNewHealthCheckEntry = (object: { description: string; date: string; specialist: string;
       diagnosisCodes: Array<Diagnose['code']>; type: Category; healthCheckRating: HealthCheckRating  }):
   NewHealthCheckEntry => {

  const newEntry: NewHealthCheckEntry = {        
    description: parseDescriptionSpecialistEmployername(object.description),    
    date: parseDate(object.date),    
    specialist: parseDescriptionSpecialistEmployername(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: Category.HealthCheck,     
    healthCheckRating: parseHealthCheckRating(object.healthCheckRating),  
  };  
  
 return newEntry; 
};

export const toNewOccupationalHealthcareEntry = (object: { description: string; date: string; specialist: string;
  diagnosisCodes: Array<Diagnose['code']>; type: Category; employerName: string  }): 
  NewOccupationalHealthcareEntry => {

  const newEntry: NewOccupationalHealthcareEntry = {        
    description: parseDescriptionSpecialistEmployername(object.description),    
    date: parseDate(object.date),    
    specialist: parseDescriptionSpecialistEmployername(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: Category.OccupationalHealthcare, 
    employerName: parseDescriptionSpecialistEmployername(object.employerName),     
  };  

 return newEntry; 
};

export const toNewHospitalEntry = (object: { description: string; date: string; specialist: string;
  diagnosisCodes: Array<Diagnose['code']>; type: Category; discharge: Discharge  }): NewHospitalEntry => {

  const newEntry: NewHospitalEntry = {        
    description: parseDescriptionSpecialistEmployername(object.description),    
    date: parseDate(object.date),    
    specialist: parseDescriptionSpecialistEmployername(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    type: Category.Hospital,      
    discharge: parseDischarge(object.discharge), 
  };  
   
 return newEntry; 
};

export default toNewPatient;