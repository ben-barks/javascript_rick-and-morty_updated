const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js')

const CharacterView = function(container, character){
  this.container = container;
  this.character = character;
};

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('Chars:all-chars-ready', (evt) => {
    this.allChars = evt.detail;
    this.container.innerHTML = '';
    this.renderAll();
  });
  PubSub.subscribe('Chars:selected-ready', (evt) => {
    this.container.innerHTML = '';
    if (evt.detail){
      const character = evt.detail;
      this.render(character);
    } else {
      this.renderAll();
    }
  });
};

CharacterView.prototype.render = function (char) {
  const charactersContainer = document.createElement('div');
  charactersContainer.classList.add('all-chars-container');

  const name = this.createPara('Name', char.name);
  charactersContainer.appendChild(name);

  const status = this.createPara('Status', char.status);
  charactersContainer.appendChild(status);

  const species = this.createPara('Species', char.species);
  charactersContainer.appendChild(species);

  const gender = this.createPara('Gender', char.gender);
  charactersContainer.appendChild(gender);

  const origin = this.createPara('Origin', char.origin.name);
  charactersContainer.appendChild(origin);

  const image = this.createImg(char.image);
  charactersContainer.appendChild(image);

  this.container.appendChild(charactersContainer);
};

CharacterView.prototype.renderAll = function () {
  this.allChars.forEach((char) => {
    this.render(char);
  });
};

CharacterView.prototype.createContentHeading = function (name) {
  const heading = document.createElement('h3');
  heading.classList.add('character-name');
  heading.textContent = name;
  return heading;
};

CharacterView.prototype.createPara = function (label, text) {
  const para = document.createElement('p');
  para.classList.add('character-details');
  para.textContent = `${label}: ${text}`
  return para;
};

CharacterView.prototype.createImg = function (src) {
  const img = document.createElement('img');
  img.classList.add('character-image');
  img.src = src;
  return img;
};


CharacterView.prototype.createCharacterList = function () {
  const charactersList = document.createElement('ul');
  charactersList.classList.add('characters');
  this.populateList(charactersList);
  return charactersList;
};

CharacterView.prototype.populateList = function (list) {
  this.character.forEach((char) => {
    const characterListItem = document.createElement('li');
    characterListItem.src = character.image;
    list.appendChild(characterListItem);
  });
};


module.exports = CharacterView;
