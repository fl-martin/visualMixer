export default function live20xx1(cc) {
	src(o0)
		.color(1, 1, 1, 0.9)
		.modulate(s1, 0.0002)
		.blend(o0, () => cc[11])
		.saturate([1.1, 1, 2].smooth(0.9).fast(0.5))
		.scale(() => cc[10])
		.layer(src(s1).luma(() => cc[7]))
		.out();
}
