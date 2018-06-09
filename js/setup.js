'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)'];
var EYES_COLORS = ['rgb(0,0,0)', 'rgb(255,0,0)', 'rgb(0,0,255)', 'rgb(255,255,0)', 'rgb(0,255,0)'];
var WIZARD_NUMBER = 4;

var getRandomIndex = function (arrayLength) {
  return Math.floor(Math.random() * (arrayLength - 1));
};

var shuffleCopyArray = function (arrayOld) {
  var arrayNew = [];
  for (var i = 0; i < arrayOld.length; i++) {
    arrayNew.push(arrayOld[i]);
  }
  for(i = 0; i < arrayNew.length; i++) {
    var elementCopy = arrayNew[i];
    var randomIndex = getRandomIndex(arrayNew.length);
    arrayNew[i] = arrayNew[randomIndex];
    arrayNew[randomIndex] = elementCopy;
  }
  return arrayNew;
};

var getWizard = function (wizardName, wizardSurname, wizardCoat, wizardEyes) {
  var wizard = {};
  wizard.name = wizardName + ' ' + wizardSurname;
  wizard.coatColor = wizardCoat;
  wizard.eyesColor = wizardEyes;
  return wizard;
};

var getWizards = function () {
  var wizards = [];
  var namesShuffle = shuffleCopyArray(NAMES);
  var surnamesShuffle = shuffleCopyArray(SURNAMES);
  var coatsShuffle = shuffleCopyArray(COAT_COLORS);
  var eyesShuffle = shuffleCopyArray(EYES_COLORS);
  for (var i = 0; i < WIZARD_NUMBER; i++) {
    wizards.push(getWizard(namesShuffle[i], surnamesShuffle[i], coatsShuffle[i], eyesShuffle[i]));
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var getFragment = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

var initPage = function () {
  var element = document.querySelector('.setup');
  element.classList.remove('hidden');
  element.querySelector('.setup-similar').classList.remove('hidden');
  return element;
};

var userDialog = initPage();
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
similarListElement.appendChild(getFragment(getWizards()));
