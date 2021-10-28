export default function poseSetup(size) {
	const videoElement = document.createElement("video");
	videoElement.id = "camera";
	videoElement.width = size.width;
	videoElement.height = size.height;
	//document.body.appendChild(videoElement);

	const poseSegmentation = document.createElement("canvas");
	poseSegmentation.id = "pose-canvas";
	poseSegmentation.width = size.width;
	poseSegmentation.height = size.height;
	//document.body.appendChild(poseSegmentation);
	const canvasCtx = poseSegmentation.getContext("2d");

	function onResults(results) {
		canvasCtx.save();
		canvasCtx.clearRect(
			0,
			0,
			poseSegmentation.width,
			poseSegmentation.height
		);
		if (!results.segmentationMask) return;
		canvasCtx.drawImage(
			results.segmentationMask,
			0,
			0,
			poseSegmentation.width,
			poseSegmentation.height
		);

		// Only overwrite existing pixels.
		canvasCtx.globalCompositeOperation = "source-in";
		canvasCtx.drawImage(
			results.image,
			0,
			0,
			poseSegmentation.width,
			poseSegmentation.height
		);

		canvasCtx.restore();

		//generateValues(results));
	}

	const pose = new Pose({
		locateFile: (file) => {
			return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
		},
	});
	pose.setOptions({
		modelComplexity: 1,
		smoothLandmarks: true,
		enableSegmentation: true,
		smoothSegmentation: true,
		minDetectionConfidence: 0.7,
		minTrackingConfidence: 0.6,
	});

	pose.onResults(onResults);

	//VIDEO PAUSED BY DEFAULT
	const camera = new Camera(videoElement, {
		onFrame: async () => {
			await pose.send({ image: videoElement });
		},
		width: size.width / 2,
		height: size.height / 2,
	});
	camera.start();

	function playPause() {
		videoElement.paused ? videoElement.play() : videoElement.pause();
	}

	return { poseSegmentation, playPause };
}
