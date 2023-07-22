// You are given cartesian coordinates of n factories in a plane producing some items that need to be stored in a warehouse.

//[1(b)]

// Think of the plane as a grid (with m x m cells) where a factory or warehouse
// will be a cell. The truck can again travel from one cell to another adjacent cell
// vertically or horizontally except it can’t travel outside the grid boundary.
// Additionally certain cells represent no trespass area where the truck can’t
// pass through. Find the optimum solution in this setup again minimising total
// distance travelled by the truck.

// Solution ----------

// we can use a variation of Dijkstra's algorithm to find the shortest path between
// the warehouse and all factories while avoiding the no trespass areas.
// We'll represent the plane as a 2D grid, where each cell can have a value
// indicating whether it's a factory, the warehouse, or a no trespass area.
// We'll use BFS (Breadth-First Search) to explore the grid and find the shortest paths.

function findOptimumDistance(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const directions = [
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    function isValidCell(x, y) {
        return x >= 0 && x < m && y >= 0 && y < n;
    }

    function bfs(startX, startY) {
        const queue = [{ x: startX, y: startY, distance: 0 }];
        const visited = new Set();

        while (queue.length > 0) {
            const { x, y, distance } = queue.shift();

            if (grid[x][y] === "F") {
                return distance;
            }

            for (const [dx, dy] of directions) {
                const newX = x + dx;
                const newY = y + dy;

                if (
                    isValidCell(newX, newY) &&
                    !visited.has(`${newX}-${newY}`)
                ) {
                    visited.add(`${newX}-${newY}`);
                    queue.push({ x: newX, y: newY, distance: distance + 1 });
                }
            }
        }

        return Infinity; // Factory not reachable
    }

    let minDistance = Infinity;

    // Find the warehouse and its location
    let warehouseX, warehouseY;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "W") {
                warehouseX = i;
                warehouseY = j;
            }
        }
    }

    // Find the minimum distance to reach all factories
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === "F") {
                const distance = bfs(i, j);
                minDistance = Math.min(minDistance, distance);
            }
        }
    }

    return minDistance;
}

// Example usage:
const grid = [
    ["0", "0", "0", "0", "F"],
    ["0", "W", "X", "0", "X"],
    ["0", "X", "0", "F", "0"],
    ["0", "0", "0", "F", "X"],
    ["F", "X", "0", "X", "F"],
];

const optimumDistance = findOptimumDistance(grid);
console.log("Optimal distance traveled by the truck:", optimumDistance);
