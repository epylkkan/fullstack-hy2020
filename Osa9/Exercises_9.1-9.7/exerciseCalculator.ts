
interface targetOutcome {
    target: number;
    outcome: Array<number>;
  }
  
interface result {
    periodLength: number;     
    trainingDays: number; 
    success: boolean; 
    rating: number; 
    ratingDescription: string; 
    target: number;
    average: number;         
}

  const parseArguments = (args: Array<string>): targetOutcome => {
    
    if (args.length < 4) throw new Error('Not enough arguments');
    
    const numberOfParameters = args.length;
    const targetAndPracticesAsString: Array<string> = args.slice(2, numberOfParameters);   

    targetAndPracticesAsString.forEach(function(item) {
        if (isNaN(Number(item)))  {
           throw new Error('Provided values were not numbers!');
        }
    });    

    const targetAndPracticesAsNumbers = targetAndPracticesAsString.map( a => Number(a) );            
        
    return {                
        target: targetAndPracticesAsNumbers[0],
        outcome: targetAndPracticesAsNumbers.slice(1, numberOfParameters-1)        
    }
  }

  const printResult = (printThis: result) => console.log(printThis);

  export const calculateExercises = (target: number, outcome: Array<number>):result => {
      
      const periodLength: number = outcome.length; 
      const trainingDays: number = outcome.filter(o => Number(o) > 0).length;            
      const average: number =  outcome.reduce((a: number, b: number) => a + b) / outcome.length;      

      let ratingDescription: string  =  "Good job !"; 
      let success: boolean = false; 
      let rating: number = 2;

      if (average >= target) {
        success = true; 
        ratingDescription = "Great job !";
        rating = 3;
      };            
      
      let objToPrint: result = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success, 
        rating: rating,
        ratingDescription: ratingDescription, 
        target: target, 
        average: average
      }; 
                
        
      printResult(objToPrint);      
      
      return objToPrint;

  }

  try {
    const { target, outcome } = parseArguments(process.argv);
    calculateExercises(target, outcome);    

  } catch (e) {
      console.log('Error, message: ', e.message);
  }