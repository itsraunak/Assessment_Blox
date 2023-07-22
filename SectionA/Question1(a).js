// You are given cartesian coordinates of n factories in a plane producing some items that need to be stored in a warehouse.

//[1(a)]

// A transport truck begins its journey from the warehouse and it can travelalong any horizontal or vertical line.
// After collecting items from a factory, the truck needs to return to the warehouse and deposit the items before visiting another factory.
// Find the strategic location of the warehouse such that the total distance truck needs to travel in order to collect items from all the
// factories is minimised.

// Solution ------------
// we can find the median of the x-coordinates and the median of the y-coordinates of all factories.
// The intersection of these two medians will be the optimal location for the warehouse.

function findWarehouseLocation(factories) {
    // Extract x and y coordinates of factories
    const xCoordinates = factories.map((factory) => factory.x);
    const yCoordinates = factories.map((factory) => factory.y);

    // Find the median of x and y coordinates
    const medianX = findMedian(xCoordinates);
    const medianY = findMedian(yCoordinates);

    // Warehouse location is at the intersection of medians
    return { x: medianX, y: medianY };
}

function findMedian(values) {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const midIndex = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
        return (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
    } else {
        return sortedValues[midIndex];
    }
}

// Example usage:
const factories = [
    { x: 2, y: 5 },
    { x: 6, y: 8 },
    { x: 3, y: 2 },
    // Add more factories if needed
];

const warehouseLocation = findWarehouseLocation(factories);
console.log("Optimal warehouse location:", warehouseLocation);
