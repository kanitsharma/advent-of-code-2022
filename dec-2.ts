const Scores = {
  X: 1,
  Y: 2,
  Z: 3,
  A: 1,
  B: 2,
  C: 3,
};

const WinningOutcomes = [
  ["X", "C"],
  ["Y", "A"],
  ["Z", "B"],
];

const LoosingOutcomes = [
  ["X", "B"],
  ["Y", "C"],
  ["Z", "A"],
];

const drawOutcomes = [
  ["X", "A"],
  ["Y", "B"],
  ["Z", "C"],
];

function getFirstColumnChances(input: string) {
  const chancesArray = input.split("\n");
  const firstColumnChances = chancesArray?.map((x) => x.split(" ")[0]);
  const secondColumnChanges = chancesArray?.map((x) => x.split(" ")[1]);

  return [firstColumnChances, secondColumnChanges];
}

export function getTotalScore(input: string) {
  const [first, second] = getFirstColumnChances(input);
  const total = second.reduce((acc, x, i) => {
    const shapeScore = Scores[x];
    const outcomeScore =
      first[i] === WinningOutcomes[shapeScore - 1][1]
        ? 6
        : first[i] === drawOutcomes[shapeScore - 1][1]
        ? 3
        : 0;

    return acc + shapeScore + outcomeScore;
  }, 0);

  return total;
}

export function getTotalScoreForWhatToChoose(input: string) {
  const [first, second] = getFirstColumnChances(input);
  const total = second.reduce((acc, x, i) => {
    console.log(first[i], x)
    const shapeToChoose =
      x === "X"
        ? LoosingOutcomes.find(o => o[1] == first[i])?.[0]
        : x === "Y"
        ? drawOutcomes.find(o => o[1] == first[i])?.[0]
        : WinningOutcomes.find(o => o[1] == first[i])?.[0];

    const shapeScore = Scores[shapeToChoose || ""];
    const outcomeScore = x === "X" ? 0 : x === "Y" ? 3 : 6;

    console.log(shapeScore, outcomeScore)

    return acc + shapeScore + outcomeScore;
  }, 0);

  return total
}
