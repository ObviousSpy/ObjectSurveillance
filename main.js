status = "";
video = "";
objects = [];

function preload(){
video = createVideo('video.mp4');
video.hide();
}

function draw(){
image(video, 0, 0, 480, 380);
if(status != ""){
objectDetector.detect(video, gotResults);
for(i=0; i<objects.length; i++){
document.getElementById("Status").innerHTML = "status: objects detected";
document.getElementById("Number_Of_Objects").innerHTML = "Number Of Objects Detected Are: " + objects.length;
fill("#ff0000");
Percent = floor(objects[i].confidence*100);
text(objects[i].label+ "" + Percent + "%", objects[i].x + 10, objects[i].y + 10);
noFill();
stroke("#ff0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}
}

function setup(){
Canvas = createCanvas(480, 380);
Canvas.center();
}

function start(){
objectDetector = ml5.objectDetector('cocossd', modelloaded);
document.getElementById("Status").innerHTML = "status: detecting objects";
}

function modelloaded(){
console.log("modelLoaded");
status = true;
video.loop();
video.speed(1);
video.volume(0);
}

function gotResults(error, results){
if(error){
console.log(error);
}

else{
console.log(results);
objects = results;
}
}