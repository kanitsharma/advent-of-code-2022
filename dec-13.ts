function parsePacketList(input: string) {
  const packetPairList = input
    .split("\n\n")
    .map((x) => x.split("\n").map((x) => JSON.parse(x)));

  return packetPairList;
}

function compare2(firstList, secondList) {
  const largerList =
    firstList.length > secondList.length ? firstList : secondList;
  for (const i in largerList) {
    const first = firstList[i],
      second = secondList[i];
    if (typeof first === "undefined") {
      return true;
    }
    if (typeof second === "undefined") {
      return false;
    }
    if (typeof first === "number" && typeof second === "number") {
      if (first < second) {
        return true;
      }
      if (first > second) {
        return false;
      }
    }
    if (typeof first === "object" && typeof second === "object") {
      let a = compare2(first, second);
      if (a !== null) {
        return a;
      }
    }
    if (typeof first === "object" && typeof second === "number") {
      let a = compare2(first, [second]);
      if (a !== null) {
        return a;
      }
    }
    if (typeof first === "number" && typeof second === "object") {
      let a = compare2([first], second);
      if (a !== null) {
        return a;
      }
    }
  }

  return null;
}

function getCorrectOrderSum(input: string) {
  const packetPairList = parsePacketList(input) as Array<[any, any]>;
  return packetPairList.reduce(
    (acc: number, packetPair, i) => {
      if (compare2(...packetPair)) {
        return acc + (i + 1);
      }
      return acc;
    },
    0
  );
}

function pakageSort(input: string) {
  const packetPairList = parsePacketList(input)
    .flatMap((x) => x)
    .concat([[[2]], [[6]]]);
  const sorted = packetPairList.sort((a, b) => (compare2(a, b) ? -1 : 1));
  return (sorted.findIndex(x => String(x) === String([[2]])) + 1) * (sorted.findIndex(x => String(x) === String([[6]])) + 1);
}

// console.log(pakageSort(input));

export {};
