export default function hydraSetup(document, cameraStream, shaderCanvas, size) {
	const c = document.createElement("canvas");
	c.id = "hydracanvas";
	c.width = size.width;
	c.height = size.height;
	document.body.appendChild(c);

	const hydra = new Hydra({ detectAudio: false, canvas: c, autoLoop: true });

	s0.init({ src: cameraStream });
	s1.init({ src: shaderCanvas });

	fps = 30;

	return;
}
