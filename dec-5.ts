const stackInput = `
                [B] [L]     [J]    
            [B] [Q] [R]     [D] [T]
            [G] [H] [H] [M] [N] [F]
        [J] [N] [D] [F] [J] [H] [B]
    [Q] [F] [W] [S] [V] [N] [F] [N]
[W] [N] [H] [M] [L] [B] [R] [T] [Q]
[L] [T] [C] [R] [R] [J] [W] [Z] [L]
[S] [J] [S] [T] [T] [M] [D] [B] [H]
 1   2   3   4   5   6   7   8   9 
`;

function isCrate(char: string) {
  return char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 90;
}

function createStacks(input: string): string[][] {
  const lines = input.split("\n");
  let stackLines: string[][] = [];
  lines.forEach((line) => {
    line.split("").map((x, i) => {
      if (isCrate(x)) {
        const stackIndex = (i - 1) / 4;
        stackLines[stackIndex] = [
          x,
          ...(!!stackLines[stackIndex] ? stackLines[stackIndex] : []),
        ];
      }
    });
  });

  return stackLines;
}

function doInstructions(ins: string, stackInput: string) {
  const insList = ins.split("\n").map((x) =>
    x
      .split(" ")
      .filter((x) => !isNaN(Number(x)))
      .map(Number)
  );

  let stacks = createStacks(stackInput);

  insList.forEach((ins) => {
    for (let i = ins[0]; i >= 1; i--) {
      stacks[ins[2] - 1].push(stacks[ins[1] - 1].slice(-1)[0]);
      stacks[ins[1] - 1].pop();
    }
  });

  return stacks.map((x) => x.slice(-1)).join("");
}

function doInstructionsSecond(ins: string, stackInput: string) {
  const insList = ins.split("\n").map((x) =>
    x
      .split(" ")
      .filter((x) => !isNaN(Number(x)))
      .map((x) => Number(x))
  );

  let stacks = createStacks(stackInput);

  insList.forEach((ins) => {
    stacks[ins[2] - 1].push(...stacks[ins[1] - 1].slice(-ins[0]));
    stacks[ins[1] - 1] = stacks[ins[1] - 1].slice(0, -ins[0]);
  });

  return stacks.map((x) => x.slice(-1)).join("");
}

export {};
