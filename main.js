//console.log('reading js file...!');
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = { x: undefined, y: undefined}
var maxRadius = 50;
var minRadius = 2;

var bubblesArray = [];
var noOfBubbles = 30;
var maxNoOfBubbles = 800;

var bubbleSpeed = 50;

var colorArray = [
					'#0477bf',
					'#024873',
					'#05f240',
					'#f28705',
					'#f24405'
					];

canvas.addEventListener('mousemove', 
						function(event) {
							mouse.x = event.x;
							mouse.y = event.y;						
						});
				
canvas.addEventListener('mousedown', 
						function(event) {
						mouse.x = event.x;
						mouse.y = event.y;
						new Audio('blop.mp3').play()

						if (bubblesArray.length < maxNoOfBubbles){
							addBubbles();
						}				
						});

// canvas.addEventListener('touchstart', 
// 						function(event) {
// 							mouse.x = event.touches[0].clientX;
// 							mouse.y = event.touches[0].clientY;
// 							if (bubblesArray.length < maxnoOfBubbles){
// 								addBubbles();
// 							}
// 						}, false);						

window.addEventListener('resize', 
						function(event) {
							canvas.width = window.innerWidth;
							canvas.height = window.innerHeight;						
							init();
						});

function Bubble(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length) ];
	

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.strokeStyle = this.color;
		c.fillStyle = this.color;
		c.fill();
// 		c.stroke();		
	}
	
	this.update = function () {
		if (this.x + radius > canvas.width || this.x - (radius) < 0){
			this.dx = -this.dx;
		}
		if (this.y + radius > canvas.height || this.y - (radius) < 0){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50 &&
			this.radius < maxRadius){
			this.radius += 1;
		}
		else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}
		
		this.draw();
	}
}

function addBubbles(){
	for (var i = 0; i < noOfBubbles; i++){
		var x = Math.abs((Math.random() * canvas.width - minRadius*4)) + minRadius*2;
		var y = Math.abs((Math.random() * canvas.height - minRadius*4)) + minRadius*2;
		var dx = Math.random() - 1;
		var dy = Math.random() - 1;
		var radius = (Math.random() * 10) + 1;
	
		var bubble = new Bubble(x, y, dx, dy, radius);
		bubblesArray.push(bubble);
	}	
}

function init(){
	bubblesArray = [];	
	addBubbles();
}

function animate(){
// 	requestAnimationFrame(animate);
	c.clearRect(0,0, innerWidth, innerHeight);
	for (var i = 0; i < bubblesArray.length; i++){
		bubblesArray[i].update();
	}
}

function addManyBubbles(){
	noOfBubblesOriginal = noOfBubbles;
	noOfBubbles = maxNoOfBubbles;
	init();
	noOfBubbles = noOfBubblesOriginal;
}
// animate();
init();
setInterval(animate, bubbleSpeed);