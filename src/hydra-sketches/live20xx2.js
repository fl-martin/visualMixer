export default function live20xx2(cc, audioStream) {
	src(o0)
		.hue(0.9)
		.color(0.9, 0.9, 0.99, 0.9)
		.brightness(0.05)
		.modulate(
			noise(() => audioStream[3], 0.5),
			() => cc[11]
		)
		.modulate(
			voronoi(() => audioStream[0] * 10, 1),
			() => cc[11]
		)
		.blend(o0, () => cc[10] - 0.1)
		.scale(1.001)
		.layer(src(s0).luma(() => cc[7] + 0.1))
		.out();
}
