import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { parseBmiArguments } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
import { parseExerciseArguments } from './exerciseCalculator';



const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});


app.get('/bmi', async function (req, res) {

    const heightInput = req.query.height;
    const weightInput = req.query.weight;

    if (!heightInput || !weightInput) {
        res.status(400);
        res.send({ error: 'missing parameter height or weight' });
    } else {
        try {
          const { height, weight } = parseBmiArguments(
            Number(heightInput),
            Number(weightInput)
          );
          const bmi = bmiCalculator(height, weight );
          res.send({
            weight: weight,
            height: height,
            bmi: bmi
          });
        } catch (e) {
          res.status(400);
          res.send({ error: e.message });
        }
    }
});

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.dailyexercises;
  const dailyTarget = req.body.target;

  if (!dailyExercises || !dailyTarget) {
    res.status(400);
    res.send({ error: 'missing parameter daily_exercises or target' });
  } else {
    try {
      const { target, dailyExerciseHours } = parseExerciseArguments(
        dailyTarget,
        dailyExercises
      );
      res.send(exerciseCalculator(dailyExerciseHours, target));
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});