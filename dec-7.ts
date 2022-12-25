type FileTree = Object;

function getCommandType(cmd: string): "FILE" | "DIR" | "CMD" {
  const first = cmd.slice(0, 1);

  switch (isNaN(Number(first))) {
    case true:
      return first === "$" ? "CMD" : "DIR";
    case false:
      return "FILE";
  }
}

function createDirectory(commands: string) {
  const fileTree: FileTree = {
    "/": {},
  };
  let path: Array<string> = [];

  function addDirectoryOrFile(
    item: string,
    type: "FILE" | "DIR",
    size: number
  ) {
    let current;
    path.forEach((p, i) => {
      current = current ? current[p] : fileTree[p];

      if (i === path.length - 1) {
        if (type === "DIR") {
          current[item] = {};
        } else {
          current[item] = size;
        }
      }
    });
  }

  const commandList = commands.split("\n");

  commandList.forEach((cmd, i) => {
    const type = getCommandType(cmd);
    const currentCmd = cmd.split(" ");

    if (type === "CMD") {
      if (currentCmd[1] === "cd") {
        if (currentCmd[2] === "..") {
          path.pop();
        } else {
          path.push(currentCmd[2]);
        }
      }
    }

    if (type === "DIR") {
      addDirectoryOrFile(currentCmd[1], "DIR", 0);
    }

    if (type === "FILE") {
      addDirectoryOrFile(currentCmd[1], "FILE", Number(currentCmd[0]));
    }
  });

  return fileTree;
}

function getNormalizeDirectories(tree: FileTree) {
  const normalizedDirectories: Record<string, number> = {};

  function normalize(key: string, currentTree: Object) {
    normalizedDirectories[key] = 0;
    Object.keys(currentTree).forEach((x, i) => {

      if (typeof currentTree[x] === "object") {
        normalizedDirectories[key] =
          normalizedDirectories[key] +
          normalize(x + Math.random(), currentTree[x]);
      } else {
        normalizedDirectories[key] =
          normalizedDirectories[key] + currentTree[x];
      }
    });

    return normalizedDirectories[key];
  }

  normalize("/", tree["/"]);

  return normalizedDirectories;
}

function calculateDirectorySize(input: string) {
  const tree = createDirectory(input);
  const normalizedDirectories = getNormalizeDirectories(tree);

  const totalFirst = Object.keys(normalizedDirectories).reduce((acc, x, i) => {
    if (normalizedDirectories[x] < 100000) {
      return acc + normalizedDirectories[x];
    }

    return acc;
  }, 0);

  return totalFirst;
}

function calculateDirectorySizeSecond(input: string) {
  const tree = createDirectory(input);
  const normalizedDirectories = getNormalizeDirectories(tree);

  const sortedDirectories = Object.keys(normalizedDirectories)
    .sort((a, b) => normalizedDirectories[a] - normalizedDirectories[b])
    .map((x) => normalizedDirectories[x]);

  const sizeRequired = 30000000 - (70000000 - sortedDirectories[sortedDirectories.length - 1]);

  return sortedDirectories.find((x) => sizeRequired < x);
}
