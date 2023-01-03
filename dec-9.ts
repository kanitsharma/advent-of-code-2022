const x = 0,
  y = 1;

function getMoves(input: string) {
  const lines = input.split("\n");
  return lines.map((x) => x.split(" "));
}

function getNextTailPos(h: Array<number>, t: Array<number>) {
  const diffX = h[x] - t[x];
  const diffY = h[y] - t[y];

  switch (diffX) {
    case 2:
      if (diffY === 0) {
        t[x] = t[x] + 1;
      } else if (diffY >= 1) {
        t[x] = t[x] + 1;
        t[y] = t[y] + 1;
      } else if (diffY <= -1) {
        
        t[x] = t[x] + 1;
        t[y] = t[y] - 1;
      }
      return t;
    case -2:
      if (diffY === 0) {
        t[x] = t[x] - 1;
      } else if (diffY >= 1) {
        t[x] = t[x] - 1;
        t[y] = t[y] + 1;
      } else if (diffY <= -1) {
        t[x] = t[x] - 1;
        t[y] = t[y] - 1;
      }
      return t;
  }

  switch (diffY) {
    case 2:
      if (diffX === 0) {
        t[y] = t[y] + 1;
      } else if (diffX === 1) {
        t[y] = t[y] + 1;
        t[x] = t[x] + 1;
      } else if (diffX === -1) {
        t[y] = t[y] + 1;
        t[x] = t[x] - 1;
      }
      return t;
    case -2:
      if (diffX === 0) {
        t[y] = t[y] - 1;
      } else if (diffX >= 1) {
        t[y] = t[y] - 1;
        t[x] = t[x] + 1;
      } else if (diffX <= -1) {
        t[y] = t[y] - 1;
        t[x] = t[x] - 1;
      }

      return t;
  }

  return t;
}

function simulate(input: string) {
  const moves = getMoves(input);
  let tailMovements: Array<string> = ["0,0"];

  let h = [0, 0],
    t = [0, 0];

  moves.forEach((move) => {
    const [direction, steps] = move;

    for (let i = 0; i < Number(steps); i++) {
      switch (direction) {
        case "R":
          h[x] = h[x] + 1;
          break;
        case "U":
          h[y] = h[y] - 1;
          break;
        case "L":
          h[x] = h[x] - 1;
          break;
        case "D":
          h[y] = h[y] + 1;
          break;
      }

      t = getNextTailPos(h, t);
      tailMovements.push(t.join());

      console.log(h, t, direction, steps, tailMovements);
    }
  });

  return tailMovements.filter((x, i, arr) => arr.indexOf(x) === i).length;
}

function simulateNineTails(input: string) {
  const moves = getMoves(input);
  let tailMovements: Array<string> = ["0,0"];

  let h = [0, 0];
  const tails: Array<number[]> = [];

  //initialize tails
  for (let j = 0; j < 9; j++) {
    tails[j] = [0, 0];
  }

  moves.forEach((move) => {
    const [direction, steps] = move;

    for (let i = 0; i < Number(steps); i++) {
      switch (direction) {
        case "R":
          h[x] = h[x] + 1;
          break;
        case "U":
          h[y] = h[y] - 1;
          break;
        case "L":
          h[x] = h[x] - 1;
          break;
        case "D":
          h[y] = h[y] + 1;
          break;
      }

      for (let j = 0; j < 9; j++) {
        if (j === 0) {
          tails[j] = getNextTailPos(h, tails[j]);
        } else {
          tails[j] = getNextTailPos(tails[j - 1], tails[j]);
        }

        if (j === 8) {
          tailMovements.push(tails[j].join());
        }
      }

      console.log(tails, direction, steps, tailMovements);
    }
  });

  return tailMovements.filter((x, i, arr) => arr.indexOf(x) === i).length;
}

export {};
