$(document).ready(function(){
console.log('connected');







animate('#pad1',1);
})//end of document.ready
//
// function playSound(pad, sound) {
//   $(pad).click(function(){
//     $(sound).trigger('play');
//   });
// }

playSound = function(clip) {
var sound = $('#sound'+clip)[0];
sound.play();

}


var s1 = playSound('#pad1','#sound1');
var s2 = playSound('#pad2','#sound2');
var s3 = playSound('#pad3','#sound3');
var s4 = playSound('#pad4','#sound4');
var s5 = playSound('#pad5','#sound5');
var s6 = playSound('#pad6','#sound6');
var s7 = playSound('#pad7','#sound7');
var s8 = playSound('#pad8','#sound8');
var s9 = playSound('#pad9','#sound9');

function animate(pad,clip) {
  playSound(clip);
  $(pad).animate({background: "black"},500);
}
