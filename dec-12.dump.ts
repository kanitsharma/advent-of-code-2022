const input = `abacccaaaacccccccccccaaaaaacccccaaaaaaccccaaacccccccccccccccccccccccccccccccccccccccccccaaaaa
abaaccaaaacccccccccccaaaaaaccccccaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccaaaaa
abaaccaaaacccccccccccaaaaacccccaaaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccaaaaa
abccccccccccccccccccccaaaaacccaaaaaaaaaaaaaaaacccccccccccccccccccccccccccaaaccccccccccccaaaaa
abccccccccccccccccccccaacaacccaaaaaaaaccaaaaaccccccccccccccccccccccccccccaaaccccccccccccaccaa
abcccccccccccccaacccaaaccccccaaaaaaaaaccaaaaaccccccccccccccccccccccccccccccacccccccccccccccca
abcccccccccccaaaaaaccaaaccacccccaaaaaaacccccccccccccccccccccccccciiiicccccccddddddccccccccccc
abcccccccccccaaaaaaccaaaaaaaccccaaaaaacccccaacccccccaaaccccccccciiiiiiiicccdddddddddacaaccccc
abccccccccccccaaaaaaaaaaaaacccccaaaaaaacaaaacccccccaaaacccccccchhiiiiiiiiicddddddddddaaaccccc
abcccccccccccaaaaaaaaaaaaaacccccccaaacccaaaaaacccccaaaaccccccchhhipppppiiiijjjjjjjddddaaccccc
abcccccccccccaaaaaaaaaaaaaaccccccccccccccaaaaaccccccaaaccccccchhhpppppppiijjjjjjjjjddeeaccccc
abcccccccccccccccccaaaaaaaacccccccccccccaaaaaccccccccccccccccchhppppppppppjjqqqjjjjjeeeaacccc
abccccccccccccccccccaaaaaaaacccccccccccccccaacccccccccccccccchhhpppuuuupppqqqqqqqjjjeeeaacccc
abcccccccccccccccccccaacccacccccccccccccccccccccccccccccccccchhhopuuuuuuppqqqqqqqjjjeeecccccc
abacccccccccccccaaacaaaccccccccccccccccccccccccccccaaccccccchhhhoouuuuuuuqvvvvvqqqjkeeecccccc
abaccccccccccccaaaaaacccccaaccccccccccccccccccccccaaaccccccchhhooouuuxxxuvvvvvvqqqkkeeecccccc
abaccccccccccccaaaaaacccaaaaaaccccccccccccccccccaaaaaaaaccchhhhooouuxxxxuvyyyvvqqqkkeeecccccc
abcccccccccccccaaaaacccaaaaaaaccccccccccccccccccaaaaaaaaccjjhooooouuxxxxyyyyyvvqqqkkeeecccccc
abccccccccccccccaaaaaacaaaaaaaccccccccaaaccccccccaaaaaaccjjjooootuuuxxxxyyyyyvvqqkkkeeecccccc
abccccccccccccccaaaaaaaaaaaaacccccccccaaaacccccccaaaaaacjjjooootttuxxxxxyyyyvvrrrkkkeeecccccc
SbccccccccccccccccccaaaaaaaaacccccccccaaaacccccccaaaaaacjjjoootttxxxEzzzzyyvvvrrrkkkfffcccccc
abcccccccccccaaacccccaaaaaaacaaaccccccaaaccccccccaaccaacjjjoootttxxxxxyyyyyyvvvrrkkkfffcccccc
abcccccccccaaaaaacccaaaaaacccaaacacccaacccccccccccccccccjjjoootttxxxxyxyyyyyywvvrrkkkfffccccc
abcccccccccaaaaaacccaaaaaaaaaaaaaaaccaaacaaacccccaacccccjjjnnnttttxxxxyyyyyyywwwrrkkkfffccccc
abcaacacccccaaaaacccaaacaaaaaaaaaaaccaaaaaaacccccaacaaacjjjnnnntttttxxyywwwwwwwwrrrlkfffccccc
abcaaaaccccaaaaacccccccccaacaaaaaaccccaaaaaacccccaaaaacccjjjnnnnnttttwwywwwwwwwrrrrllfffccccc
abaaaaaccccaaaaaccccccaaaaaccaaaaacaaaaaaaaccccaaaaaaccccjjjjinnnntttwwwwwsssrrrrrllllffccccc
abaaaaaaccccccccccccccaaaaacaaaaaacaaaaaaaaacccaaaaaaacccciiiiinnnntswwwwssssrrrrrlllfffccccc
abacaaaaccccccccccccccaaaaaacaaccccaaaaaaaaaaccccaaaaaaccccciiiinnnssswwsssssllllllllfffccccc
abccaaccccccccccccccccaaaaaaccccccccccaaacaaaccccaaccaacccccciiiinnsssssssmmllllllllfffaacccc
abccccccccccccccccccccaaaaaaccccccccccaaaccccccccaaccccccccccciiinnmsssssmmmmlllllgggffaacccc
abcccccccccccccccaccccccaaacccccccccccaaccccccccccccccccccccccciiimmmsssmmmmmgggggggggaaacccc
abcccccccccaaaaaaaaccccccccccccccccccccccccccccaaaaaccccccccccciiimmmmmmmmmgggggggggaaacccccc
abccccccccccaaaaaaccccccccccccccccccaacccccccccaaaaacccccccccccciiimmmmmmmhhggggcaaaaaaaccccc
abccccccccccaaaaaacccccccccccccccccaacccccccccaaaaaacccccccccccciihhmmmmhhhhgccccccccaacccccc
abccccaacaaaaaaaaaaccccccccccccccccaaaccccccccaaaaaaccccccccccccchhhhhhhhhhhaaccccccccccccccc
abccccaaaaaaaaaaaaaaccccccccccaaccaaaaccccccccaaaaaacccaaacccccccchhhhhhhhaaaaccccccccccccccc
abcccaaaaaaaaaaaaaaaccccccccaaaaaacaaaacacaccccaaaccccaaaacccccccccchhhhccccaaccccccccccaaaca
abcccaaaaaacacaaacccccccccccaaaaaaaaaaaaaaacccccccccccaaaacccccccccccaaaccccccccccccccccaaaaa
abcccccaaaacccaaaccccccccccaaaaaaaaaaaaaaaaccccccccccccaaacccccccccccaaacccccccccccccccccaaaa
abcccccaacccccaacccccccccccaaaaaaaaaaaaaccccccccccccccccccccccccccccccccccccccccccccccccaaaaa`;

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

  return [start, end];
}

