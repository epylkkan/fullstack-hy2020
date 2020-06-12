import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json()) 

interface result {
  weight: number;     
  height: number; 
  bmi: string;   
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {

  if ( isNaN(Number(_req.query.height)) || isNaN(Number(_req.query.weight)) )  {    
    res.send('error: malformatted parameters');
    return
 }

  const bmi:string = calculateBmi(Number(_req.query.height), Number(_req.query.weight) )

  let resultObj: result = {
    weight: Number(_req.query.weight),
    height: Number(_req.query.height),
    bmi: bmi,    
  }; 

  res.send(resultObj);

});


app.post('/exercises', (_req, res) => {

  if ( (!(_req.body.target)) || (!(_req.body.daily_exercises)) )  {         
     res.send('error: parameters missing');
     return;
  }
  
  let malformatted:boolean = false;

  if (isNaN(_req.body.target))  {    
     malformatted = true;           
  }   

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   _req.body.daily_exercises.forEach(function(item: any) {
      if (isNaN(item))  {
        malformatted = true;    
      }
  });    

  if (malformatted) {
     res.send('error: malformatted parameters');   
     return;
  }

  const target:number = Number(_req.body.target);
  const outcome:Array<number> = (_req.body.daily_exercises);
  res.json(calculateExercises(target, outcome));

});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

