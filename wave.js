var config = {
  x1: 0,//speed
}
var peak_count = 0;
var valley_count = 0;
//draws the canvas
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var context = canvas.getContext("2d");
  context.fillStyle = "#dbbd7a";
  context.fill();
const IMAGE_WIDTH = 255;
const IMAGE_HEIGHT = 250;

var fps = 45;//sets speed for the animation
var x = 1;//starting point
var y_offset = canvas.height/2.5;//allows for the placement of the heartbeat on the screen to center
console.log(y_offset);
//these data points are for the heartbeat peaks and drops
// gradually goes up and down -- distant away from the top and bottom of the canvas in pixels
var data_points = [
  //these points control the drop
  100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 190, 180, 170, 160, 150,
  140, 130, 120, 110, 100,
  //these points control the rise
  90, 80, 70, 60, 50, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80, 90,
  //the 100s below control the spacing of the heartbeat more 100s = more spaced out
  100, 100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100, 100, 100, 100,100, 100,
  100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100,
  100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100,
  100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100, 100, 100, 100,100, 100, 100, 100, 100, 100,
 ];

var img = new Image();
//manually entering the images into an array so they can be drawn on the screen
var images_array = ["Images/Team Pictures/Mboudreau.png", "Images/Team Pictures/Pgifford.png", "Images/Team Pictures/Cthompson.png",
  "Images/Team Pictures/Iserag.png", "Images/Team Pictures/Eharding.png", "Images/Team Pictures/Bboudreau.png",
  "Images/Team Pictures/Aobrien.png", "Images/Team Pictures/Kbhagat.png", "Images/Team Pictures/Kdasilva.png", "Images/Team Pictures/Cmcaloon.png",
  "Images/Team Pictures/Jzukowski.png", "Images/Team Pictures/Ahancock.png", "Images/Team Pictures/Aurrutia.png", "Images/Team Pictures/Msorrentino.png",
  "Images/Team Pictures/Cmemoli.png", "Images/Team Pictures/Dhagist.png", "Images/Team Pictures/Svonhein.png", "Images/Team Pictures/Jschoenewald.png",
  "Images/Team Pictures/Cokeefe.png", "Images/Team Pictures/Seltinge.png", "Images/Team Pictures/Kdoyle.png", "Images/Team Pictures/Jfrain.png",
  "Images/Team Pictures/Agiese.png", "Images/Team Pictures/Ayadav.png", "Images/Team Pictures/Oali.png", "Images/Team Pictures/Ccorrado.png",
  "Images/Team Pictures/Dpost.png", "Images/Team Pictures/Nlansa.png", "Images/Team Pictures/Dfriedman.png", "Images/Team Pictures/Eugbanaja.png",
  "Images/Team Pictures/Gforti.png", "Images/Team Pictures/Gcetintemel.png", "Images/Team Pictures/Jballou.png", "Images/Team Pictures/Jgreenwood.png",
  "Images/Team Pictures/Ksampong.png", "Images/Team Pictures/Nsprague.png", "Images/Team Pictures/Vpaul.png", "Images/Team Pictures/Mbellows.png",
  "Images/Team Pictures/Bolencki.png", "Images/Team Pictures/Cmcneil.png", "Images/Team Pictures/Tawal.png", "Images/Team Pictures/Msavastano.png",
  "Images/Team Pictures/Frapp.png", "Images/Team Pictures/Jlucas.png", "Images/Team Pictures/Yfaraj.png", "Images/Team Pictures/Cmello.png",
  "Images/Team Pictures/Rzettergren.png", "Images/Team Pictures/Asarnicka.png", "Images/Team Pictures/Emcgrath.png", "Images/Team Pictures/Dsalazar.png",
  "Images/Team Pictures/Jdouglas.png", "Images/Team Pictures/Pperriot.png", "Images/Team Pictures/Bdickinson.png", "Images/Team Pictures/Dkinch.png",
  "Images/Team Pictures/Zqausney.png", "Images/Team Pictures/Adepetrillo.png", "Images/Team Pictures/Jbyrne.png"
];

var index = 0; // this indexes the images_array
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
    }

    //color and sizing of the line
    context.lineWidth = '3';
    context.strokeStyle = 'red';

    // Drawing code for line goes here
    x += 1;
    if (x >= window.innerWidth) {
      context.clearRect(0,0, window.innerWidth, window.innerHeight);
      valley_count = 0;
      peak_count = 0;
      x = 1;
    }

    var n = x % data_points.length;//this is the index/iterator for line
    //the line starting point and moving across screen
    context.beginPath();
    context.moveTo(x-1, data_points[n-1] + y_offset);//starting point of line
    context.lineTo(x, data_points[n] + y_offset);//where the line is drawn to
    context.stroke();
    //Counts the number of peaks and places the images there
    if (data_points[n-1] == 10 && x < window.innerWidth-IMAGE_WIDTH){
      peak_count++;
      console.log("Peak");

      if(peak_count % 2 === 0) {
        img.onload = function () {
          let img_x = x - 115;
          let img_y = y_offset - 250;
          context.drawImage(img, img_x, img_y, IMAGE_WIDTH, IMAGE_HEIGHT);
        }

        img.src = images_array[index];
        index++;
      }
    }

    if(data_points[n-1] == 200) {
      valley_count++;
      console.log("Valley")

      if (valley_count % 2 !== 0 &&  valley_count > 1) {
        img.onload = function () {
          let img_x = x - 115;
          let img_y = y_offset + 250;
          context.drawImage(img, img_x, img_y, IMAGE_WIDTH, IMAGE_HEIGHT);
        }

        img.src = images_array[index];
        index++;
      }
    }
    console.log(`Index is ${index}, length is ${images_array.length}`);
    if (index == images_array.length) {
      index = 0;
    }

    //upload images and loop through the array


    // img.onload = function () {
    // context.drawImage(img, 75, 60, 200, 175);
    // }
    // img.src = images_array[index];


  }, 500 / fps);//speed of the animation
}
