// Write a function to parse any valid json string into a corresponding Object, List, or
// Map object. Note that the integer and floating point should be arbitrary precision.

// To parse any valid JSON string into a corresponding Object, List, or Map object in JavaScript (Node.js),
// We can use the built-in JSON.parse() method.

function parseJSON(jsonString) {
    try {
        const parsedData = JSON.parse(jsonString);
        return parsedData;
    } catch (error) {
        // Handle parsing errors here (if needed)
        console.error("Error parsing JSON:", error.message);
        return null;
    }
}

const jsonStr1 = '{"name": "John", "age": 30, "isAdmin": false}';
const jsonStr2 = "[1, 2, 3, 4, 5]";
const jsonStr3 = '{"1": "One", "2": "Two", "3": "Three"}';

const obj = parseJSON(jsonStr1);
const list = parseJSON(jsonStr2);
const map = parseJSON(jsonStr3);

console.log("Parsed Object:", obj);
console.log("Parsed List:", list);
console.log("Parsed Map:", map);
