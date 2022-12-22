export function GetElfWithHighestCalories(caloryInput: string) {
  const caloryByElfArray = caloryInput.split("\n\n");
  const totalCaloryArray = caloryByElfArray.map((x) => {
    const count = x.split("\n").reduce((acc, x) => Number(x) + acc, 0);
    return count;
  });

  return Math.max(...totalCaloryArray);
}

export function GetTopThreeElfWithHighestCalories(caloryInput: string) {
  const caloryByElfArray = caloryInput.split("\n\n");
  const totalCaloryArray = caloryByElfArray
    .map((x) => {
      const count = x.split("\n").reduce((acc, x) => Number(x) + acc, 0);
      return count;
    })
    .sort((a, b) => b - a);

  return totalCaloryArray[0] + totalCaloryArray[1] + totalCaloryArray[2];
}
