function getRucksackList(input: string): string[][] {
  const list = input.split("\n");
  const compartmentList = list.map((x) => [
    x.slice(0, x.length / 2),
    x.slice(x.length / 2, x.length),
  ]);

  return compartmentList;
}

function getPriorityTotal(list: string[][]) {
  const commonItems = list.map((rs) => {
    return rs[0].split("").find((item) => rs[1].includes(item));
  });

  const total = commonItems.reduce((acc, x) => {
    if (!x) return acc;

    if (x?.charCodeAt(0) >= 97) {
      return acc + (x?.charCodeAt(0) - 96);
    } else {
      return acc + (x?.charCodeAt(0) - 64) + 26;
    }
  }, 0);

  return total;
}

function getPriorityTotalSecond(input: string) {
  const list = input.split("\n");

  const groupedList = list.reduce((acc, x, i, arr) => {
    if ((i + 1) % 3 === 0) {
      return [...acc, [x, arr[i - 1], arr[i - 2]]] as string[][];
    } else {
      return acc as string[][];
    }
  }, <string[][]>[]);

  const total = groupedList.reduce((acc, x) => {
    const commonItem = x[0]
      .split("")
      .find((item) => x[1].includes(item) && x[2].includes(item));

    if (!commonItem) return acc;

    if (commonItem?.charCodeAt(0) >= 97) {
      return acc + (commonItem?.charCodeAt(0) - 96);
    } else {
      return acc + (commonItem?.charCodeAt(0) - 64) + 26;
    }
  }, 0);

  return total;
}

export {};
