const input = `Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE
Valve EE has flow rate=3; tunnels lead to valves FF, DD
Valve FF has flow rate=0; tunnels lead to valves EE, GG
Valve GG has flow rate=0; tunnels lead to valves FF, HH
Valve HH has flow rate=22; tunnel leads to valve GG
Valve II has flow rate=0; tunnels lead to valves AA, JJ
Valve JJ has flow rate=21; tunnel leads to valve II`;

type Tunnel = {
  paths: Array<string>;
  flow: number;
  opened: boolean;
};
type Graph = Map<string, Tunnel>;

function GetGraphFromInput(input: string): Graph {
  const lines = input.split("\n");
  const graph = new Map() as Graph;

  lines.forEach((x) => {
    const m = x.match(/\-?\d+/g)?.map(Number);
    const [p, ...rest] = x.split(",").map((x) => x.trim());
    const current = x.split("Valve ")[1].slice(0, 2);
    graph.set(current, {
      paths: [p.slice(-2), ...rest],
      flow: m?.[0] as number,
      opened: false,
    });
  });

  return graph;
}

function getNextPath(current: string, graph: Graph) {
  const tunnel = graph.get(current) as Tunnel;
  const nextPaths = tunnel.paths.map((x) => {
    const nextT = graph.get(x) as Tunnel;
    const nextCost = nextT.paths
      .map((y) => (!graph.get(y)?.opened ? (graph.get(y)?.flow as number) : 0))
      .sort((a, b) => b - a)?.[0] as number;
    return [x, nextT.flow + nextCost];
  });
  return nextPaths.sort((a, b) => b[1] - a[1])[0];
}

function traverseOne(input: string) {
  const graph = GetGraphFromInput(input);
  let current: string = "AA";

  for (let i = 1; i <= 30; i++) {
    const tunnel = graph.get(current) as Tunnel;
    const next = getNextPath(current, graph);
    console.log(next);
    graph.set(current, { ...tunnel, opened: true });
    current = next[0];
  }
}

console.log(traverseOne(input));
