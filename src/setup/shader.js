import { Canvas } from "glsl-canvas-js";

export default function shaderSetup(size) {
	const canvas = document.createElement("canvas");
	canvas.width = size.width;
	canvas.height = size.height;
	canvas.id = "shadercanvas";
	document.body.appendChild(canvas);
	const options = {
		alpha: false,
		antialias: true,
		mode: "flat",
		extensions: ["EXT_shader_texture_lod"],
	};
	const glsl = new Canvas(canvas, options);

	const load = (program) => glsl.load(program);
	const playPause = () => glsl.toggle();

	return { canvas, load, playPause };
}