function peek(map: string[][], pos: [number, number]): string {
  return map?.[pos[0]]?.[pos[1]];
}

function checkPath(
  end: [number, number],
  start: [number, number],
  map: string[][]
) {
  const path: Array<string> = [];
  let currentPos = start;
  const choices: Record<string, string[]> = {};

  while (true) {
    const [i, j] = currentPos;
    const currentVal = peek(map, currentPos);
    const positions = [
      [i - 1, j],
      [i, j + 1],
      [i + 1, j],
      [i, j - 1],
    ] as Array<[number, number]>;

    for (const pos of positions) {
      if (peek(map, pos)) {
        if (
          currentVal === "S" &&
          peek(map, pos) === "a" &&
          !choices[[i, j].join()]?.includes(pos.join()) &&
          !path.includes(pos.join())
        ) {
          currentPos = pos;
          path.push(currentPos.join());
          choices[[i, j].join()] = [
            ...(choices[[i, j].join()] || []),
            pos.join(),
          ];
          break;
        }
        if (
          peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 1 &&
          !choices[[i, j].join()]?.includes(pos.join()) &&
          !path.includes(pos.join())
        ) {
          currentPos = pos;
          path.push(currentPos.join());
          choices[[i, j].join()] = [
            ...(choices[[i, j].join()] || []),
            pos.join(),
          ];
          break;
        }
        if (
          peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 0 &&
          !choices[[i, j].join()]?.includes(pos.join()) &&
          !path.includes(pos.join())
        ) {
          currentPos = pos;
          path.push(currentPos.join());
          choices[[i, j].join()] = [
            ...(choices[[i, j].join()] || []),
            pos.join(),
          ];
          break;
        }
        if (
          currentVal === "z" &&
          peek(map, pos) === "E" &&
          !choices[[i, j].join()]?.includes(pos.join()) &&
          !path.includes(pos.join())
        ) {
          currentPos = pos;
          path.push(currentPos.join());
          choices[[i, j].join()] = [
            ...(choices[[i, j].join()] || []),
            pos.join(),
          ];
          return path;
        }
      }
    }

    if ([i, j].join() === currentPos.join()) {
      currentPos = path.slice(-1)[0].split(",").map(Number) as [number, number];
      path.pop();
      console.log(path);
      continue;
    }
  }
}

