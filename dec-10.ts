function getCycles(input: string) {
  const cycleList = input.split("\n");
  return cycleList.map((x) => x.split(" "));
}

function runCycles(input: string) {
  const cycles = getCycles(input);
  let X = 1;
  let fnStack: Array<number[]> = []; //[Register, stepstoexecute]
  let signal: number = 0;
  const cycleToCheck = [20, 60, 100, 140, 180, 220];

  for (let i = 0; i < 220; i++) {
    if (i <= cycles.length - 1) {
      const [fn, register] = cycles[i];

      if (fn === "addx") {
        fnStack.push([Number(register), 2]);
      } else {
        fnStack.push([0, 1]);
      }
    }

    fnStack[0][1]--;

    if (cycleToCheck.includes(i + 1)) {
      signal = signal + (i + 1) * X;
    }

    if (fnStack.length > 0 && fnStack[0][1] === 0) {
      X = X + fnStack[0][0];
      fnStack = fnStack.slice(1);
    }
  }

  return signal;
}

function renderCRT(input: string) {
  const cycles = getCycles(input);
  let X = 1;
  let fnStack: Array<number[]> = []; //[Register, stepstoexecute]
  const CRTRow: Array<string[]> = [];

  for (let j = 0; j < 6; j++) {
    CRTRow[j] = [];

    for (let i = 0; i < 40; i++) {
      if (i <= cycles.length - 1) {
        const [fn, register] = cycles[i + j * 40] || [];

        if (fn === "addx") {
          fnStack.push([Number(register), 2]);
        } else {
          fnStack.push([0, 1]);
        }
      }

      fnStack[0][1]--;

      if ([X - 1, X, X + 1].includes(i)) {
        CRTRow[j].push("#");
      } else {
        CRTRow[j].push(".");
      }

      if (fnStack.length > 0 && fnStack[0][1] === 0) {
        X = X + fnStack[0][0];
        fnStack = fnStack.slice(1);
      }
    }
  }
  return CRTRow.map(y => y.join("")).join("\n");
}

// console.log(renderCRT(input));

export {};
