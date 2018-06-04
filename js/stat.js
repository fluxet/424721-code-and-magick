'use strict';

var fontParam = {
  SIZE: 16,
  COLOR: 'rgba(0,0,0,1)'
};

var cloudParam = {
  WIDTH: 420,
  HEIGHT: 270,
  BORDER: 1,
  X: 100,
  Y: 10,
  TONGUE: 80,
  GAP: 10,
  COLOR: 'rgba(255,255,255,1)',
  SHADOW: 'rgba(0, 0, 0, 0.7)'
};
var pillarParam = {
  WIDTH: 10,
  HEIGHT: 300,
  COLOR: 'rgba(165,42,42,1)'
};
var barParam = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50,
  USER_COLOR: 'rgba(255, 0, 0, 1)'
};

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + cloudParam.WIDTH, y);
  ctx.lineTo(x + cloudParam.WIDTH, y + cloudParam.HEIGHT);
  ctx.lineTo(x, y + cloudParam.HEIGHT);
  ctx.lineTo(x + cloudParam.TONGUE, y + cloudParam.HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

var renderPillar = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - cloudParam.BORDER, pillarParam.WIDTH, pillarParam.HEIGHT);
};

var wrapText = function (ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text.split(' ');
  var countWords = words.length;
  var line = '';
  for (var i = 0; i < countWords; i++) {
    var testLine = line + words[i] + ' ';
    var testWidth = ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[i] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, marginLeft, marginTop);
};

var getDiagram = function (ctx, players, results, index) {
  var score;
  ctx.fillStyle = fontParam.COLOR;
  ctx.fillText(players[index], cloudParam.X + cloudParam.TONGUE + cloudParam.GAP + (barParam.WIDTH + barParam.GAP) * index, cloudParam.Y + cloudParam.HEIGHT - cloudParam.GAP);
  
  var getRandomBlue = function () {
    var decimalRoundRate = 10;
    var opacityMin = 0.1;
    var opacityMax = 1;
    var opacity = Math.floor(Math.random() * (opacityMax - opacityMin) * decimalRoundRate) / decimalRoundRate + opacityMin;
    var randomBlue = 'rgba(0,0,255,' + opacity + ')';
    return randomBlue;
  };
  
  ctx.fillStyle = (players[index] === 'Вы') ? barParam.USER_COLOR : getRandomBlue();
  score = barParam.HEIGHT * results[index] / Math.max.apply(null, results);
  ctx.fillRect(cloudParam.X + cloudParam.TONGUE + cloudParam.GAP + (barParam.WIDTH + barParam.GAP) * index, cloudParam.Y + cloudParam.HEIGHT - fontParam.SIZE - cloudParam.GAP * 2, barParam.WIDTH, score * (-1));
  
  ctx.fillStyle = fontParam.COLOR;
  ctx.fillText(Math.round(results[index]), cloudParam.X + cloudParam.TONGUE + cloudParam.GAP + (barParam.WIDTH + barParam.GAP) * index, cloudParam.Y + cloudParam.HEIGHT - fontParam.SIZE - cloudParam.GAP * 3 - score);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudParam.X + cloudParam.GAP, cloudParam.Y + cloudParam.GAP, cloudParam.SHADOW);
  renderCloud(ctx, cloudParam.X, cloudParam.Y, cloudParam.COLOR);

  renderPillar(ctx, cloudParam.X + cloudParam.WIDTH + cloudParam.GAP, cloudParam.Y + cloudParam.GAP, cloudParam.SHADOW);
  renderPillar(ctx, cloudParam.X + cloudParam.WIDTH, cloudParam.Y, pillarParam.COLOR);

  ctx.fillStyle = fontParam.COLOR;
  ctx.font = fontParam.SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  wrapText(ctx, 'Ура, вы победили! Список результатов:', cloudParam.X + cloudParam.TONGUE + cloudParam.GAP, cloudParam.Y + cloudParam.GAP, cloudParam.WIDTH - cloudParam.TONGUE - cloudParam.GAP, fontParam.SIZE + cloudParam.GAP);

  ctx.textBaseline = 'bottom';
  for (var i = 0; i < names.length; i++) {
    getDiagram(ctx, names, times, i);
  }
};
