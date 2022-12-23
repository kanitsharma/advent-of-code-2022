function range(start: number, end: number): number[] {
  let array: number[] = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  return array;
}

function getFullContainedRangeArrays(input: string) {
  const lines = input.split("\n");

  const rangeArray = lines.map((x) =>
    x.split(",").map((y) => {
      const arr = y.split("-").map(Number);
      return range(arr[0], arr[1]);
    })
  );

  const fullyContained = rangeArray.reduce((acc, x) => {
    const smallerIndexTuple = x[0].length < x[1].length ? [0, 1] : [1, 0];

    if (
      x[smallerIndexTuple[0]].filter((y) => x[smallerIndexTuple[1]].includes(y))
        .length === x[smallerIndexTuple[0]].length
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
  return fullyContained;
}

function getAnyContainedRangeArrays(input: string) {
  const lines = input.split("\n");

  const rangeArray = lines.map((x) =>
    x.split(",").map((y) => {
      const arr = y.split("-").map(Number);
      return range(arr[0], arr[1]);
    })
  );

  const anyContained = rangeArray.reduce((acc, x) => {
    const smallerIndexTuple = x[0].length < x[1].length ? [0, 1] : [1, 0];

    if (
      x[smallerIndexTuple[0]].filter((y) => x[smallerIndexTuple[1]].includes(y))
        .length > 0
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
  return anyContained;
}

export {};
