/**
 * Advent of Code - Day 1
 * https://adventofcode.com/2022/day/1
 *
 * Run with `deno run --allow-read  main.ts`.
 */

const getParsedInput = (input: string) =>
	input.split('\n\n').map((cluster) =>
		cluster.split('\n').filter((el) => !!el).map((n) => parseInt(n))
	);

const sum = (array: number[]) => {
	let s = 0;
	array.forEach((n) => s = s + n);
	return s;
};

const getEachElfWithSumOfCalories = (input: number[][]) => {
	const caloriesCounts: number[] = [];
	input.forEach((el) => {
		caloriesCounts.push(sum(el));
	});
	return caloriesCounts;
};

const getElfWithMostCalories = (input: number[][]) => {
	const elfsWithSumOfCalories = getEachElfWithSumOfCalories(input);
	return Math.max(...elfsWithSumOfCalories);
};

const getTopThreeElfsWithMostCalories = (input: number[][]) => {
	const elfsWithSumOfCalories = getEachElfWithSumOfCalories(input).sort((
		a,
		b,
	) => a - b).reverse();
	const firstThreeElfs = elfsWithSumOfCalories.slice(0, 3);
	return sum(firstThreeElfs);
};

const input = await Deno.readTextFile('./input.txt');
const parsedInput = getParsedInput(input);

const elfWithMostCalories = getElfWithMostCalories(parsedInput);
console.log(
	`🍩 Part 1, the elf with most calories has ${elfWithMostCalories} calories.`,
);

const caloriesOfTheTopThreeElfs = getTopThreeElfsWithMostCalories(parsedInput);
console.log(
	`🍩 Part 2, the top three elfs with the most calories have in total ${caloriesOfTheTopThreeElfs} calories.`,
);
