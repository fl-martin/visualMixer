import getAudio from "./utils/getAudio";
import hydraSetup from "./setup/hydra";
import poseSetup from "./setup/pose";
import registerWebMIDI from "./utils/registerWebMIDI";
import shaderSetup from "./setup/shader";
import webAudio from "./setup/webAudio";
import HydraSketches from "./program-control/HydraSketches";
import setListeners from "./listeners/setListeners";
import ShadersFrags from "./program-control/ShadersFrags";

const size = { width: 1280, height: 720 };

(async function startProgram() {
	let audioStream;
	await getAudio().then((media) => (audioStream = media));

	const pose = poseSetup(size);
	const audio = webAudio(document, audioStream);
	const shader = shaderSetup(size);
	const midi = registerWebMIDI();
	hydraSetup(document, pose.poseSegmentation, shader.canvas, size);

	const hydraController = new HydraSketches(midi.cc, audio.dataArray);
	const shaderController = new ShadersFrags(shader.load, shader.playPause);

	setListeners(
		document,
		audio,
		hydraController,
		shaderController,
		pose.playPause
	);
})();

//poder elegir camara

//forma de detener proceso

//normalizar valores audio data

//togle display visibility

//cambiar uniforms al shader sin error

//manejo error si no hay audio