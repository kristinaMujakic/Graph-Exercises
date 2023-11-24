class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    vertexArray.forEach(vertex => this.addVertex(vertex));
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    this.nodes.delete(vertex);
    this.nodes.forEach(v => v.adjacent.delete(vertex));
  }

  depthFirstSearch(start) {
    const visited = [];
    const stack = [start];
    const visitedSet = new Set();

    while (stack.length > 0) {
      const current = stack.pop();

      if (!visitedSet.has(current)) {
        visited.push(current.value);
        visitedSet.add(current);

        current.adjacent.forEach(neighbor => {
          if (!visitedSet.has(neighbor)) {
            stack.push(neighbor);
          }
        });
      }
    }

    return visited;
  }

  breadthFirstSearch(start) {
    const visited = [];
    const queue = [start];
    const visitedSet = new Set();

    while (queue.length > 0) {
      const current = queue.shift();

      if (!visitedSet.has(current)) {
        visited.push(current.value);
        visitedSet.add(current);

        current.adjacent.forEach(neighbor => {
          if (!visitedSet.has(neighbor)) {
            queue.push(neighbor);
          }
        });
      }
    }

    return visited;
  }
}

module.exports = { Graph, Node };
