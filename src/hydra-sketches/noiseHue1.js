export default function noiseHue1(cc, audioStream) {
	src(o0)
		.modulate(
			noise(() => 1 - audioStream[0] / 20, 0.5),
			() => cc[7] / 10
		)
		.colorama(() => cc[11] / 100)
		.hue(() => cc[10])
		.scale(1.01)
		.blend(s1, 0.2)
		.out();
}
