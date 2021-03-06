export default function webAudio(mediaStream) {
	const audioCtx = new AudioContext();

	const audio = audioCtx.createMediaStreamSource(mediaStream);

	const gainNode = audioCtx.createGain();
	const filterNode = audioCtx.createBiquadFilter();

	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 512;
	analyser.smoothingTimeConstant = 0.9;
	audio.connect(analyser);

	audio.connect(gainNode);
	gainNode.value = 1;
	gainNode.connect(filterNode);
	//filterNode.connect(audioCtx.destination);

	const dataArray = new Uint8Array(analyser.frequencyBinCount);

	(function startAnalyser() {
		requestAnimationFrame(startAnalyser);
		analyser.getByteFrequencyData(dataArray);
	})();

	function start() {
		audioCtx.resume();
		audio.play();
	}

	function filterFrequency(value) {
		filterNode.frequency.value = value;
	}

	return { start, filterFrequency, dataArray };
}

//control volumen input analyser

//o hacer funcion variable = ()=> , o cambiar en otro archivo, ventajas?
