import segmentation from "../pose-on-results/segmentation";

export default class PoseOnResults {
	constructor(pose) {
		this.programs = {
			c: () => pose.playPause(),
			z: () => segmentation(),
		};
		this.onResults = pose.onResults;
	}

	runProgram(program) {
		if (!this.programs[program]) return;

		switch (program) {
			case "c":
				this.programs[program]();
				break;
			default:
				this.onResults(this.programs[program]);
		}
	}
}
