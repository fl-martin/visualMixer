import exploration1 from "../frag/exploration1.glsl";
import lygia1 from "../frag/lygia1.glsl";

export default class ShadersFrags {
	constructor(shader) {
		this.frags = {
			q: exploration1,
			w: lygia1,
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
