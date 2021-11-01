function segmentation(results) {
	canvasCtx.save();
	canvasCtx.clearRect(0, 0, poseSegmentation.width, poseSegmentation.height);
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
