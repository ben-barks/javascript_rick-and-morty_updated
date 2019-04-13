const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Characters = function() { //constructor
  this.characterList = [];
};

Characters.prototype.getData = function () {
  const allUrls = this.getUrlList(`https://rickandmortyapi.com/api/character/?page=`);
  Promise.all(allUrls.map( function(url) {
    const requestHelper = new RequestHelper(url);
    return requestHelper.get()
  }))
    .then((characters) => {
      const flattened = characters.flat(1);

      const temp = flattened.reduce((sum, x) => {
        // x.results.forEach((char) => {
        //   sum.push(char);
        // });
        sum.push.apply(sum, x.results);
        return sum;
      },[]);

      this.characterList = temp;
      const allChars = [];
      const allCharacters = [];
      let names = this.characterList.forEach((character) => {
        allChars.push(character.name)
      })
      let chars = this.characterList.forEach((character) => {
        allCharacters.push(character)
      })
      PubSub.publish('Chars:ready', allChars)
      PubSub.publish('Chars:all-chars-ready', allCharacters)
    })
    .catch(() => {

    });
};

Characters.prototype.bindEvents = function () {
  PubSub.subscribe('CharsSelV:selected', (evt) => {
    const selectedIndex = evt.detail;
    const selectedCharacter = this.characterList[selectedIndex];
    // send character wherever
    PubSub.publish('Chars:selected-ready', selectedCharacter)
  });
};

Characters.prototype.getUrlList = function (url) {
  const urlList = [];
  for (let pageNumber = 1; pageNumber < 21; pageNumber++) {
    const newUrl = url + pageNumber
    urlList.push(newUrl);
  };
  return urlList;
};

module.exports = Characters;
