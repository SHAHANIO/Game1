const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';
ctx.fillRect(50, 50, 100, 100);

ctx.strokeStyle = 'blue';
ctx.strokeRect(90, 90, 100, 100);

ctx.clearRect(100, 100, 100, 100);

ctx.beginPath();
ctx.moveTo( 0, 0);
ctx.lineTo( 0, 300);
ctx.lineTo(300, 300);
ctx.lineTo(300, 0);
ctx.closePath();
ctx.stroke();
ctx.fillStyle = '#00000099';
ctx.fill();

ctx.font = '100px maiandra gd';
ctx.fillStyle = 'blue';
ctx.fillText('hai', 300, 100);

ctx.font = '100px maiandra gd';
ctx.strokeStyle = 'orange';
ctx.strokeText('hei', 300, 180);

