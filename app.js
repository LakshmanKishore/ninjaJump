let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let x = 0, y = 0, r = 20, rectThickness = 10, s = 30, size=20;
x = rectThickness;
let cx = canvas.width - r - rectThickness, cy = canvas.height / 2 + 150;
let circleRight = true;
let score = 0;
function randomX() {
    let rand = Math.round(Math.random() * 1);
    return [rectThickness, canvas.width - rectThickness - s][rand]
}

function startGame() {
    c.clearRect(0, 0, canvas.width, canvas.height);

    // draw right and left rectangles.
    c.beginPath();
    if (y > canvas.height) {
        y = 0;
        x = randomX();
        score+=1;
    }
    c.rect(x, y, s, s);
    y += 8
    c.fillStyle = "blue";
    c.fill();
    c.closePath();

    c.beginPath();
    c.rect(0, 0, rectThickness, canvas.height)
    c.rect(canvas.width - rectThickness, 0, rectThickness, canvas.height)
    c.fillStyle = "red";
    c.fill();
    c.closePath();

    c.beginPath();
    c.arc(cx, cy, r, 0, 2 * Math.PI);
    c.fillStyle = "green";
    c.fill();
    c.closePath();
    if (!rectCircleColliding({x:cx,y:cy,r:r},{x:x,y:y,w:s,h:s})){
        requestAnimationFrame(startGame);
    } else {
        let wHalf = canvas.width/2, hHalf=canvas.height/2;
        c.font = (size + 20) + "px Arial";
        c.fillStyle = "yellow";
        c.textAlign = "center";
        c.fillText("GAME OVER", wHalf, hHalf);
        c.font = (size + 10) + "px Arial";
        c.fillText("Score: " + score, wHalf, hHalf + size + 10);
        c.fillStyle = "green";
        c.font = size + "px Arial";
        c.fillText("To play again refresh the page 😅", wHalf, hHalf + size + 50);
    }

}
startGame();

function moveCircle() {
    circleRight = !circleRight;
    if (circleRight) {
        cx = canvas.width - r - rectThickness;
        cy = canvas.height / 2 + 150;
    } else {
        cx = rectThickness + r;
        cy = canvas.height / 2 + 150;;
    }
}

// return true if the rectangle and circle are colliding
function rectCircleColliding(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.w/2);
    var distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    var dx=distX-rect.w/2;
    var dy=distY-rect.h/2;
    return (dx*dx+dy*dy<=(circle.r*circle.r));
}

document.body.onkeypress = function (e) {
        if (e.keyCode == 32) {
            moveCircle();
	}
}


canvas.addEventListener("click", moveCircle)