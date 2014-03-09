Trie = function(){
  this.characters = {};
  this.isWord = false;
};



Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
  index = index || 0;
  
  
  var thisChar = this.characters[word[index]];

  if(thisChar){
    thisChar.learn(word, index+1);
  }
  else {
    if(index === word.length){
      this.isWord = true;
    }else{
      this.characters[word[index]] = new Trie();
      this.characters[word[index]].learn(word, index+1);
    }
  }
  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
};

var tree = new Trie();
tree.learn("hi");
tree.learn("he");
tree.learn("hello");
tree.learn("awesome");
tree.learn("falcon");
tree.learn("rancor");
tree.learn("skywalker");

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  currentWord = currentWord || "";
  if(this.isWord){
    words.push(currentWord);
  }
  for(var currentLetter in this.characters){
    var newWord = currentWord + currentLetter;
    this.characters[currentLetter].getWords(words, newWord);
  }
  return words;

};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  // Be sure to consider what happens if the word is not in this Trie.

  word = word || "";
  index = index || 0;
  var node = word[index];

  if(this.characters[node]) {
    return this.characters[node].find(word, index + 1);
  } else if (index === word.length){
    return this;
  } else {
    return false;
  }
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
  var word = this.find(prefix);
  if (!word){return [];}
  return word.getWords([],prefix);
};