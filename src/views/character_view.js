const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js')
const CharacterListView = require('./character_list_view.js')

const CharacterView = function(container, character){
  this.container = container;
  this.character = character;
};

CharacterView.prototype.bindEvents = function () {
  PubSub.subscribe('Chars:all-chars-ready', (evt) => {
    const allChars = evt.detail;
    this.container.innerHTML = '';
    this.renderHome(allChars)
  });
  PubSub.subscribe('Chars:selected-ready', (evt) => {
    const character = evt.detail;
    this.container.innerHTML = '';
    this.render(character);
  });
};

CharacterView.prototype.render = function (character) {
  const characterContainer = document.createElement('div');
  characterContainer.classList.add('character-container');

  const name = this.createContentHeading(character.name);
  characterContainer.appendChild(name);

  const status = this.createPara('Status', character.status);
  characterContainer.appendChild(status);

  const species = this.createPara('Species', character.species);
  characterContainer.appendChild(species);

  const gender = this.createPara('Gender', character.gender);
  characterContainer.appendChild(gender);

  const origin = this.createPara('Origin', character.origin.name);
  characterContainer.appendChild(origin);

  const image = this.createImg(character.image);
  characterContainer.appendChild(image);

  this.container.appendChild(characterContainer);
};

CharacterView.prototype.renderHome = function (characters) {
  const charactersContainer = document.createElement('div');
  charactersContainer.classList.add('all-chars-container');

  characters.forEach((char) => {
    const image = this.createImg(char.image);
    charactersContainer.appendChild(image);

    this.container.appendChild(charactersContainer);
  })
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
