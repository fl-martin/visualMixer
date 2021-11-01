import segmentation from "../pose-on-results/segmentation";

export default class poseOnResults {
	constructor(onResults) {
		this.programs = {
			z: () => segmentation(),
			x,
		};
		this.onResults = onResults;
	}
}
