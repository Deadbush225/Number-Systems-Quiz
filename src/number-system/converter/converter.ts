export function toBinary(number: Number) {
	let a: any = truncateToSixDecimals(number.toString(2));
	// let b = parseFractionalString(a, 2);
	console.log(`BIN: ${a}`);
	return a;
}

export function toHexadecimal(number: Number) {
	let a: any = truncateToSixDecimals(number.toString(16));
	// let b = parseFractionalString(a, 16);
	console.log(`HEX: ${a}`);
	return a;
}

export function toDecimal(number: Number) {
	let a: any = truncateToSixDecimals(number.toString(10));
	// let b = parseFractionalString(a, 10);
	console.log(`DEC: ${a}`);
	return a;
}

export function toOctal(number: Number) {
	let a: any = truncateToSixDecimals(number.toString(8));
	// let b = parseFractionalString(a, 8);
	console.log(`OCT: ${a}`);
	return a;
}

export function truncateToSixDecimals(numStr: String) {
	// Match the number part and up to 6 decimal places
	const match = numStr.match(/^([\w\d]+\.[\d\w]{0,6})/);
	// If there's a match, return it; otherwise, return the original string
	return match ? match[0] : numStr;
}

export function truncateToThreeDecimals(numStr: String) {
	// Match the number part and up to 6 decimal places
	const match = numStr.match(/^([\w\d]+\.[\d\w]{0,3})/);
	// If there's a match, return it; otherwise, return the original string
	return match ? match[0] : numStr;
}

export function parseFractionalString(str: String, radix: number) {
	// Split the string into integer and fractional parts
	let parts = str.split(".");
	if (parts.length === 1) {
		// No fractional part
		return parseInt(parts[0], radix);
	}

	// console.log(parts);
	// console.log(radix);

	// Parse the integer part
	let integerPart = parseInt(parts[0], radix);
	// console.log(integerPart);
	if (isNaN(integerPart)) {
		return NaN;
	}

	// Parse the fractional part
	let fractionalPart = parts[1];
	let fractionalValue = 0;
	for (let i = 0; i < fractionalPart.length; i++) {
		let digitValue = parseInt(fractionalPart[i], radix);
		if (isNaN(digitValue)) {
			// console.log(digitValue);
			return NaN;
		}
		fractionalValue += digitValue / Math.pow(radix, i + 1);
	}

	return integerPart + fractionalValue;
}

// Example usage:
let str = "101.11";
let radix = 2;
let num = parseFractionalString(str, radix);
console.log(num); // Output: 5.75
