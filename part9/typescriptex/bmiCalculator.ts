
interface BmiInputs {
    height: number;
    weight: number;
}

export const parseBmiArguments = (
    height: number,
    weight: number
  ): BmiInputs => {
    if (!isNaN(height) && !isNaN(weight)) {
      return {
        height: height,
        weight: weight
      };
    } else {
      throw new Error('malformatted parameters');
    }
  };

export const bmiCalculator = (height: number, weight: number): string => {
    let index = weight / ((height / 100) ** 2)
    if (index <= 18.4) {
        return 'Underweight'
    } else if (index <= 24.9) {
        return 'Normal (healthy weight)'
    } else if (index <= 39.9) {
        return 'Overweight'
    } else {
        return 'Obese'
    }
}

console.log(bmiCalculator(180,74))