
    import React from "react";
    import { Entry, Diagnose } from "../types";  
    import { useStateValue, selectPatient } from "../state";
    import { Table, Button, Icon } from "semantic-ui-react";
    import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
    import AddEntryModal from "../AddEntryModal";
    import axios from "axios";
    import { apiBaseUrl } from "../constants";

    export const EntryPage: React.FC = () => {

        const [{ patient }, dispatch] = useStateValue();
        const [modalOpen, setModalOpen] = React.useState<boolean>(false);    
        const [error, setError] = React.useState<string | undefined>();
        const openModal = (): void => setModalOpen(true);
        const closeModal = (): void => {
          setModalOpen(false);
          setError(undefined);
        };
    
        const submitNewEntry = async (values: EntryFormValues ) => {
                 
            try {
                const { data: newEntry } = await axios.post<Entry>(
                `${apiBaseUrl}/patients/${patient.id}/entries`,
                values    
            );                                  
            closeModal(); 
             
            patient.entries.push(newEntry);
            dispatch( selectPatient (patient));  
            
            } catch (e) {
                console.error(e.response.data);
                setError(e.response.data.error);
            }                        
        }

        return(
        <div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>            
        </div>
        )
    };

    const toPrint = (entry: Entry, diagnoses: { [x: string]: Diagnose; }) => {
    
        // console.log(entry)
        let diagnose: Diagnose = {code: "", name: "", latin: ""};     
        let diagnosesToPrint: Array<Diagnose> = []; 

        if (entry.diagnosisCodes !== undefined ) {
            entry.diagnosisCodes.map( (d: string ) =>  {       
            diagnose = diagnoses[d];           
            if (diagnose) {
                diagnosesToPrint.push(diagnose);            
            }
        });
        }
        return diagnosesToPrint;
       
    }

    //export const AddPatientForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
    export const HospitalEntry: React.FC<{ entry: Entry }>  = ({entry }) => {
        
        const [{ diagnoses }] = useStateValue();           
        const diagnosesToPrint: Array<Diagnose> = toPrint(entry, diagnoses);                        

        return(
            <div>
            <Table celled>
            <Table.Body>
                <Table.Row>
                    <Table.Cell> 
                        <b>{entry.date}</b><Icon name="ambulance" /><i>{entry.description}</i><br/><br/>
                        {diagnosesToPrint.map( (d: Diagnose, i: number) => ( <li key={i}> {d.code} {d.name}  </li>)) }
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
            </Table>      
           </div>                    
        );

    }

    //<Button onClick={() => openModal()}>Add New Entry</Button>
    export const OccupationalHealthcareEntry: React.FC<{ entry: Entry }>  = ({entry}) => {
            
        const [{ diagnoses }] = useStateValue();           
        const diagnosesToPrint: Array<Diagnose> = toPrint(entry, diagnoses);                     

        return(
            <div>
            <Table celled>            
            <Table.Body>
                <Table.Row>
                    <Table.Cell> 
                        <b>{entry.date}</b><Icon name="industry" /><i>{entry.description}</i><br/><br/>             
                        {diagnosesToPrint.map( (d: Diagnose, i: number) => ( <li key={i}> {d.code} {d.name}  </li>)) }            
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
            </Table>            
            </div>         
        );

    }

    export const HealthCheckEntry: React.FC<{ entry: Entry }>  = ({entry}) => {

        const [{ diagnoses }] = useStateValue();           
        const diagnosesToPrint: Array<Diagnose> = toPrint(entry, diagnoses);                
        
        const heartIconColor =  
            (entry.type === "HealthCheck") ? 
                 ((entry.healthCheckRating === 0) ? "green": 
                      ((entry.healthCheckRating === 1) ? "yellow" : "red")) : "red";                                        

        return(
            <div>
            <Table celled>                           
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <b>{entry.date}</b><Icon name="stethoscope"/> <i>{entry.description}</i><br/>                                
                        {diagnosesToPrint.map( (d: Diagnose, i: number) => ( <li key={i}> {d.code} {d.name} </li> )) }                                           
                        <Icon color={heartIconColor} name="heart" />      
                    </Table.Cell>                    
                </Table.Row>
            </Table.Body>
             </Table>                       
            </div>         
        );        
     
    }