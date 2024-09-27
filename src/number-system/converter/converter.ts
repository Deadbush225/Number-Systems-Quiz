export function toBinary(number: Number) {
	let a = truncateToSixDecimals(number.toString(2));
	console.log(`BIN: ${a}`);
	return a;
}

export function toHexadecimal(number: Number) {
	let a = truncateToSixDecimals(number.toString(16));
	console.log(`HEX: ${a}`);
	return a;
}

export function toDecimal(number: Number) {
	let a = truncateToSixDecimals(number.toString(10));
	console.log(`DEC: ${a}`);
	return a;
}

export function toOctal(number: Number) {
	let a = truncateToSixDecimals(number.toString(8));
	console.log(`OCT: ${a}`);
	return a;
}

function truncateToSixDecimals(numStr: String) {
	// Match the number part and up to 6 decimal places
	const match = numStr.match(/^([\w\d]+\.[\d\w]{0,6})/);
	// If there's a match, return it; otherwise, return the original string
	return match ? match[0] : numStr;
}
