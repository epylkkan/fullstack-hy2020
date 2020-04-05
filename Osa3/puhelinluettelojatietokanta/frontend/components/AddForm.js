import React from 'react'

const AddForm = (props) => (

<form onSubmit={props.addPerson}>
        <div>
          <p>                 
          name: 
          <input 
          value={props.newName}
          onChange={props.handleNameChange}          
          />
          <br></br>       

          number:      
          <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}          
          />          
          </p>
        </div>

          <button type="submit">add</button>
</form>       
)

export default AddForm