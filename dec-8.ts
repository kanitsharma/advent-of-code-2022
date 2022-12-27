function getTreeGrid(input: string) {
  const lines = input.split("\n");
  const grid = lines.map((x) => x.split("").map(Number));
  return grid;
}

function detectVisibleTrees(input: string) {
  const grid = getTreeGrid(input);

  const visibleTreesTotal = grid.reduce((acc, x, i) => {
    x.forEach((y, j) => {
      if (i === 0 || j === 0) {
        acc = acc + 1;
        return;
      }
      if (i === grid.length - 1 || j === x.length - 1) {
        acc = acc + 1;
        return;
      }

      let isVisiblefromTop: boolean = false;
      for (let k = 0; k < i; k++) {
        if (grid[k][j] < y) {
          isVisiblefromTop = true;
        } else {
          isVisiblefromTop = false;
          break;
        }
      }

      let isVisiblefromLeft: boolean = false;
      for (let k = 0; k < j; k++) {
        if (grid[i][k] < y) {
          isVisiblefromLeft = true;
        } else {
          isVisiblefromLeft = false;
          break;
        }
      }

      let isVisiblefromBot: boolean = false;
      for (let k = grid.length - 1; k > i; k--) {
        if (grid[k][j] < y) {
          isVisiblefromBot = true;
        } else {
          isVisiblefromBot = false;
          break;
        }
      }

      let isVisiblefromRight: boolean = false;
      for (let k = x.length - 1; k > j; k--) {
        if (grid[i][k] < y) {
          isVisiblefromRight = true;
        } else {
          isVisiblefromRight = false;
          break;
        }
      }

      if (
        isVisiblefromTop ||
        isVisiblefromBot ||
        isVisiblefromLeft ||
        isVisiblefromRight
      ) {
        acc = acc + 1;
      }
    });

    return acc;
  }, 0);

  return visibleTreesTotal;
}

function detectScenicScore(input: string) {
  const grid = getTreeGrid(input);

  const scenicScores = grid.reduce((acc, x, i) => {
    x.forEach((y, j) => {
      if (i === 0 || j === 0) {
        return;
      }
      if (i === grid.length - 1 || j === x.length - 1) {
        return;
      }

      let scoreFromTop: number = 0;
      for (let k = i - 1; k >= 0; k--) {
        scoreFromTop = scoreFromTop + 1;
        if (grid[k][j] >= y) {
          break;
        }
      }

      let scoreFromBot: number = 0;
      for (let k = i + 1; k <= grid.length - 1; k++) {
        scoreFromBot = scoreFromBot + 1;
        if (grid[k][j] >= y) {
          break;
        }
      }

      let scoreFromLeft: number = 0;
      for (let k = j - 1; k >= 0; k--) {
        scoreFromLeft = scoreFromLeft + 1;
        if (grid[i][k] >= y) {
          break;
        }
      }

      let scoreFromRight: number = 0;
      for (let k = j + 1; k <= x.length - 1; k++) {
        scoreFromRight = scoreFromRight + 1;
        if (grid[i][k] >= y) {
          break;
        }
      }

      acc.push(scoreFromBot * scoreFromLeft * scoreFromRight * scoreFromTop);
    });

    return acc;
  }, []);

  return scenicScores.sort((a, b) => b - a)[0];
}

export {}