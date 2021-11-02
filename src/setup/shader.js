import { Canvas } from "glsl-canvas-js";
import toogleVisibility from "../utils/toogleVisibility";

export default function shaderSetup(document, size, audioData) {
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
	glsl.on('render', ()=> {
		glsl.setUniform('u_low', audioData[0]);
	})


	const load = (program) => glsl.load(program);
	const playPause = () => glsl.toggle();
	const hideShow = () => toogleVisibility(canvas);

	return { canvas, load, playPause, hideShow };
}
