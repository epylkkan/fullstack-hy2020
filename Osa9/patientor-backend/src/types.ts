
export interface Diagnose {
  code: string; 
  name: string; 
  latin?: string; 
};

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',  
}

export enum Category {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',  
}

export interface Patient {
  id: string; 
  name: string; 
  dateOfBirth: string; 
  ssn: string; 
  gender: Gender;
  occupation: string; 
  entries: Entry[];
}

export interface Discharge {  
  date: string;
  criteria: string;  
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: { date: string, criteria: string }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewPatient = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn' >;

export type NewBaseEntry = Omit<BaseEntry, 'id'>;
export interface NewHealthCheckEntry extends NewBaseEntry {type: "HealthCheck"; healthCheckRating: HealthCheckRating}
export interface NewOccupationalHealthcareEntry extends NewBaseEntry  {type: "OccupationalHealthcare";employerName: string}
export interface NewHospitalEntry extends NewBaseEntry {type: "Hospital"; discharge: { date: string, criteria: string }}

export type NewEntry =
  | NewHospitalEntry
  | NewOccupationalHealthcareEntry
  | NewHealthCheckEntry;
