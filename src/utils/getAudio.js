export default async function getAudio() {
	if (!navigator.mediaDevices) return;

	const audioTrack = await navigator.mediaDevices
		.getUserMedia({ audio: true, video: false })
		.then((devices) => {
			return devices;
		});

	return audioTrack;
}

//manejar error, volver a pedir
