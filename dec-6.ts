function isMarker(str: string[]) {
  return str.filter((x, i, arr) => arr.indexOf(x) === i).length === str.length;
}

function detectMarker(input: string) {
  const buffer = input.split("");

  for (let i = 0; i < buffer.length - 5; i++) {
    const current = buffer.slice(i, i + 4);

    if (isMarker(current)) {
      return i + 4;
    }
  }
}

function detectMarkerSecond(input: string) {
  const buffer = input.split("");

  for (let i = 0; i < buffer.length - 15; i++) {
    const current = buffer.slice(i, i + 14);

    if (isMarker(current)) {
      return i + 14;
    }
  }
}

export {}
