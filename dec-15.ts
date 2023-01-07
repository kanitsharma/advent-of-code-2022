type x = number;
type y = number;
type Point = [x, y];

type Range = [x, y];

function getSensorAndBeacons(input: string): Array<[Point, Point]> {
  return input.split("\n").map((x) => {
    const m = x.match(/\-?\d+/g)?.map(Number);
    return [[m?.[0], m?.[1]] as Point, [m?.[2], m?.[3]] as Point];
  });
}

// |x1 - x2| + |y1 - y2|
function getManhattenDistance(sensor: Point, beacon: Point) {
  const distance =
    Math.abs(sensor[1] - beacon[1]) + Math.abs(sensor[0] - beacon[0]);
  return distance;
}

function runSimulation(input: string) {
  const sandb = getSensorAndBeacons(input);
  const noBeacons = new Set<string>();
  const seensBeacons = new Set<string>();
  const y = 2000000;

  for (const [sensor, beacon] of sandb) {
    const mdistance = getManhattenDistance(sensor, beacon);
    const index = Math.abs(sensor[1] - y);
    seensBeacons.add(beacon.join());

    for (
      let i = sensor[0] - mdistance + index;
      i <= sensor[0] + mdistance - index;
      i++
    ) {
      if (!seensBeacons.has(`${i},${y}`)) {
        noBeacons.add(`${i},${y}`);
      }
    }
  }

  return noBeacons.size;
}

function mergeRanges(ranges: Array<Range>) {
  ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges: Array<Range> = [];

  let currentRange = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const range = ranges[i];
    if (range[0] <= currentRange[1]) {
      currentRange = [
        Math.min(currentRange[0], range[0]),
        Math.max(currentRange[1], range[1]),
      ];
    } else {
      mergedRanges.push(currentRange);
      currentRange = range;
    }
  }

  mergedRanges.push(currentRange);

  return mergedRanges;
}

function rangeOverlaps(range: Range, list: Array<Range>) {
  for (const r of list) {
    if (range[0] >= r[0] && range[1] <= r[1]) return true;
  }

  return false;
}

function runSimulationOptimized(input: string, max: number) {
  const sandb = getSensorAndBeacons(input);

  const possibleBeacons = new Set<string>();

  for (let y = 0; y <= max; y++) {
    const ranges = sandb.map(([sensor, beacon]) => {
      const mdistance = getManhattenDistance(sensor, beacon);
      const index = Math.abs(sensor[1] - y);
      return [
        sensor[0] - mdistance + index,
        sensor[0] + mdistance - index,
      ] as Range;
    });
    if (rangeOverlaps([0, max], mergeRanges(ranges))) continue;

    const noBeacons = new Set<string>();
    for (const [sensor, beacon] of sandb) {
      const mdistance = getManhattenDistance(sensor, beacon);
      const index = Math.abs(sensor[1] - y);

      for (
        let i = Math.max(sensor[0] - mdistance + index, 0);
        i <= Math.min(sensor[0] + mdistance - index, max);
        i++
      ) {
          noBeacons.add(i + "," + y);
      }
    }
    for (let i = 0; i <= max; i++) {
      if (!noBeacons.has(i + "," + y)) {
        possibleBeacons.add(`${i},${y}`);

        return i * 4000000 + y;
      }
    }
  }
}

const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

console.log(runSimulationOptimized(input, 20));

export {};
