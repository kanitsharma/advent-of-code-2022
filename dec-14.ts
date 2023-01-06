function getLinesCoordinates(input: string) {
  const lines = input.split("\n").map((x) =>
    x
      .split("->")
      .map((x) => x.trim())
      .map((x) => x.split(",").map(Number))
  );
  return lines;
}

function addRocks(
  input: Array<number[][]>,
  paddingX: number,
  paddingY: number
) {
  const sortedX = input
    .flatMap((x) => x)
    .map((x) => x[0])
    .sort((a, b) => a - b);

  const sortedY = input
    .flatMap((x) => x)
    .map((x) => x[1])
    .sort((a, b) => a - b);
  const [startY, endY] = [sortedY[0], sortedY.slice(-1)[0]];
  const [startX, endX] = [sortedX[0], sortedX.slice(-1)[0]];
  const grid: string[][] = [];

  for (let i = 0; i <= endY + paddingY; i++) {
    if (!grid[i]) {
      grid[i] = [];
    }
    // adding 2 to add 1, 1 paddingX to left and right
    for (let j = -paddingX; j <= endX - startX; j++) {
      if (startX + (j + paddingX / 2) === 500 && i === 0) {
        grid[i][j + paddingX] = "+";
        continue;
      }
      if (i === endY + 2) {
        grid[i][j + paddingX] = "#";
        continue;
      }
      grid[i][j + paddingX] = ".";
    }
  }

  for (const line of input) {
    for (const i in line) {
      const start = line[i],
        end = line[Number(i) + 1];
      if (!end) break;

      for (
        let y = start[1];
        end[1] - start[1] > 0 ? y <= end[1] : y >= end[1];
        y = y + (end[1] - start[1] > 0 ? 1 : -1)
      ) {
        for (
          let x = start[0];
          end[0] - start[0] > 0 ? x <= end[0] : x >= end[0];
          x = x + (end[0] - start[0] > 0 ? 1 : -1)
        ) {
          // adding 1 to add 1, 1 paddingX to left and right
          grid[y][x - startX + paddingX / 2] = "#";
        }
      }
    }
  }

  return [grid, startX] as [string[][], number];
}

function pourSandFirst(
  grid: string[][],
  startX: number,
  paddingX: number,
  paddingY: number
) {
  // 500 - startx + 1 for paddingX
  const [x, y] = [500 - startX + paddingX / 2, 0];
  let units = 0;
  console.log(x, y);

  while (true) {
    let current = [y, x];
    units++;
    while (true) {
      if (current[0] === grid.length - 1) {
        return [grid, units - 1] as [string[][], number];
      }
      if (grid[current[0] + 1][current[1]] === ".") {
        grid[current[0] + 1][current[1]] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1]];
        continue;
      } else if (grid[current[0] + 1][current[1] - 1] === ".") {
        grid[current[0] + 1][current[1] - 1] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1] - 1];
        continue;
      } else if (grid[current[0] + 1][current[1] + 1] === ".") {
        grid[current[0] + 1][current[1] + 1] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1] + 1];
        continue;
      } else {
        break;
      }
    }
  }
}

function pourSandSecond(
  grid: string[][],
  startX: number,
  paddingX: number,
  paddingY: number
) {
  // 500 - startx + 1 for paddingX
  const [x, y] = [500 - startX + paddingX / 2, 0];
  let units = 0;
  console.log(x, y);

  while (true) {
    let current = [y, x];
    units++;
    while (true) {
      if (grid[current[0] + 1][current[1]] === ".") {
        grid[current[0] + 1][current[1]] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1]];
        continue;
      } else if (grid[current[0] + 1][current[1] - 1] === ".") {
        grid[current[0] + 1][current[1] - 1] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1] - 1];
        continue;
      } else if (grid[current[0] + 1][current[1] + 1] === ".") {
        grid[current[0] + 1][current[1] + 1] = "o";
        grid[current[0]][current[1]] = ".";
        current = [current[0] + 1, current[1] + 1];
        continue;
      } else {
        if (current[0] === y) {
          console.log(units, current);
          return [grid, units] as [string[][], number];
        }
        break;
      }
    }
  }
}

function runSimulation(input: string) {
  const coords = getLinesCoordinates(input);
  const [grid, startX] = addRocks(coords, 2, 1);
  const [gridWithSand, units] = pourSandFirst(grid, startX, 2, 1);

  console.log(units);
  return gridWithSand.map((y) => y.join(" ")).join("\n");
}

function runSimulationSecond(input: string) {
  const coords = getLinesCoordinates(input);
  const [grid, startX] = addRocks(coords, 500, 2);
  const [gridWithSand, units] = pourSandSecond(grid, startX, 500, 2);

  console.log(units);
    return gridWithSand.map((y) => y.join(" ")).join("\n");
  return;
}

// console.log(runSimulationSecond(input));

export {};
