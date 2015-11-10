$(document).ready(function(){
console.log('connected');









})//end of document.ready



function playSound(square){
    $(square.sound).trigger('play');

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

function animate(square){
  $(square.pad).animate({opacity: 1.0},{
    duration: 50,
    complete: function(){
      $(square.pad).animate({opacity:0.5}, 100);
    }
  })
}
