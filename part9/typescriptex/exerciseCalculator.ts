interface ExerciseValues {
    dailyExerciseHours: Array<number>;
    target: number;

  }

export const parseExerciseArguments = (
    dailyExercises: Array<number>,
    target: number

  ): ExerciseValues => {
    if (!isNaN(target) && !dailyExercises.some(isNaN)) {
        return {
            dailyExerciseHours: dailyExercises,
            target: target,
        };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


export interface ReportSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const exerciseCalculator = (exercises: Array<number>, target: number): ReportSummary => {
    const reportSummary: ReportSummary = {
        periodLength: 0,
        trainingDays: 0,
        success: false,
        rating: 0,
        ratingDescription: '',
        target: 0,
        average: 0
    }

    reportSummary.periodLength = exercises.length;
    reportSummary.average = exercises.reduce((sum, exerciseHour) => sum + exerciseHour, 0) / reportSummary.periodLength;
    reportSummary.target = target;
    reportSummary.trainingDays = exercises.reduce(function (sum, exerciseHour) {
        if (exerciseHour > 0) {
            sum++
        }
        return sum
    }, 0)

    if (reportSummary.average < target / 2) {
        reportSummary.success = false;
        reportSummary.ratingDescription = 'you should at least try';
        reportSummary.rating = 1;
    }
    else if (reportSummary.average < target) {
        reportSummary.success = false;
        reportSummary.ratingDescription = 'not too bad but could be better';
        reportSummary.rating = 2;
    } else {
        reportSummary.success = true;
        reportSummary.ratingDescription = 'good work!';
        reportSummary.rating = 3;
    }

    return reportSummary;


}

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))