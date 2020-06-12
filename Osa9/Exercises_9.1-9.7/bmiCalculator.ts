
interface heightWeight {
    height: number;
    weight: number;
  }
  
  const parseArguments = (args: Array<string>): heightWeight => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  export const calculateBmi = (height: number, weight: number): string => {
    
    type bmi = number; 
    const bmi =  weight/(height*height/10000);

    switch(true) {

        case bmi < 25:
            return 'Normal (healthy weight)'; 

        case ((bmi >= 25) && (bmi < 30)): 
            return 'Overweight';

        case bmi > 30:
            return 'Obese';

        default:
            throw new Error('bmi not defined');
    }    
  }

  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));    

  } catch (e) {
      console.log('Error, something bad happened, message: ', e.message);
  }