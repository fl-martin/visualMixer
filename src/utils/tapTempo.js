export default function tapTempo() {
	const tapTempo = require("tap-tempo")();

	let bpm = [120];

	const tap = () => tapTempo.tap();

	tapTempo.on("tempo", function (tempo) {
		bpm[0] = tempo;
	});

	return { bpm, tap };
}
