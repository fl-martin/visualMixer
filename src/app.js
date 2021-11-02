import getMedia from "./utils/getMedia";
import hydraSetup from "./setup/hydra";
import poseSetup from "./setup/pose";
import registerWebMIDI from "./utils/registerWebMIDI";
import shaderSetup from "./setup/shader";
import webAudio from "./setup/webAudio";
import HydraSketches from "./program-control/HydraSketches";
import setListeners from "./listeners/setListeners";
import ShadersFrags from "./program-control/ShadersFrags";
import PoseOnResults from "./program-control/PoseOnResults";

const size = { width: 1280, height: 720 };

(async function startProgram() {
	const media = await getMedia(size);

	const pose = poseSetup(document, size);
	const audio = webAudio(media);
	const shader = shaderSetup(document, size, audio.dataArray);
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

	const poseController = new PoseOnResults(pose);
	console.log(poseController);

	setListeners(
		document,
		audio,
		hydraController,
		shaderController,
		poseController
	);
})();

//poder no append child shader canvas

//forma de detener proceso

//normalizar valores audio data

//manejo error si no hay audio
