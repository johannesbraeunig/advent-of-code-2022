export const sum = (array: number[]) => {
	let s = 0;
	array.forEach((n) => s = s + n);
	return s;
};
