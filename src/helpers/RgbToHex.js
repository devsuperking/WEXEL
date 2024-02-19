export default function rgbToHex(rgb) {
	const [r, g, b] = rgb.match(/\d+/g);

	const hexR = parseInt(r).toString(16).padStart(2, '0');
	const hexG = parseInt(g).toString(16).padStart(2, '0');
	const hexB = parseInt(b).toString(16).padStart(2, '0');

	return `#${hexR}${hexG}${hexB}`;
}