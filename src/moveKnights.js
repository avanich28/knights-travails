import { myKnightsGraph } from './myKnightsGraph.js';

export const state = {
  start: [],
  end: [],
};

export const moveKnights = function (
  start = `[${state.start[0]}, ${state.start[1]}]`,
  end = `[${state.end[0]}, ${state.end[1]}]`
) {
  let visited = [];
  let queue = [];
  let paths = [];

  queue.push([start, [start]]);
  whileLoop: while (queue.length) {
    let [curPos, storePathArr] = queue.shift();
    visited.push(curPos);

    if (curPos === end) {
      paths.push(...storePathArr); // Push a path array only 1 time
      break whileLoop;
    }

    for (let choice of myKnightsGraph.adjacentList[curPos]) {
      if (!visited.includes(choice)) {
        queue.push([choice, [...storePathArr, choice]]); // Store path
      }
    }
  }
  console.log(`You made it in ${paths.length} moves! Here's your path:`);
  paths.forEach(el => console.log(el));
  return paths; // array
};
