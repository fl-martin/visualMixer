import exploration1 from "../frag-shaders/exploration1.glsl";
import wCircle from "../frag-shaders/wCircle.glsl";
import waves1 from "../frag-shaders/waves1.glsl";
import waves2 from "../frag-shaders/waves2.glsl";
import waves3 from "../frag-shaders/waves3.glsl";
import polar1 from "../frag-shaders/polar1.glsl";

export default class ShadersFrags {
	constructor(shader) {
		this.frags = {
			q: exploration1,
			w: wCircle,
			e: waves3,
			r: waves1,
			a: waves2,
			s: polar1,
			p: () => shader.playPause(),
			o: () => shader.hideShow(),
		};
		this.load = shader.load;
	}

	runFrag(program) {
		if (!this.frags[program]) return;

		switch (program) {
			case "p":
			case "o":
				this.frags[program]();
				break;
			default:
				this.load(this.frags[program]);
		}
	}
}
