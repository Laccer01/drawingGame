document.getElementById("loading").style.display = "none";
document.getElementById("bigcont").style.display = "none";
document.getElementById("userCont").style.display = "none";
document.getElementById("oppNameCont").style.display = "none";

document.getElementById("exitBtn").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "/";
});

let color = "#000000"; // Default color

document.getElementById("colorPicker").addEventListener("change", function (e) {
    color = e.target.value; // Update color variable
});

let drawingMode = true; // Default mode is drawing
let cursorIcon = "url('/pen.jpg'), auto"; // Default cursor icon for drawing mode


// Function to handle eraser button click
document.getElementById("eraseBtn").addEventListener("click", function () {
    drawingMode = !drawingMode; // Toggle mode

    if (drawingMode) {
        // If switching to drawing mode, set cursor icon to pen icon
        cursorIcon = "url('/pen.jpg'), auto";
        color = document.getElementById("colorPicker").value; // Use the color from the color picker
    } else {
        // If switching to erasing mode, set cursor icon to eraser icon
        cursorIcon = "url('/eraser.png'), auto";
        color = "#ffffff"; // Set color to white for erasing
    }

    // Apply the cursor icon to the canvas
    document.getElementById("canvas").style.cursor = cursorIcon;
});

let size = 2; // Default size

document.getElementById("sizeSlider").addEventListener("input", function (e) {
    size = parseInt(e.target.value); // Update size variable
});

const socket = io();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let lastX, lastY;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);

function endDraw() {
    drawing = false;
    ctx.beginPath();
}

function startDraw(e) {
    drawing = true;

    // Adjust event coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

function draw(e) {
    if (!drawing) return;

    // Adjust event coordinates relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = size; // Use the size variable
    ctx.lineCap = "round";
    ctx.strokeStyle = color; // Use the color variable

    ctx.lineTo(x, y);
    ctx.stroke();

    const data = {
        x: x,
        y: y,
        drawing: drawing,
        lastX: lastX,
        lastY: lastY, // Include lastX and lastY in the data
        size: size, // Include size in the data
        color: color // Include color in the data
    };

    socket.emit("drawing", data);

    lastX = x;
    lastY = y;
}

socket.on("drawing", function (data) {
    if (data.drawing) {
        ctx.lineWidth = data.size; // Use the received size
        ctx.lineCap = "round";
        ctx.strokeStyle = data.color;
        ctx.beginPath();
        ctx.moveTo(data.lastX, data.lastY);
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
    }
    // Broadcasting events from the client is typically done on the server-side
    // socket.broadcast.emit("drawing", data);
});

let name;

document.getElementById('find').addEventListener("click", function () {
    name = document.getElementById("name").value;
    document.getElementById("user").innerText = name;
    if (!name) {
        alert("Please enter a name");
    } else {
        socket.emit("find", { name: name });
        document.getElementById("loading").style.display = "block";
        document.getElementById("find").disabled = true;
    }
});

socket.on("find", (e) => {
    let allPlayersArray = e.allPlayers;
    if (name) {
        document.getElementById("userCont").style.display = "block";
        document.getElementById("oppNameCont").style.display = "block";
        document.getElementById("loading").style.display = "none";
        document.getElementById("name").style.display = "none";
        document.getElementById("find").style.display = "none";
        document.getElementById("enterName").style.display = "none";
        document.getElementById("bigcont").style.display = "block";
    }
    let oppName;
    let value;
    const foundObject = allPlayersArray.find(obj => obj.p1.p1name == `${name}` || obj.p2.p2name == `${name}`);
    foundObject.p1.p1name == `${name}` ? oppName = foundObject.p2.p2name : oppName = foundObject.p1.p1name;
    foundObject.p1.p1name == `${name}` ? value = foundObject.p1.p1value : value = foundObject.p2.p2value;
    document.getElementById("oppName").innerText = oppName;
});
