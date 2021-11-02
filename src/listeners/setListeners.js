export default function setListeners(document, audio, sketches, shader, pose) {
	document.getElementById("hydracanvas").addEventListener("click", () => {
		//audio.start();
	});

	document.addEventListener("keydown", (e) => {
		if (e.key == "c") pose.runProgram(e.key);

		/^[0-9]$/i.test(e.key)
			? sketches.runSketch(e.key)
			: shader.runFrag(e.key);
	});
}

//separar entre letras para un program control y otro
