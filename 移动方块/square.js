var box = document.getElementsByClassName("box")[0];
var move = document.getElementsByClassName("move")[0];
var fixed = document.getElementsByClassName("fixed")[0];

move.onmousedown = function () {
  document.onmousemove = function (event) {
    var moveX = event.clientX - box.offsetLeft;
    var moveY = event.clientY - box.offsetTop;
    if (moveX <= (box.offsetWidth - move.offsetWidth) 
        && moveX > 0) {
      move.style.left = moveX + "px";
    };
    if (moveY <= (box.offsetHeight - move.offsetHeight) 
        && moveY > 0) {
      move.style.top = moveY + "px";
    };
    if ((moveX >= (fixed.offsetLeft - move.offsetWidth))
        && (moveX <= (fixed.offsetLeft + fixed.offsetWidth))
        && (moveY >= (fixed.offsetTop - move.offsetHeight))
        && (moveY <= (fixed.offsetTop + fixed.offsetHeight))) {
      fixed.style.backgroundColor = "blue";
    }
  }
}

move.onmouseup = function () {
  document.onmousemove = null;
}