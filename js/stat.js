'use strict';

var FONT_SIZE = 16;
var fontParam = FONT_SIZE + 'px PT Mono';

var cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  TONGUE: 80,
  GAP: 10,
  COLOR: 'rgba(255,255,255,1)',
  SHADOW: 'rgba(0, 0, 0, 0.7)'
};
var pillar = {
  WIDTH: 10,
  HEIGHT: 300,
  COLOR: 'rgba(165,42,42,1)'
};
var bar = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50
};

var renderCloud = function (ctx, x, y, color) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + cloud.WIDTH, y);
  ctx.lineTo(x + cloud.WIDTH, y + cloud.HEIGHT);
  ctx.lineTo(x, y + cloud.HEIGHT);
  ctx.lineTo(x + cloud.TONGUE, y + cloud.HEIGHT / 2);
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
};

var renderPillar = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y - 1, pillar.WIDTH, pillar.HEIGHT);
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
    }
    else {
        line = testLine;
    }
  }
  ctx.fillText(line, marginLeft, marginTop);
};

var getRandomBlue = function () {
  var opacity = Math.floor(Math.random() * 9) / 10 + 0.1;
  var randomBlue = 'rgba(0,0,255,' + opacity + ')';
  return randomBlue;
};

var getDiagram = function (ctx, players, results, index) {
  var score;
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillText(players[index], cloud.X + cloud.TONGUE + cloud.GAP + (bar.WIDTH + bar.GAP) * index, cloud.Y + cloud.HEIGHT - cloud.GAP);
  ctx.fillStyle = getRandomBlue();
  if (players[index] === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  score = bar.HEIGHT * results[index] / Math.max.apply(null, results);
  ctx.fillRect(cloud.X + cloud.TONGUE + cloud.GAP + (bar.WIDTH + bar.GAP) * index, cloud.Y + cloud.HEIGHT - FONT_SIZE - cloud.GAP * 2, bar.WIDTH, score * (-1));
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillText(Math.round(results[index]), cloud.X + cloud.TONGUE + cloud.GAP + (bar.WIDTH + bar.GAP) * index, cloud.Y + cloud.HEIGHT - FONT_SIZE - cloud.GAP * 3 - score);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.X + cloud.GAP, cloud.Y + cloud.GAP, cloud.SHADOW);
  renderCloud(ctx, cloud.X, cloud.Y, cloud.COLOR);

  renderPillar(ctx, cloud.X + cloud.WIDTH + cloud.GAP, cloud.Y + cloud.GAP, cloud.SHADOW);
  renderPillar(ctx, cloud.X + cloud.WIDTH, cloud.Y, pillar.COLOR);

  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.font = fontParam;
  ctx.textBaseline = 'hanging';
  wrapText(ctx, 'Ура, вы победили! Список результатов:', cloud.X + cloud.TONGUE + cloud.GAP, cloud.Y + cloud.GAP, cloud.WIDTH - cloud.TONGUE - cloud.GAP, FONT_SIZE + cloud.GAP);

  ctx.textBaseline = 'bottom';
  for (var i = 0; i < names.length; i++) {
    getDiagram(ctx, names, times, i);
  }
};
