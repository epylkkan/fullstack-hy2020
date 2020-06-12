import React from 'react';


const Total: React.FC<{ exercisesTotal: number }> = ({ exercisesTotal }) => (
  <p>
    Number of exercises{" "} {exercisesTotal}
 </p>
);


export default Total
