type x = number;
type y = number;
type Point = [x, y];
type Grid = Map<y, Map<number, string>>;

function getSensorAndBeacons(input: string): Array<[Point, Point]> {
  return input.split("\n").map((x) => {
    const m = x.match(/\-?\d+/g)?.map(Number);
    return [[m?.[0], m?.[1]] as Point, [m?.[2], m?.[3]] as Point];
  });
}

function generateGrid(sAndB: Array<[Point, Point]>): Grid {
  const sortedX = sAndB
    .flat()
    .map((x) => x[0])
    .sort((a, b) => a - b);

  const sortedY = sAndB
    .flat()
    .map((x) => x[1])
    .sort((a, b) => a - b);

  const grid: Grid = new Map();

  for (
    let i = Math.min(sortedY[0], sortedX[0]);
    i <= sortedY.slice(-1)[0];
    i++
  ) {
    for (
      let j = Math.min(sortedY[0], sortedX[0]);
      j <= sortedX.slice(-1)[0];
      j++
    ) {
      if (!grid.get(i)) {
        grid.set(i, new Map());
      }
      grid.get(i)?.set(j, ".");
    }
  }

  sAndB.forEach((lines) => {
    const sensor = lines[0];
    const beacon = lines[1];
    grid.get(sensor[1])?.set(sensor[0], "S");
    grid.get(beacon[1])?.set(beacon[0], "B");
  });

  return grid;
}

// |x1 - x2| + |y1 - y2|
function getManhattenDistance(sensor: Point, beacon: Point) {
  const distance =
    Math.abs(sensor[1] - beacon[1]) + Math.abs(sensor[0] - beacon[0]);
  return distance;
}

function between(x: number, min: number, max: number): boolean {
  return x >= min && x <= max;
}

function updatePointsWithNoBeacons(grid: Grid, sensor: Point, beacon: Point) {
  const distance = getManhattenDistance(sensor, beacon);

  let index: number = 0;
  const median = distance + (sensor[0] - distance);
  for (let i = sensor[1] - distance; i <= sensor[1] + distance; i++) {
    for (let j = sensor[0] - distance; j <= sensor[0] + distance; j++) {
      if (!grid.get(i)) {
        continue;
      }
      if (!grid.get(i)?.get(j)) {
        continue;
      }

      if (between(j, median - index, median + index))
        if (grid.get(i)?.get(j) === ".") {
          grid.get(i)?.set(j, "#");
        }
    }
    if (i < distance + (sensor[1] - distance)) {
      index++;
    } else {
      index--;
    }
  }
}

function runSimulation(input: string) {
  const sandb = getSensorAndBeacons(input);
  const grid = generateGrid(sandb);

  sandb.forEach((line) => {
    updatePointsWithNoBeacons(grid, line[0], line[1]);
  });

  let output: number = 0;
  for (const [y] of grid) {
    if (y === 10) {
      for (const [x] of grid.get(y) || []) {
        if (grid.get(y)?.get(x) === "#") {
          output = output + 1;
        }
      }
    }
  }

  return output;
}

// console.log(runSimulation(input));

export {}