const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');
const Characters = require('../models/characters.js');
const CharacterView = require('./character_view.js')

const CharacterListView = function(container){
  this.container = container;
};

CharacterListView.prototype.bindEvents = function () {
  PubSub.subscribe('Chars:all-chars-ready', (evt) => {
    const characters = evt.detail;
    this.render(characters);
  });
};

CharacterListView.prototype.render = function (characters) {
  // this.container.innerHTML = "";
  console.log(characters);
  const characterView = new CharacterView(this.container, character)
  characterView.render();
};

module.exports = CharacterListView;
