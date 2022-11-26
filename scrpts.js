var c1 = document.getElementById("Canvas1");
 var ct1 = c1.getContext("2d");
 var c0 = document.getElementById("Canvas0");
 var ct0 = c0.getContext("2d"); 
 var sourceImageData, destinationImage
 var dropSound = new Audio('http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg')
 var crunchSound = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_hit.wav')
 ct1.font="5vw Arial"
 ct0.font="4vw Arial"
 
 var t=0, procSwing, procDrop, inc=.01, dist=0, lives=5
 var swingSpan=1,score=0
 var w=Math.min(window.innerWidth, window.innerHeight)
 var h=w
 var howHigh=.9*h, xLast=.6*w, block=0
 var rope={xTop: 150, yTop: 0, len: 150, ang: 0}
 var box= {xMid: 150, yTop: 150, w: 10, h: 30}
 box.xTop=w/3
 rope.xTop=w/2
 c0.width=w
 c0.height=h
 c1.width=w
 c1.height=h
 
 box.w= .075*w
 box.h= .04*h
 ct0.fillRect(xLast-box.w/2,howHigh+box.h, box.w,box.h)
 start()

 function start(){
  inc+=.002
  t=0
  procSwing=setInterval(web,25)
  window.addEventListener("keypress", drop)
 }

 function drop(){
  window.removeEventListener("keypress", drop)
  clearInterval(procSwing)
  procDrop=setInterval(fall,25)
 }

 function fall(){
  box.yTop+=Math.max(.02*box.yTop, .01*h)
  dist=Math.abs(box.xMid-xLast)
  if(box.yTop>howHigh && dist<.95*box.w){
   clearInterval(procDrop)
   crunchSound.play()
   box.yTop=howHigh
   xLast=box.xMid
   block++
boxed() 
   if(block>2){scroll() }
   else {howHigh-=box.h }
   start()
   return}
  if(box.yTop>h){
   clearInterval(procDrop)
    dropSound.play()
   lives--
   if(lives<1){alert("Game Over " ); return}
   start()
  }
  drawBox()
 }

 function boxed(){
  if (dist<10){ct0.fillStyle="blue"; score+=10}
  else{ct0.fillStyle="green";  score+=5}
  if (dist<2){ct0.fillStyle="red "; score+=10}
  if (dist<1){ct0.fillStyle="orange "; score+=10}
  ct0.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
  ct0.fillStyle="black"
  ct0.fillText(block, box.xMid-.3*box.w,box.yTop+.02*h)
 }

 function scroll(){
  setTimeout(down,100)
  setTimeout(down,200)
 }

 function down(){
  sourceImageData = c0.toDataURL("image/png");
  destinationImage = new Image;
  destinationImage.onload = function(){
   ct0.clearRect(0,0,w,h)
   ct0.drawImage(destinationImage,0,box.h/2)  };
  destinationImage.src = sourceImageData;
 }

 function web(){
  t+=inc
  swingSpan=1+Math.min(.5, .02*block)
  rope.ang =swingSpan*Math.sin(t)
  drawBox()
  ct1.beginPath()
  ct1.moveTo(rope.xTop, rope.yTop)
  box.xMid= rope.xTop + rope.len*Math.sin(rope.ang)
  box.yTop= rope.len*Math.cos(rope.ang)
  ct1.lineTo(box.xMid, box.yTop)
  ct1.stroke();
  ct1.fillText("Lives="+lives, .1*w,.03*h)
  ct1.fillText("Score="+score, .7*w,.03*h)
 }

 function drawBox(){
  ct1.clearRect(0,0, w,h)
  ct1.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
 }
