// SELECTOR

// CHART
const chartEl = document.querySelector(".chart");

// CREATE CANVAS EL
const canvas = document.createElement("canvas");
canvas.width = 50;
canvas.height = 50;

//APPEND CANVAS TO CHART ELEMENT
chartEl.appendChild(canvas);

// TO DRAW ON CANVAS, WE NEED TO GET CONTEXT OF CANVAS
const context = canvas.getContext("2d");

// CIRCLE RADIUS
const R = 20;

//FUNCTIONS
function drawCircle() {
  context.strokeStyle = color;
  context.beginPath();
  context.arc(
    canvas.width / 2,
    canvas.height / 2,
    R,
    0,
    ratio * 2 * Math.PI,
    anticlockwise
  );
  context.stroke();
}
