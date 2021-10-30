import getMedia from "./utils/getMedia";
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
	const media = await getMedia(size);

	const pose = poseSetup(size);
	const audio = webAudio(media);
	const shader = shaderSetup(size);
	const midi = registerWebMIDI();
	const hydra = hydraSetup(
		document,
		pose.poseSegmentation,
		shader.canvas,
		size
	);

	const hydraController = new HydraSketches(
		midi.cc,
		audio.dataArray,
		hydra.hideShow
	);
	const shaderController = new ShadersFrags(shader);

	setListeners(
		document,
		audio,
		hydraController,
		shaderController,
		pose.playPause
	);
})();

//poder no append child shader canvas

//forma de detener proceso

//normalizar valores audio data

//cambiar uniforms al shader sin error

//manejo error si no hay audio
