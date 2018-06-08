'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)'];
var EYES_COLORS = ['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(0,255,0)'];
var WIZARD_NUMBER = 4;

var getWizards = function (names, surnames, coats, eyes) {
  var wizards = [];

  var getRandomIndex = function (params) {
    return Math.floor(Math.random() * (params.length - 1));
  };

  for (var i = 0; i < WIZARD_NUMBER; i++) {
    var wizardParam = {};
    var randomNameIndex = getRandomIndex(names);
    var randomSurnameIndex = getRandomIndex(surnames);
    var randomCoatIndex = getRandomIndex(coats);
    var randomEyeIndex = getRandomIndex(eyes);

    wizardParam.name = names[randomNameIndex] + ' ' + surnames[randomSurnameIndex];
    wizardParam.coatColor = coats[randomCoatIndex];
    wizardParam.eyesColor = eyes[randomEyeIndex];
    wizards[i] = wizardParam;

    names.splice(randomNameIndex, 1);
    surnames.splice(randomSurnameIndex, 1);
    coats.splice(randomCoatIndex, 1);
    eyes.splice(randomEyeIndex, 1);
  }
  return wizards;
};

var wizards = getWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS);

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
