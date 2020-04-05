import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Notification from './components/Notification'
import AddForm from './components/AddForm'
import FilterForm from './components/FilterForm'
import numberService from './services/numbers'

const App = () => {

  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)
  const [ notificationType, setNotificationType] = useState()


  const getPersons = () => {
    numberService
    .getAll()
    .then(initialPersons => {setPersons(initialPersons)
    })
  }

  useEffect(() => {
    getPersons()
    console.log('effect')

  }, [])
  

  const addPerson = (event) => {
    event.preventDefault()
    
    let newId = 0
    let ids = new Uint32Array(persons.map(p => p.id))
    ids.sort().reverse();
  
    if (ids.length>0){
      newId = ids[0]+1
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: newId
    }
    
    const names = persons.map(p => p.name)    
    if (names.includes(newName, 0)){      
      if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)){
        updateNumber(personObject, newName)
      }      
    } else {     
      numberService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        notify('success', 'add', newName)
      })
      .catch(error => {
        notify('error', 'add', newName)
        getPersons()
      })
    }
  
    clear()
  }

  const updateNumber = (personObject, newName) => {
    const existingId = persons.find(person => person.name === newName).id
        numberService
        .update(existingId, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingId ? person : returnedPerson))          
          notify('success', 'update', newName)
        })
        .catch(error => {
          notify('error', 'update', newName)
          getPersons()
        })
  }
  
  const deletePerson = (id) => {    
         
    const name = persons.find(person => person.id === id).name  
    console.log(name)  
    
    if(window.confirm(`Delete ${name}`)) {
        numberService.del(id)
            .then(response => {                 
                setPersons(persons.filter(person => person.id !== id))
                notify('success', 'delete', name)
            })
            .catch(error => {
              notify('error', 'delete', name)
              getPersons()
            })
            .finally(() => {
              setPersons(persons.filter(person => person.id !== id))
          })
    }    
   }


  const clear = () => {
    setNewName('')
    setNewNumber('')
  }

  const notify = (type, action, name) => {

 console.log(type)
 console.log(action)
 console.log(name)

    if (type === 'success') {
      setNotificationType('success')
      switch (action) {
        case 'add':
          setNotification(`Added ${name}`)
          break;
        case 'update':
          setNotification(`Updated ${name}'s number`)
          break;
        case 'delete':
          setNotification(`Deleted ${name}'s number`)
          break;
        default:
      }} else if (action === 'add') {
          setNotificationType('error')
          setNotification(`Person validation failed for ${name}. Min length for name / number is 3/8 chrs respectively.`)           
    } else {
      setNotificationType('error')
      setNotification(`Information of ${name} has already been removed from server`)
    }
    setTimeout(() => {
      setNotification(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleFilterChange = (event) => {setNewFilter(event.target.value)}
  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  const personsToShow = newFilter ===
   '' ? persons : persons.filter(person =>
     person.name.toLowerCase().includes(newFilter.toLowerCase()))  


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} type={notificationType} />
      <FilterForm 
           newFilter={newFilter}
           handleFilterChange={handleFilterChange}  
      />
         
      <h2>Add new</h2>
      <AddForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      /> 

     <h2>Numbers</h2>
      <ul>      
        <Persons persons={personsToShow} deletePerson={deletePerson}/>           
      </ul>
    </div>
  )

}

export default App
