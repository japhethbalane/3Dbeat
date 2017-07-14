
////////////////////////////////////////////////////////////////////

var scene = document.querySelector('a-scene');

var str = '';
for (var i = -10; i <= 10; i += 1.1) {
	for (var j = -10; j <= 10; j += 1.1) {
		str += '<a-box position="'+ i +' '+ -4 +' '+ (j-25) +'" color="orange" height="'+ 1 +'"></a-event>'+'</a-box>';
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

var timeDomainData = new Uint8Array(analyser.fftSize);
var audioDataIndexInterval = Math.floor(analyser.fftSize / boxes.length);

var frameTimestamp = new Date();
(function visualize() {
    requestAnimationFrame(visualize);
    analyser.getByteTimeDomainData(timeDomainData);

    boxes.forEach(function(box, i) {
        var data = timeDomainData[i * audioDataIndexInterval] - 128;
        box.setAttribute('height', Math.max(0, data / 10));
    });
})();

audio.play();

////////////////////////////////////////////////////////////////////

function randomBetween(min, max) {
	return Math.floor( Math.random() * (max - min) + min );
}

////////////////////////////////////////////////////////////////////