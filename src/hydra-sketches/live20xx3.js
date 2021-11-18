export default function live20xx3(cc, audioStream) {
	solid(0)
		.layer(
			src(s1)
				//  .modulate(osc(1,()=>a.fft[0]/100),0.1)
				.modulate(noise(() => (audioStream[0] / 255) * (cc[1] * 20), 1))
				.luma(() => audioStream[3] / 255 + cc[7] + 0.1)
				.invert()
				//	.colorama(0.3)
				.color(0.9, 0.8, 0.2)
				.scale(1.1)
				.scrollX(0.99)
				.scrollY(1)
		)
		.mask(shape(4, 1))
		.layer(
			src(s1)
				.modulate(o0, () => cc[10] - 0.01)
				.hue(() => cc[10] * 2)
				.scale(() => cc[10] + 1)
				.luma(() => cc[11] + 0.1)
		)
		.blend(o0, () => cc[91] - 0.1)
		.out();
}
