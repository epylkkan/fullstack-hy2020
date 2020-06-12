
import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection, TypeOption, NumberField } from "./FormField";
import { Patient, HealthCheckRating, Type } from "../types";
import { useStateValue } from "../state";

/*
 * use type Entry, but omit id and entries,
 * because those are irrelevant for new entry object.
 */
export type EntryFormValues = Omit<Patient, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const typeOptions: TypeOption[] = [
  { value: Type.HealthCheck, label: "Health Check" },
  { value: Type.OccupationalHealthcare , label: "Occupational Healthcare" },
  { value: Type.Hospital , label: "Hospital" }
];

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): boolean => {
  if (!date || !isString(date) || !isDate(date)) {      
      return false;
  }
  return true;
};


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [xType, setXtype] = useState(Type.HealthCheck);

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: xType,      
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: "", 
        discharge: {date: "", criteria: ""}         
      }}

      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateError = "Date format has to be YYYY-MM-DD";
        const errors: { [field: string]: string } = {};
         
        if (!(values.description)) {
          errors.description = requiredError;
        }
        
        if (values.date) { 
            //console.log(parseDate(values.date));
            if (!(parseDate(values.date))) {                
               errors.date = dateError;
            }
        }

        if (!(values.date)) {                
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }        

        if (values.type === Type.OccupationalHealthcare) {
           setXtype(Type.OccupationalHealthcare);         
           if (!values.employerName) {
            errors.employerName = requiredError;
           }
        }
        if (values.type === Type.HealthCheck) {          
            setXtype(Type.HealthCheck);
        }                
        if (values.type === Type.Hospital) {          
            setXtype(Type.Hospital);
            
            if (!(values.discharge.date) || (!values.discharge.criteria)) {
              errors.discharge = requiredError;
             }
             if (values.discharge.date) { 
              //console.log(parseDate(values.discharge.date));
              if (!(parseDate(values.discharge.date))) {                
                 errors.discharge = dateError;
              }
            }                        
        }
        //console.log(xType)            
  
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"             
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
            />  
            <Field component="div" name="myRadioGroup">
            <input
              type="radio"
              id="radioHealthCheck"
              defaultChecked={xType === Type.HealthCheck}                            
              name="type"
              value={Type.HealthCheck}                              
            />      
            <label htmlFor="radioHealthCheck"> Health Check  </label>

            <input
              type="radio"
              id="radioOccupationalHealthcare"
              defaultChecked={xType === Type.OccupationalHealthcare}              
              name="type"
              value={Type.OccupationalHealthcare}                            
            />
            <label htmlFor="radioOccupationalHealthcare"> Occupational Health Care   </label>
     
            <input
              type="radio"
              id="radioHospital"
              defaultChecked={xType === Type.Hospital}
              name="type"
              value={Type.Hospital}                            
            />
            <label htmlFor="radioHospital"> Hospital</label>
            </Field>
             <br/>
             {
             xType === Type.HealthCheck ? 
             <Field
             label="Health Check Rating"
             name="healthCheckRating"
             component={NumberField}
             min={0}
             max={3}
             /> : 
             xType === Type.OccupationalHealthcare ? 
             <Field
             label="Employer"
             name="employerName"
             component={TextField}             
             /> : 
             <div> 
              <Field
              label="Discharge Date"
              name="discharge.date"
              placeholder="YYYY-MM-DD"             
              component={TextField}                          
              />    
              <Field
              label="Discharge Criteria"
              name="discharge.criteria"             
              placeholder="discharge criteria"
              component={TextField}                          
              />    
              <br/>
             </div>                      
             }

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
