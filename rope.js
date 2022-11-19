<!DOCTYPE html>
<html>
<body>

<canvas id="Canvas" width="400" height="300"></canvas>

<script>
var c1 = document.getElementById("Canvas");
var ct1 = c1.getContext("2d");
var t=0

var rope={xTop: 150, yTop: 0, len: 150, ang: 0.2}
var box= {xMid: 150, yTop: 150, w: 40, h: 30}

setInterval(web,30)

function web(){
 t+=0.035
 rope.ang = Math.sin(t)
 ct1.clearRect(0,0, 300,300)
 ct1.beginPath()
 ct1.moveTo(rope.xTop, rope.yTop)
 box.xMid= rope.xTop + rope.len*Math.sin(rope.ang)
 box.yTop= rope.len*Math.cos(rope.ang)
 ct1.lineTo(box.xMid, box.yTop)
 ct1.stroke();
 ct1.fillRect(box.xMid-(box.w/2),box.yTop, box.w, box.h)
}
</script> 

</body>
</html>
