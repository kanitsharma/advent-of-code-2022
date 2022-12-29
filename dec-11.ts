type Monkey = {
  Items: Array<number | bigint>;
  Inspections: number;
  Operation: [string, number];
  Test: [number, number, number];
};

function parseInput(input: string) {
  const monkeys = input
    .split("Monkey ")
    .filter((x) => x.length > 0)
    .map((x) => x.split("\n"));

  const Monkeys: Array<Monkey> = [];
  monkeys.forEach((m, i) => {
    const operation = m[2].split(" = ")[1].split(" ");

    Monkeys.push({
      Items: m[1].split(": ")[1].split(", ").map(Number),
      Inspections: 0,
      Operation: [
        operation[2] === "old" ? "double" : operation[1],
        Number(operation[2]),
      ],
      Test: [
        Number(m[3].split(" ").slice(-1)),
        Number(m[4].split(" ").slice(-1)),
        Number(m[5].split(" ").slice(-1)),
      ],
    });
  });

  return Monkeys;
}

function runOperation(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "*":
      return operand1 * operand2;
    case "double":
      return operand1 * operand1;
  }
}

function startMonkeyBusiness(input: string) {
  const Monkeys = parseInput(input);

  for (let round = 1; round <= 20; round++) {
    Monkeys.forEach((monkey, j) => {
      monkey.Items.forEach((item, k) => {
        Monkeys[j].Inspections = Monkeys[j].Inspections + 1;

        const worry = runOperation(
          monkey.Operation[0],
          item,
          monkey.Operation[1]
        );

        const worryAfterBored = Math.floor(worry / 3);

        if (worryAfterBored % monkey.Test[0] === 0) {
          Monkeys[monkey.Test[1]].Items.push(worryAfterBored);
        } else {
          Monkeys[monkey.Test[2]].Items.push(worryAfterBored);
        }

        Monkeys[j].Items = Monkeys[j].Items.slice(1);
      });
    });
  }

  return Monkeys.map((x) => x.Inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, x) => acc * x, 1);
}

function startMonkeyBusinessSecond(input: string) {
  const Monkeys = parseInput(input);

  const mod = Monkeys.reduce((acc, x) => acc * x.Test[0], 1);

  for (let round = 1; round <= 10000; round++) {
    Monkeys.forEach((monkey, j) => {
      monkey.Items.forEach((item, k) => {
        Monkeys[j].Inspections = Monkeys[j].Inspections + 1;

        const worry = runOperation(
          monkey.Operation[0],
          item,
          monkey.Operation[1]
        );

        const updatedWorry = worry % mod

        if (worry % monkey.Test[0] === 0) {
          Monkeys[monkey.Test[1]].Items.push(updatedWorry);
        } else {
          Monkeys[monkey.Test[2]].Items.push(updatedWorry);
        }

        Monkeys[j].Items = Monkeys[j].Items.slice(1);
      });
    });
  }

  return Monkeys.map((x) => x.Inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, x) => acc * x, 1);
}

export {};
