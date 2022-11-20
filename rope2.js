<!DOCTYPE html>
<html>
<body>
<canvas id="Canvas0" width="500" height="500"
style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
<canvas id="Canvas1" width="500" height="500"
style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>

<script>
 var c1 = document.getElementById("Canvas1");
 var ct1 = c1.getContext("2d");
 var c0 = document.getElementById("Canvas0");
 var ct0 = c0.getContext("2d"); 
 var sourceImageData, destinationImage

 var rope={xTop: 150, yTop: 0, len: 150, ang: 0.2}
 var box= {xMid: 150, yTop: 150, w: 40, h: 30}
 var howHigh=450, xLast=170, block=0
 var t=0, procSwing, procDrop, inc=.01, dist=0, lives=5
var score=0

 ct0.fillRect(xLast-box.w/2,howHigh+box.h, box.w,20)
 start()

 function start(){
  inc+=.002
  procSwing=setInterval(web,25)
  window.addEventListener("keypress", drop)
 }

 function drop(){
  window.removeEventListener("keypress", drop)
  clearInterval(procSwing)
  procDrop=setInterval(fall,25)
 }

 function fall(){
  box.yTop+=4
  dist=Math.abs(box.xMid-xLast)
  if(box.yTop>howHigh && dist<.95*box.w){
   clearInterval(procDrop)
   boxed() 
   xLast=box.xMid
   block++
   if(block>2){scroll() }
   else {howHigh-=box.h }
   start()
   return}
  if(box.yTop>500){
   clearInterval(procDrop)
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
  ct0.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h+1)
 }

 function scroll(){
  setTimeout(down,40)
  setTimeout(down,80)
 }

 function down(){
  sourceImageData = c0.toDataURL("image/png");
  destinationImage = new Image;
  destinationImage.onload = function(){
   ct0.clearRect(0,0,500,500)
   ct0.drawImage(destinationImage,0,box.h/2)  };
  destinationImage.src = sourceImageData;
 }

 function web(){
  t+=inc
  rope.ang = Math.sin(t)
  drawBox()
  ct1.beginPath()
  ct1.moveTo(rope.xTop, rope.yTop)
  box.xMid= rope.xTop + rope.len*Math.sin(rope.ang)
  box.yTop= rope.len*Math.cos(rope.ang)
  ct1.lineTo(box.xMid, box.yTop)
  ct1.stroke();
  ct1.font="20px Arial"
  ct1.fillText("Lives="+lives, 20,30)
  ct1.fillText("Score="+score, 330,30)
 }

 function drawBox(){
  ct1.clearRect(0,0, 500,500)
  ct1.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
 }
</script> 
</body>
</html>
