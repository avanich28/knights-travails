class Graph {
  constructor() {
    this.adjacentList = {};
  }

  addVertex(vertex) {
    if (this.adjacentList[vertex]) return undefined;
    this.adjacentList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacentList[vertex1] && this.adjacentList[vertex2]) {
      if (!this.adjacentList[vertex1].includes(vertex2))
        this.adjacentList[vertex1].push(vertex2);
    }
  }
}

const myKnightsGraph = new Graph();

const fillVertex = function () {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      myKnightsGraph.addVertex(String(`[${i}, ${j}]`));
    }
  }
};
fillVertex();

let choices = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

const fillEdge = function (arr) {
  // Base case
  if (arr.length === 0) return;
  let temp = arr.pop();
  let [u, v] = JSON.parse(temp);

  choices.forEach(num => {
    let vertex2 = [u + num[0], v + num[1]];
    if (vertex2.some(value => value < 0)) return;

    // Send str
    myKnightsGraph.addEdge(temp, `[${vertex2[0]}, ${vertex2[1]}]`);
  });

  // Recursive case
  fillEdge(arr);
};
fillEdge(Object.keys(myKnightsGraph.adjacentList));

export { myKnightsGraph };
