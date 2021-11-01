import exploration1 from "../frag-shaders/exploration1.glsl";
import pointsTunnel from "../frag-shaders/pointsTunnel.glsl";
import lygia1 from "../frag-shaders/lygia1.glsl";

export default class ShadersFrags {
	constructor(shader) {
		this.frags = {
			q: exploration1,
			w: lygia1,
			e: pointsTunnel,
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
