export default function AlphabetHeaders() {
	const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
	const combinations = [];
	for (let i = 0; i < letters.length; i++) {
		for (let j = 0; j < letters.length; j++) {
			const combination = letters[i] + letters[j];
			if (combination <= 'AZ') {
				combinations.push(combination);
			}
		}
	}

	const allHeaders = letters.concat(combinations);

	return allHeaders;
}