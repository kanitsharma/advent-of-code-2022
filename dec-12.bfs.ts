function getHeightMap(input: string) {
  return input.split("\n").map((x) => x.split(""));
}

function getStartAndEndPos(map: Array<string[]>) {
  let start: [number, number] = [0, 0],
    end: [number, number] = [0, 0];

  for (let i = 0; i < map.length - 1; i++) {
    for (let j = 0; j < map[i].length - 1; j++) {
      if (map[i][j] === "S") {
        start = [i, j];
      }

      if (map[i][j] === "E") {
        end = [i, j];
      }
    }
  }

  map[start[0]][start[1]] = "a";
  map[end[0]][end[1]] = "z";

  return [start, end];
}

function peek(map: string[][], pos: [number, number]): string {
  return map?.[pos[0]]?.[pos[1]];
}

function getNeighbors(
  currentPos: [number, number],
  map: string[][],
  visited: Set<string>
) {
  const [i, j] = currentPos;
  const currentVal = peek(map, currentPos);
  const positions = [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ] as Array<[number, number]>;

  const edges: string[] = [];

  for (const pos of positions) {
    if (peek(map, pos)) {
      if (
        peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) <= 1 &&
        !visited.has(peek(map, pos))
      ) {
        edges.push(pos.join());
        continue;
      }
    }
  }

  return edges;
}

function bfs(start: string, end: string, map: string[][]) {
  const visited = new Set<string>().add(start);
  const queue = [start];
  const previousNodes = new Map();

  previousNodes.set(start, null);

  while (queue.length > 0) {
    const current = queue.shift();
    const currentMove = current?.split(",").map(Number) as [number, number];
    const possibleMoves = getNeighbors(currentMove, map, visited);

    for (const move of possibleMoves) {
      if (move === end) {
        previousNodes.set(move, current);
        return previousNodes;
      }

      if (!visited.has(move)) {
        visited.add(move);
        queue.push(move);
        previousNodes.set(move, current);
      }
    }
  }
}

function getSteps(input: string) {
  const map = getHeightMap(input);
  const [start, end] = getStartAndEndPos(map);

  const MSTree = bfs(start.join(), end.join(), map);
  console.log(MSTree);

  //get path from minimum spanning tree
  let current = end.join();
  const path: Array<string> = [];
  while (current != null) {
    console.log(current);
    path.push(current);
    current = MSTree?.get(current);
  }

  return path.length - 1;
}

function bfsStepsOnly(start: string, end: string, map: string[][]) {
  const visited = new Set<string>().add(start);
  const queue: Array<[string, number]> = [[start, 0]];

  while (queue.length > 0) {
    const current = queue.shift() as [string, number];
    const currentMove = current?.[0].split(",").map(Number) as [number, number];
    const possibleMoves = getNeighbors(currentMove, map, visited);

    for (const move of possibleMoves) {
      if (move === end) {
        return current[1] + 1;
      }

      if (!visited.has(move)) {
        visited.add(move);
        queue.push([move, current[1] + 1]);
      }
    }
  }
}

function getAllAPositions(map: Array<string[]>) {
  let positions: Array<[number, number]> = [];

  for (let i = 0; i < map.length - 1; i++) {
    for (let j = 0; j < map[i].length - 1; j++) {
      if (map[i][j] === "a") {
        positions.push([i, j]);
      }
    }
  }

  return positions;
}

function getStepsSecond(input: string) {
  const map = getHeightMap(input);
  const aPostions = getAllAPositions(map);
  const [start, end] = getStartAndEndPos(map);

  const allDistances = aPostions.map((x) =>
    bfsStepsOnly(x.join(), end.join(), map)
  );

  return allDistances.sort()[0];
}

// console.log(getStepsSecond(input));

export {};
