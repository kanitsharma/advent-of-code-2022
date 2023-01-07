const input = `Sensor at x=2332081, y=2640840: closest beacon is at x=2094728, y=2887414
Sensor at x=3048293, y=3598671: closest beacon is at x=3872908, y=3598272
Sensor at x=2574256, y=3973583: closest beacon is at x=2520711, y=4005929
Sensor at x=3011471, y=2514567: closest beacon is at x=2999559, y=2558817
Sensor at x=3718881, y=2593817: closest beacon is at x=2999559, y=2558817
Sensor at x=2388052, y=2201955: closest beacon is at x=2163809, y=1961540
Sensor at x=3783125, y=3897169: closest beacon is at x=3872908, y=3598272
Sensor at x=1864613, y=3918152: closest beacon is at x=2520711, y=4005929
Sensor at x=2850099, y=689863: closest beacon is at x=3231146, y=2000000
Sensor at x=3431652, y=2328669: closest beacon is at x=3231146, y=2000000
Sensor at x=3480248, y=3999492: closest beacon is at x=3872908, y=3598272
Sensor at x=455409, y=3347614: closest beacon is at x=-399822, y=4026621
Sensor at x=2451938, y=2950107: closest beacon is at x=2094728, y=2887414
Sensor at x=1917790, y=3194437: closest beacon is at x=2094728, y=2887414
Sensor at x=3947393, y=3625984: closest beacon is at x=3872908, y=3598272
Sensor at x=1615064, y=2655330: closest beacon is at x=2094728, y=2887414
Sensor at x=3630338, y=1977851: closest beacon is at x=3231146, y=2000000
Sensor at x=3878266, y=3019867: closest beacon is at x=3872908, y=3598272
Sensor at x=2837803, y=2395749: closest beacon is at x=2999559, y=2558817
Sensor at x=3979396, y=3697962: closest beacon is at x=3872908, y=3598272
Sensor at x=109399, y=250528: closest beacon is at x=929496, y=-688981
Sensor at x=2401381, y=3518884: closest beacon is at x=2520711, y=4005929
Sensor at x=3962391, y=71053: closest beacon is at x=5368730, y=-488735
Sensor at x=1751119, y=97658: closest beacon is at x=929496, y=-688981
Sensor at x=2932155, y=2967347: closest beacon is at x=2999559, y=2558817
Sensor at x=3326630, y=2845463: closest beacon is at x=2999559, y=2558817
Sensor at x=3959042, y=1734156: closest beacon is at x=3231146, y=2000000
Sensor at x=675279, y=1463916: closest beacon is at x=2163809, y=1961540
Sensor at x=3989603, y=3500749: closest beacon is at x=3872908, y=3598272
Sensor at x=1963470, y=2288355: closest beacon is at x=2163809, y=1961540
`;

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

console.log(runSimulation(input));

export {}