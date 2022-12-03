/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read  main.ts`.
 */

const getParsedInput = (input: string) =>
	input.split('\n\n').map((cluster) =>
		cluster.split('\n').filter((el) => !!el).map((n) => parseInt(n))
	);

const getPart1 = () => 'Part 1';
const getPart2 = () => 'Part 2';

const input = await Deno.readTextFile('./input.txt');
// deno-lint-ignore no-unused-vars
const parsedInput = getParsedInput(input);

const part1 = getPart1();
console.log(
	`🍩 ${part1}`,
);

const part2 = getPart2();
console.log(
	`🍩 ${part2}`,
);
