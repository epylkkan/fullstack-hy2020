

import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, useParams } from "react-router-dom";
import { Button, Divider, Header, Container, Icon } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, selectPatient, setDiagnoses } from "./state";
import { Patient, Gender, Entry, Diagnose  } from "./types";
import PatientListPage from "./PatientListPage";
import { EntryPage } from "./components/ListEntries";
import { HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry }  from "./components/ListEntries";


const App: React.FC = () => {
  
  const [, dispatch] = useStateValue();
  
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);    
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(        
          `${apiBaseUrl}/patients`
        );
        dispatch( setPatientList ( patientListFromApi ));        
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);


  React.useEffect(() => {          
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnose[]>(        
          `${apiBaseUrl}/diagnoses`
        );
        dispatch( setDiagnoses( diagnosesFromApi ));
      } catch (e) {
        console.error(e);
      }
    };
    fetchDiagnoses();
  }, [dispatch]);

  const assertNever = (value: Entry ): never => {  
    throw new Error(
      `Unknown entry type: ${JSON.stringify(value.type)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }>  = ({entry}) => {

    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry} />               
                                 
      case "OccupationalHealthcare":
        return <OccupationalHealthcareEntry entry={entry} /> 

      case "HealthCheck": 
      return <HealthCheckEntry entry={entry} />               

      default:
        return assertNever(entry); 
    }   
  }

  const SelectedPatient  = () => {        
    const id  = useParams<{ id: string }>().id;  
    const [{ patient }, dispatch] = useStateValue();

    React.useEffect(() => {            
      const fetchOnePatient =  async (id: string) => {
        try {           
        const { data: one } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`      
        );    
          if (patient.id !== id ) {
            dispatch( selectPatient (one));            
          } 
        } catch (e) {
          console.error(e);          
        }
      };   
      fetchOnePatient(id);            
    });
      
    //const entriesInitial: Entry[] = patient.entries;
    const entries: Entry[] = patient.entries.sort(function(a, b){
      var x = a.date.toLowerCase();
      var y = b.date.toLowerCase();
      if (x < y) {return 1;}
      if (x > y) {return -1;}
      return 0;
    });

    const genderIcon =  (patient.gender === Gender.Female) ? "venus" : ((patient.gender === Gender.Male)  ? "mars" : "genderless"); 

    return(
      <div>                                
          <h2>{patient.name} <Icon name={genderIcon} /></h2>
          ssn: {patient.ssn}<br/>
          occupation: {patient.occupation}
          <br/>
          <h4> Entries </h4>
          <div>               
            {entries.map((e, i) => <EntryDetails key={i} entry={e} />)}
          </div>  
          <br/><br/>
          <EntryPage/>                
      </div>
    )    
  };

  
  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
          <Route path="/patients/:id">
              <SelectedPatient />
          </Route>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
