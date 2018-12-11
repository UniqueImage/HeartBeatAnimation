var config = {
  x1: 0,//speed
}

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
  context.fillStyle = "#dbbd7a";
  context.fill();

var fps = 15;
var x = 1;
var y_offset = canvas.height / 2;

var data_points = [
  100, 105, 110, 115, 120, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 85, 90, 95, 100, 105, 110, 105, 100, 100, 100, 100, 100,
  100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100,  100, 100, 100, 100,100, 100, 100, 100, 100,
  100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100
 ];


draw_line(config);
function draw_line(congfig) {
  setTimeout(function() {
    requestAnimationFrame(draw_line);
    if (canvas.width !== window.innerWidth) {
      context.clearRect(canvas.width,0, window.innerWidth, window.innerHeight);
      canvas.width = window.innerWidth;
    }
    if (canvas.height !== window.innerHeight) {
      context.clearRect(0, canvas.height, window.innerWidth, window.innerHeight);
      canvas.height = window.innerHeight;
      y_offset = canvas.height / 2;
    }
    context.lineWidth = '2';
    context.strokeStyle = 'red';

    // Drawing code goes here
    x += 1;
    if (x >= window.innerWidth) {
      context.clearRect(0,0, window.innerWidth, window.innerHeight);

      x = 1;
    }

    var n = x % data_points.length;

    context.beginPath();
    context.moveTo(x-1, data_points[n-1] + y_offset);
    context.lineTo(x, data_points[n] + y_offset);
    context.stroke();
    if(data_points[n] == 125){
      console.log("We hit a peak")
    }

  }, 500 / fps);
}