function getSmallestPath(input: string) {
  const map = getHeightMap(input);
  const [start, end] = getStartAndEndPos(map);

  const paths: Array<string[]> = [];

  checkPath(end, start, map);
  //   paths.push(checkPath(end, start, map));
  //   paths.push(checkPath(end, start, map));

  return paths;
}

const Graph: Record<string, Array<string>> = {};

function addNode(node: string) {
  Graph[node] = [];
}

function addEdge(node: string, edge: string) {
  Graph[node].push(edge);
}

function getEdges(node: string) {
  return Graph[node];
}

function addGraph(
  currentPos: [number, number],
  end: [number, number],
  map: string[][]
) {
  const [i, j] = currentPos;
  const currentVal = peek(map, currentPos);
  const positions = [
    [i - 1, j],
    [i, j + 1],
    [i + 1, j],
    [i, j - 1],
  ] as Array<[number, number]>;

  addNode(currentPos.join());

  for (const pos of positions) {
    if (peek(map, pos)) {
      if (currentVal === "S" && peek(map, pos) === "a") {
        addEdge(currentPos.join(), pos.join());
        continue;
      }
      if (peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 1) {
        addEdge(currentPos.join(), pos.join());
        continue;
      }
      if (peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 0) {
        addEdge(currentPos.join(), pos.join());
        continue;
      }
      if (currentVal === "z" && peek(map, pos) === "E") {
        addEdge(currentPos.join(), pos.join());
        continue;
      }
    }
  }

  const edges = getEdges(currentPos.join());

  for (const edge of edges) {
    console.log(Graph);
    addGraph(edge.split(",").map(Number) as [number, number], end, map);
  }
}

function PopulateGraph(input: string) {
  const map = getHeightMap(input);
  const [start, end] = getStartAndEndPos(map);
  map[start[0]][start[1]] = "a";
  map[end[0]][end[1]] = "z";

  for (let i = 0; i <= map.length - 1; i++) {
    for (let j = 0; j <= map[i].length - 1; j++) {
      addNode([i, j].join());
    }
  }

  Object.keys(Graph).forEach((node) => {
    const currentPos = node.split(",").map(Number) as [number, number];
    const [i, j] = currentPos;
    const currentVal = peek(map, currentPos);
    const positions = [
      [i - 1, j],
      [i, j + 1],
      [i + 1, j],
      [i, j - 1],
    ] as Array<[number, number]>;

    for (const pos of positions) {
      if (peek(map, pos)) {
        if (currentVal === "S" && peek(map, pos) === "a") {
          addEdge(currentPos.join(), pos.join());
          continue;
        }
        if (peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 1) {
          addEdge(currentPos.join(), pos.join());
          continue;
        }
        if (peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) === 0) {
          addEdge(currentPos.join(), pos.join());
          continue;
        }
        if (currentVal === "z" && peek(map, pos) === "E") {
          addEdge(currentPos.join(), pos.join());
          continue;
        }
      }
    }
  });

  BFS(start, end);
}

function getNeighbors(currentPos: [number, number], map: string[][]) {
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
        peek(map, pos).charCodeAt(0) - currentVal.charCodeAt(0) <= 1
      ) {
        edges.push(pos.join());
        continue;
      }
    }
  }

  return edges;
}

function BFS(input: string) {
  const map = getHeightMap(input);
  const [start, end] = getStartAndEndPos(map);
  map[start[0]][start[1]] = "a";
  map[end[0]][end[1]] = "z";

  let queue: Array<string> = [start.join()];
  const visited: Record<string, boolean> = {
    [start.join()]: true,
  };
  let predecessor = {};
  let tail = 0;

  while (tail < queue.length) {
    var u = queue[tail++];
    const neighbors = getNeighbors(
      u?.split(",").map(Number) as [number, number],
      map
    );

    for (var i = 0; i < neighbors.length; ++i) {
      var v = neighbors[i];
      if (visited[v]) {
        continue;
      }
      visited[v] = true;
      if (v === end.join()) {
        // Check if the path is complete.
        var path = [v]; // If so, backtrack through the path.
        while (u !== start.join()) {
          path.push(u);
          u = predecessor[u];
        }
        path.push(u);
        path.reverse();
        console.log(path.length - 1);
        return;
      }
      predecessor[v] = u;
      queue.push(v);
    }
  }
  console.log(start, end);
}

BFS(input);

export {}