import exploration1 from "../frag/exploration1.glsl";
import lygia1 from "../frag/lygia1.glsl";

export default class ShadersFrags {
	constructor(load, remove) {
		this.frags = {
			q: exploration1,
			w: lygia1,
		};
		this.load = load;
		this.remove = remove;
	}

	runFrag(program) {
		if (program == "p") {
			this.remove();
			return;
		} else if (!this.frags[program]) return;
		this.load(this.frags[program]);
	}
}
