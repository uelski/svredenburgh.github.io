$(document).ready(function(){
console.log('connected');

sequence();
play();
userClick();


registerClick()
setTimeout(function(){
  compare();
}, 2000);










})//end of document.ready

var compGenerator = [];
var userArray = [];

function playSound(square){
  if (square.hasOwnProperty('sound')) {
    $(square.sound).trigger('play');
  }
}


function sound(pad,sound){
  this.pad = pad;
  this.sound = sound;
}

var s1 = new sound("#pad1","#sound1");
var s2 = new sound('#pad2','#sound2');
var s3 = new sound('#pad3','#sound3');
var s4 = new sound('#pad4','#sound4');
var s5 = new sound('#pad5','#sound5');
var s6 = new sound('#pad6','#sound6');
var s7 = new sound('#pad7','#sound7');
var s8 = new sound('#pad8','#sound8');
var s9 = new sound('#pad9','#sound9');

var sounds = [s1,s2,s3,s4,s5,s6,s7,s8,s9];

function repeat(square, times){
  setTimeout(function() {
    soundFlash(square);
  },(times*500));
}
function flash(square) {
$(square.pad).animate({opacity: 1.0},{
  duration: 50,
  complete: function(){
    $(square.pad).animate({opacity:0.6}, 100);
  }
})
}
function soundFlash(square){
  playSound(square);
  flash(square);
}
function animate(square, times){
  console.log('animate started');
  if (square == null) return false;
  console.log('animate passed null check');
  repeat(square, times);
  // soundFlash(square);
  playSound(square);
  $(square.pad).animate({opacity: 1.0},{
    duration: 50,
    complete: function(){
      $(square.pad).animate({opacity:0.6}, 100);
      }
  })
}
var randomPad = sounds[randomNum()];

function randomNum(){
  var ret = (Math.floor(Math.random() * 8))
  return ret;
}

var user1 = {
  level: 1,
  turn: 0,
  difficulty: 1,
  score: 0,
  active: false,
  hits: 2,
  compSequence: [],
  userSequence: [],
  init: function(){
    newGame();
  }
}



 function play(){
   $('#playBtn').click(function(){
     for (var i = 0; i < compGenerator.length; i++) {
      //  animate(compGenerator[i]);
      //  console.log(compGenerator);
      repeat(compGenerator[i],i)
     }
   })
 }

function sequence() {

  for (var i = 0; i < user1.hits; i++) {
    var rando = randomNum();
    compGenerator.push(sounds[rando]);
    //console.log(compGenerator);
  }
}

function userPlay(pad) {
  this.pad = pad;
  $(pad.pad).click(function(){
    animate(pad);
  })
}
function userClick(){
  for (var i = 0; i < sounds.length; i++) {
    userPlay(sounds[i]);
  }
}

function registerClick() {
  $('.pad').click(function(){

    var clickedId = $(this).prop('id');
    console.log(clickedId);
    userArray.push(clickedId);
    console.log(userArray);
  })
}

function finalArray(){
  var array = [];
  setTimeout(function(){
    array = userArray;
  }, 2000);
  console.log(array);
  return array;
}

var finalUserArray = finalArray();

function compare() {
  for (var i = 0; i < user1.hits; i++) {
  if (finalUserArray == compGenerator[i].pad){
    console.log('good hit');
  } else {
    console.log('bad hit');
  }
  }
}
