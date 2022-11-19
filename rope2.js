<!DOCTYPE html>
<html>
<body>

<canvas id="Canvas0" width="400" height="400"
style="position: absolute; left: 0; top: 0; z-index: 0;"></canvas>
<canvas id="Canvas1" width="400" height="450"
style="position: absolute; left: 0; top: 0; z-index: 1;"></canvas>

<script>
var c1 = document.getElementById("Canvas1");
var ct1 = c1.getContext("2d");
var c0 = document.getElementById("Canvas0");
var ct0 = c0.getContext("2d"); 
var t=0, procSwing, procDrop

var rope={xTop: 150, yTop: 0, len: 150, ang: 0.2}
var box= {xMid: 150, yTop: 150, w: 40, h: 30}
var howHigh=370, xLast=170
start()

function start(){
ct1.fillRect(0,400,400,10)
ct1.fillRect(xLast-box.w/2,390, box.w,20)
procSwing=setInterval(web,25)
window.addEventListener("keypress", drop)
}

function drop(){
 window.removeEventListener("keypress", drop)
 clearInterval(procSwing)
 procDrop=setInterval(fall,25)
}

function fall(){
 
 box.yTop+=5
 if(box.yTop>howHigh && Math.abs(box.xMid-xLast)<.8*box.w){
  clearInterval(procDrop)
  ct0.fillStyle="green"
  ct0.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
  howHigh-=box.h
  xLast=box.xMid
  start()
  return}
 if(box.yTop>430){
  clearInterval(procDrop)
  alert("Game Over " )
  return
 }
 drawBox()
}


function web(){
 t+=0.035
 rope.ang = Math.sin(t)
 drawBox()
 ct1.beginPath()
 ct1.moveTo(rope.xTop, rope.yTop)
 box.xMid= rope.xTop + rope.len*Math.sin(rope.ang)
 box.yTop= rope.len*Math.cos(rope.ang)
 ct1.lineTo(box.xMid, box.yTop)
 ct1.stroke();
}

function drawBox(){
 ct1.clearRect(0,0, 395,395)
 ct1.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
}
</script> 

</body>
</html>
