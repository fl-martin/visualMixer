import { Camera } from "@mediapipe/camera_utils";

export default function poseSetup(document, size, media) {
	const cameraInput = document.createElement("video");
	cameraInput.id = "camera";
	cameraInput.width = size.width;
	cameraInput.height = size.height;
	//document.body.appendChild(cameraInput);

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
		selfieMode: true,
	});

	pose.onResults(onResults);

	const camera = new Camera(cameraInput, {
		onFrame: async () => {
			await pose.send({ image: cameraInput });
		},
		width: size.width / 2,
		height: size.height / 2,
	});
	camera.start();

	const runProgram = (func) => pose.onResults(func);
	const playPause = () => {
		cameraInput.paused ? cameraInput.play() : cameraInput.pause();
	};

	return { poseSegmentation, runProgram, playPause };
}
