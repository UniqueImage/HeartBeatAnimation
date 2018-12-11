var config = {
  x1: 0,//speed
}

//draws the canvas
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
  context.fillStyle = "#dbbd7a";
  context.fill();


var fps = 45;//sets speed for the animation
var x = 1;//starting point
var y_offset = canvas.height / 2;//allows for the placement of the heartbeat on the screen to center

//these data points are for the heartbeat peaks and drops
// gradually goes up and down -- distant away from the top and bottom of the canvas in pixels
var data_points = [
  100, 105, 110, 115, 120, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 85, 90, 95, 100, 105, 110, 105, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100,  100, 100, 100, 100,100, 100, 100, 100, 100,
  100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100
 ];


draw_line(config);

//function to draw the line/heartbeat across the screen
function draw_line(congfig) {
  setTimeout(function() {
    requestAnimationFrame(draw_line);

    //these loops makes it so the canvas is the size of the window
    if (canvas.width !== window.innerWidth) {
      context.clearRect(canvas.width,0, window.innerWidth, window.innerHeight);
      canvas.width = window.innerWidth;
    }
    if (canvas.height !== window.innerHeight) {
      context.clearRect(0, canvas.height, window.innerWidth, window.innerHeight);
      canvas.height = window.innerHeight;
      y_offset = canvas.height / 2;
    }

    //color and sizing of the line
    context.lineWidth = '2';
    context.strokeStyle = 'red';

    // Drawing code goes here
    x += 1;
    if (x >= window.innerWidth) {
      context.clearRect(0,0, window.innerWidth, window.innerHeight);

      x = 1;
    }

    var n = x % data_points.length;//this is the index/iterator

    context.beginPath();
    context.moveTo(x-1, data_points[n-1] + y_offset);//starting point of line
    context.lineTo(x, data_points[n] + y_offset);//where the line is drawn to
    context.stroke();
    //tells the developer when a peak or lowest point of the heartbeat is struck
    if(data_points[n] == 125){
      console.log("We hit a peak")
    }

  }, 500 / fps);//speed of the animation
}
