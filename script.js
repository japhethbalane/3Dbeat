
////////////////////////////////////////////////////////////////////

var scene = document.querySelector('a-scene');
var xs = [];
var ys = [];
var zs = [];
var prevs = [];

var str = '';
for (var i = -40; i <= 40; i += 5) {
	for (var j = -40; j <= 40; j += 5) {
		str += '<a-box position="'+ i +' '+ 0 +' '+ (j-25) +'" color="' + getRandomColor() + '" height="'+ 0 +'"></a-event></a-box>';
        xs.push(i);
        ys.push(-4);
        zs.push(j-25);
        prevs.push(0);
	}
}
scene.innerHTML = str + scene.innerHTML;

var boxes = document.querySelectorAll('a-box');

////////////////////////////////////////////////////////////////////

var audio = new Audio();
audio.src = 'audio/beat.mp3';
audio.autoplay = true;
audio.loop = true;

var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();

source.connect(analyser);
analyser.connect(audioCtx.destination);

var audioData = new Uint8Array(analyser.fftSize);
var audioDataIndexInterval = Math.floor(analyser.fftSize / boxes.length);

var frameTimestamp = new Date();
(function visualize() {
    requestAnimationFrame(visualize);
    analyser.getByteTimeDomainData(audioData);
    // analyser.getByteFrequencyData(audioData);

    boxes.forEach(function(box, i) {
        var data = (audioData[i * audioDataIndexInterval] - 128) / 10;


        // var newHeight = box.getAttribute('height') > Math.max(0, data) ? box.getAttribute('height') : Math.max(0, data) ;
        box.setAttribute('height', Math.max(0, data));

        // var newPos = box.getAttribute('height') > Math.max(0, data) ? box.getAttribute('position').y : (ys[i] + Math.max(0, data) / 2) ;
        box.setAttribute("position", xs[i] + ' ' + (ys[i] + Math.max(0, data) / 2) + ' ' + zs[i]);
    });

})();

audio.play();

////////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

function getRandomColor() {
    var r = randomBetween(50,255);
    var g = randomBetween(50,255);
    var b = randomBetween(255,255);
    var a = 1;
    return 'rgba('+r+','+g+','+b+','+a+')';
}

////////////////////////////////////////////////////////////////////