$(document).ready(function(){
console.log('connected');

// sequence();
// play();
// userClick();
//
//
// registerClick();
// compToArray();
// compToString();
//
// if(finalUserOutput.length === finalComp.length){
//   compare();
// }

sequence();
play();
registerClick();
clickToCompare();










})//end of document.ready

var compGenerator = [];//generated random pattern
var userArray = [];//user pattern
var idArray = []//array of id's from compGenerator
var finalUserOutput = '';//string of user pattern
var finalComp = '';//string of idArray

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
  //console.log('animate started');
  if (square == null) return false;
  //console.log('animate passed null check');
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

var user = {
  number: 1,
  level: 1,
  turn: 0,
  difficulty: 1,
  score: 0,
  active: false,
  hits: 2,
  clicks: 0,
}


 function play(){
   $('#playBtn').click(function(){
     for (var i = 0; i < compGenerator.length; i++) {
      //  animate(compGenerator[i]);
      //  console.log(compGenerator);
      repeat(compGenerator[i],i)
     }
    //  sequence();
     userClick();
    //  registerClick();
     compToArray();
     compToString();
    //  if(finalUserOutput.length === user.hits){
    //    compare();
    //  }
   })
 }



function sequence() {

  for (var i = 0; i < user.hits; i++) {
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
    user.clicks += 1;
    var clickedId = $(this).prop('id');
    console.log(clickedId);
    console.log("user clicks" + user.clicks);
    userArray.push(clickedId);
    console.log("user array"+userArray);
    finalUserOutput = userArray.join(',');
    console.log("final"+finalUserOutput);

    clickToCompare();
  })
}




function compToArray() {
for (var i = 0; i < compGenerator.length; i++) {
  console.log(compGenerator[i].pad);
  idArray.push(compGenerator[i].pad);
  }
}
function compToString() {
for (var i = 0; i < idArray.length; i++) {
  idArray[i] = idArray[i].replace('#','');
  console.log(idArray);
  var compString = idArray.join(',')
  finalComp = compString;
  }
  console.log(finalComp);
}

function compare() {
  // console.log(finalUserOutput);
  // console.log(finalComp);
  if (finalUserOutput == finalComp){
    user.score += 1;
    if(user.number == 1){
    $('#user1').text(user.score);
  } else {
    $('#user2').text(user.score);
      }
    console.log('good hit');
    $('#topOfGame').text("You won! Press play to move on");
    $('#topOfGame').animate({opacity: 1.0},{
      duration: 1000,
      complete: function(){
        $('#topOfGame').animate({opacity:0.6}, 2000);
      }
    })
    continueGame();
  } else {
    console.log('bad hit');
    if(user.number == 1){
    $('#topOfGame').text("You lose! Next Player Turn!");
    $('#topOfGame').animate({opacity: 1.0},{
      duration: 1000,
      complete: function(){
        $('#topOfGame').animate({opacity:0.6}, 2000);
      }
    })//end of animate
  } else {
    $('#topOfGame').text("You lose! Game Over");
    $('#topOfGame').animate({opacity: 1.0},{
      duration: 1000,
      complete: function(){
        $('#topOfGame').animate({opacity:0.6}, 2000);
      }
    })
  }
    user.number += 1;
    if (user.number == 2) {
      secondPlayer();
    } else if (user.number == 3) {
    getWinner();
    }
  }
} //end of compare()




function clickToCompare(){
  // check to see how many are in comp
  // update click counter
  // console.log(user.clicks);
  // check and see how many times user has clicked
    if (user.clicks == user.hits) {
      compare();
    }
}

function continueGame(){
  user.hits += 1;
  user.clicks = 0;
  //console.log("user clicks continue"+user.clicks);
  compGenerator = [];
  //compGenerator.push(sounds[randomNum()]);//generated random pattern
  userArray = [];//user pattern
  idArray = [];//array of id's from compGenerator
  finalUserOutput = '';//string of user pattern
  finalComp = '';
  sequence();
  // play();
  // clickToCompare();
}

function secondPlayer() {
  user.hits = 2;
  user.clicks = 0;
  user.score = 0;
  compGenerator = [];
  //compGenerator.push(sounds[randomNum()]);//generated random pattern
  userArray = [];//user pattern
  idArray = [];//array of id's from compGenerator
  finalUserOutput = '';//string of user pattern
  finalComp = '';
  sequence();
}

function getWinner() {
  var user1Score = $('#user1').html();
  var user2Score = $('#user2').html();

  if (user1Score > user2Score) {
    $('#topOfGame').text("Player 1 beat Player 2");
  } else if(user2Score > user1Score){
    $('#topOfGame').text("Player 2 beat Player 1");
  } else {
    $('#topOfGame').text("It's a draw folks!");
  }
}
