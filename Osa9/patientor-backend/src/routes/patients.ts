/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';
import  { toNewPatient, toNewHealthCheckEntry, toNewHospitalEntry, toNewOccupationalHealthcareEntry  } from '../utils';
import { NewPatient, NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {   
  res.send(patientService.getNonSensitivePatients());  
});

router.get('/:id', (_req, res) => {

  const patient = patientService.findById(_req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {    

  try {
     const newPatient = toNewPatient(_req.body);      
     // eslint-disable-next-line @typescript-eslint/no-unsafe-call
     const addedEntry: NewPatient = patientService.addPatient(newPatient); 
     res.json(addedEntry);
  } catch (e) {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
     res.status(400).send(e.message); 
  }

});

router.post('/:id/entries', (_req, res) => {    

  const patient = patientService.findById(_req.params.id);  
    
  if  (!(patient)){
    res.status(400).send("Incorrect or missing type (healthCheck, occupationalHealthcare, hospital)");     
    return; 
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const type: string  = _req.body.type; 

  let newEntry: NewEntry; 

  try {
     switch (type) {
      case "HealthCheck":       
         newEntry = toNewHealthCheckEntry(_req.body);      
         break; 

      case "OccupationalHealthcare":       
        newEntry= toNewOccupationalHealthcareEntry(_req.body);      
        break; 

      case "Hospital": 
        newEntry= toNewHospitalEntry(_req.body);      
        break; 

      default:       
        res.status(400).send("Not a correct type (HealthCheck, OccupationalHealthcare, Hospital"); 
        return; 
     }
    
     const addedEntry: NewEntry = patientService.addEntry(patient, newEntry); 
     res.json(addedEntry);
     
  } catch (e) {
     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
     res.status(400).send(e.message); 
  }

});


export default router;