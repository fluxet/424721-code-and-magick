var FLAG_WIDTH = 420;
var FLAG_HEIGHT = 270;
var FLAG_X = 100;
var FLAG_Y = 10;
var FLAG_TONGUE = 80;
var PILLAR_WIDTH = 10;
var PILLAR_HEIGHT = 300;
var GAP = 10;
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var FLAG_COLOR = 'white';
var PILLAR_COLOR = 'brown';
var NAME_WIDTH = 50;
var FONT_SIZE = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;
var barOpacity;
var score;

var renderFlag = function(ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + FLAG_WIDTH, y);
  ctx.lineTo(x + FLAG_WIDTH, y + FLAG_HEIGHT);
  ctx.lineTo(x, y + FLAG_HEIGHT);
  ctx.lineTo(x + FLAG_TONGUE, y + FLAG_HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();  
};

var renderPillar = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - 1, PILLAR_WIDTH, PILLAR_HEIGHT);  
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var  getRandom = function() {
  return  Math.floor( Math.random() * 10 ) / 10;
};

window.renderStatistics = function(ctx, names, times) {
  renderFlag(ctx, FLAG_X + GAP, FLAG_Y + GAP, SHADOW_COLOR);
  renderFlag(ctx, FLAG_X, FLAG_Y, FLAG_COLOR);
  
  renderPillar (ctx,FLAG_X + FLAG_WIDTH + GAP, FLAG_Y + GAP, SHADOW_COLOR);
  renderPillar (ctx,FLAG_X + FLAG_WIDTH, FLAG_Y, PILLAR_COLOR);
  
  ctx.fillStyle = 'black';
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', FLAG_X + FLAG_TONGUE + GAP, FLAG_Y + GAP);
  ctx.fillText('Список результатов:', FLAG_X + FLAG_TONGUE + GAP, FLAG_Y + GAP * 2 + FONT_SIZE);

  ctx.textBaseline = 'bottom';
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    ctx.fillText(names[i], FLAG_X + FLAG_TONGUE + GAP + (BAR_WIDTH + BAR_GAP) * i ,FLAG_Y + FLAG_HEIGHT - GAP );
    
    if (names[i] == 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      barOpacity = getRandom();
      ctx.fillStyle = 'rgba(0,0,255,' + barOpacity + ')'
    };
    
    score = BAR_HEIGHT * times[i] / getMaxElement(times);
    ctx.fillRect(FLAG_X + FLAG_TONGUE + GAP + (BAR_WIDTH + BAR_GAP) * i, FLAG_Y + FLAG_HEIGHT - FONT_SIZE - GAP * 2, BAR_WIDTH,score  * (-1));
    ctx.fillStyle = 'black';
    
    ctx.fillText(Math.round(times[i]), FLAG_X + FLAG_TONGUE + GAP + (BAR_WIDTH + BAR_GAP) * i, FLAG_Y + FLAG_HEIGHT - FONT_SIZE - GAP * 3 - score);
  };    
}

































