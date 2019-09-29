const board = document.getElementById("board");
const goButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

const bWidth = 20;
const bHeight = 20;

/*var nodes = */
let nodes = generateBoard(bWidth, bHeight);
var user;

let draggingUser = false;
let selectingWalls = false;

/*
Add event listeners
 */
goButton.addEventListener("click", run)
resetButton.addEventListener("click", reset)
document.addEventListener("mouseup", handleMouseRelease)

function handleNodeDown() {
    if(this.className == "standard-node") {
        this.className = "wall-node";
        selectingWalls = true;
    }else if(this.className = "user-node") {
        draggingUser = true;
    }else if(this.className == "wall-node") {
        this.className = "standard-node";
    }
}

function handleNodeHover() {
    if(selectingWalls) {
        if(this.classNames != "user-node") {
            this.className = "wall-node";
        }
    }else if(draggingUser) {
        user.className = "standard-node";
        this.className = "user-node";
        user = this;
    }
}

function handleMouseRelease() {
    draggingUser = false;
    selectingWalls = false;
}

/*
Run algorithm and visualization
 */
function run() {
    alert("The algorithm would be running now")
}

function reset() {
    nodes = generateBoard(bWidth, bHeight);
}

/*
Generate board
 */
function generateBoard(width, height) {
    const nodes = new Array(width * height);

    //Remove all nodes
    while(board.firstChild) {
        board.removeChild(board.firstChild);
    }

    /*
    Generate random location for the player
     */
    const playerX = randomIntFromInterval(1, width);
    const playerY = randomIntFromInterval(1, width);

    /*
    Create all nodes
     */
    for (let y = 1; y <= height; y++) {
        const tr = document.createElement('tr');
        for (let x = 1; x <= width; x++) {
            const td = document.createElement('td');
            if(x == playerX && y == playerY) {
                td.className = "user-node";
                user = td;
            }else {
                td.className = "standard-node";
            }

            //nodes.append(td);
            td.addEventListener("mousedown", handleNodeDown); //Register event listener
            td.addEventListener("mouseover", handleNodeHover); //Register event listener
            tr.appendChild(td);
        }
        board.appendChild(tr);
    }

    /*
    Return array of nodes
     */
    return nodes;
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}