import React from 'react'

const FilterForm = (props) => (

<form>
   <div>           
       find countries: 
       <input
         value={props.filter}
         onChange={props.handleFilterChange}                   
       />      
   </div>                      
 </form>       
   
)

export default FilterForm