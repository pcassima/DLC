let width;
let max_width = 800;
let height = 300;
let margin = 24;

let time_step;


let canvas_container;
let canvas;
let slider;

let time = 0;
let wave;
let radius;

function setup() {
    // Set the framerate to 30 (higher isn't required).
    frameRate(30);

    // Get the <div> that contains the canvas
    canvas_container = document.getElementById('canvas_1');
    // Call the function to calculate the canvas width.
    width = calcWidth();
    // Create a canvas with the fixed height and calculated width.
    canvas = createCanvas(width, height);
    // Set the parent of the canvas to the <div>
    canvas.parent(canvas_container);

    // Get a slider to change the frequency.
    slider = document.getElementById('frequency_slider_sine');
    // Add a callback to the slider (to change the simulation step).
    slider.addEventListener('input', updateStep);
    // Call the windowResized function as a means of setup.
    windowResized();
    // Call the updateStep function as a means of setup.
    updateStep();
}

function updateStep() {
    // Recalculate the simulation step when the slider is changed.
    time_step = slider.value / 200;
}

function calcRadius() {
    // Calculate the radius for the circle.
    if (width >= 600) {
        // If the width is larger than 600 keep the circle the same size.
        return floor((height - (margin * 4)) / 2);
    } else {
        // If the width is smaller, scale the circle proportionally.
        return floor(((height - (margin * 4)) / 2) * (width/ 600)) ;
    }
}

function calcWidth() {
    // Calculate the width of the screen (to have a maximum of 800 width)
    return min(max_width, canvas_container.offsetWidth);
}

function drawConstructionLines(x, y) {
    // Function that will draw all the construction lines.
    // Set the stroke weight to 1 (thin lines).
    strokeWeight(1);
    // Halfway black for the color.
    stroke(127);
    // Line from the center of the circle to the point.
    line(radius + margin, floor(height / 2), x, y);
    // Line connecting the point and the graph.
    line(x, y, 2 * radius + 2 * margin, wave[0]);
    // Horizontal axis for the graph.
    line(2 * radius + 2 * margin, floor(height / 2), width - margin, floor(height / 2));
}

function drawText() {
    // Method to draw the text to the screen and show the frequency.
    // Set the font size
    textSize(16);
    // Quarter white.
    fill(64);
    // No outline for the text.
    noStroke();
    // Write the text.
    text("Frequency:" + slider.value / 10, margin * 2, margin);
}

function draw() {
    // Clear the contents of the screen.
    clear();
    // Transparent background.
    background(0, 0, 0, 0);

    let x = radius * cos(time) + radius + margin;
    let y = radius * sin(time) + floor(height / 2);
    wave.unshift(y);

    drawText();
    drawConstructionLines(x, y);

    strokeWeight(2);
    noFill();
    stroke(225, 28, 132);
    ellipse(radius + margin, floor(height / 2), radius * 2);
    fill(225, 28, 132);
    ellipse(x, y, 8);

    beginShape();
    noFill()
    for (let i = 0; i < wave.length; i++) {
        vertex(i + 2*radius + 2*margin, wave[i]);
    }
    endShape();

    let max_points = width-(margin * 3) - (radius*2);
    if (wave.length > max_points) {
        wave.pop();
    }

    time -= time_step;

}

function windowResized() {
    // Function called when the window changes size.
    // Recalculate the width.
    width = calcWidth();
    // Recalculate the radius.
    radius = calcRadius();
    // Clear the graph.
    wave = [];
    // Resize the canvas.
    resizeCanvas(width, height, true);
}