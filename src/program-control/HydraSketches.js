import live20xx1 from "../hydra-sketches/live20xx1";
import live20xx2 from "../hydra-sketches/live20xx2";
import live20xx3 from "../hydra-sketches/live20xx3";
import noiseHue1 from "../hydra-sketches/noiseHue1";
import casa from "../hydra-sketches/casa";

export default class HydraSketches {
	constructor(cc, audioStream, hideShow) {
		this.sketches = {
			0: () => hideShow(),
			1: () => noiseHue1(cc, audioStream),
			2: () => live20xx1(cc),
			3: () => live20xx2(cc, audioStream),
			4: () => live20xx3(cc, audioStream),
			5: () => casa(cc, audioStream),
		};
	}

	runSketch(program) {
		if (!this.sketches[program]) return;

		this.sketches[program]();
	}
}
