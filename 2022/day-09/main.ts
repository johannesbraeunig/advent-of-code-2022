/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log } from '../../utils.ts';

type Directions = 'R' | 'U' | 'L' | 'D';

type Instruction = {
	direction: Directions;
	amount: number;
};

const getParsedInput = (input: string): {
	direction: Directions;
	amount: number;
}[] =>
	input.split('\n').filter((el) => !!el).map((el) => el.trim()).map((e) =>
		e.split(' ')
	).map((
		[direction, amount],
	) => ({ direction, amount: parseInt(amount) } as Instruction));

const doSteps = (
	{ knotBefore, currentKnot }: {
		knotBefore: {
			x: number;
			y: number;
			visited: { x: number; y: number }[];
		};
		currentKnot: {
			x: number;
			y: number;
			visited: { x: number; y: number }[];
		};
	},
) => {
	const newStep: {
		x: number;
		y: number;
		visited: { x: number; y: number }[];
	} = {
		x: currentKnot.x,
		y: currentKnot.y,
		visited: currentKnot.visited,
	};
	const changeOfX = knotBefore.x - currentKnot.x;
	const changeOfY = knotBefore.y - currentKnot.y;

	if (
		changeOfX === 1 && changeOfY === 2 ||
		changeOfX === 2 && changeOfY === 1
	) {
		newStep.x = newStep.x + 1;
		newStep.y = newStep.y + 1;
	} else if (
		changeOfX === 2 && changeOfY === -1 ||
		changeOfX === 1 && changeOfY === -2
	) {
		newStep.x = newStep.x + 1;
		newStep.y = newStep.y - 1;
	} else if (
		changeOfX === -1 && changeOfY === -2 ||
		changeOfX === -2 && changeOfY === -1
	) {
		newStep.x = newStep.x - 1;
		newStep.y = newStep.y - 1;
	} else if (
		changeOfX === -1 && changeOfY === 2 ||
		changeOfX === -2 && changeOfY === 1
	) {
		newStep.x = newStep.x - 1;
		newStep.y = newStep.y + 1;
	} else if (changeOfY === 2) {
		newStep.y = newStep.y + 1;
	} else if (changeOfX === 2) {
		newStep.x = newStep.x + 1;
	} else if (changeOfX === -2) {
		newStep.x = newStep.x - 1;
	} else if (changeOfY === -2) {
		newStep.y = newStep.y - 1;
	}

	if (
		!newStep.visited.find((pos) => pos.x === newStep.x && pos.y === newStep.y)
	) {
		newStep.visited.push({ x: newStep.x, y: newStep.y });
	}

	return newStep;
};

const getPart2 = (input: Instruction[], amount: number) => {
	const knots: {
		x: number;
		y: number;
		visited: { x: number; y: number }[];
	}[] = [
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
		{ x: 0, y: 0, visited: [] },
	];
	input.forEach(({ amount, direction }) => {
		for (let index = 0; index < amount; index++) {
			for (let knotIndex = 0; knotIndex < knots.length; knotIndex++) {
				if (knotIndex === 0) {
					switch (direction) {
						case 'R':
							knots[knotIndex].x = knots[knotIndex].x + 1;
							break;
						case 'L':
							knots[knotIndex].x = knots[knotIndex].x - 1;
							break;
						case 'U':
							knots[knotIndex].y = knots[knotIndex].y + 1;
							break;
						case 'D':
							knots[knotIndex].y = knots[knotIndex].y - 1;
							break;
					}
				} else {
					const changeOfX = knots[knotIndex - 1].x - knots[knotIndex].x;
					const changeOfY = knots[knotIndex - 1].y - knots[knotIndex].y;

					if (
						changeOfX === 1 && changeOfY === 2 ||
						changeOfX === 2 && changeOfY === 1
					) {
						knots[knotIndex].x = knots[knotIndex].x + 1;
						knots[knotIndex].y = knots[knotIndex].y + 1;
					} else if (
						changeOfX === 2 && changeOfY === -1 ||
						changeOfX === 1 && changeOfY === -2
					) {
						knots[knotIndex].x = knots[knotIndex].x + 1;
						knots[knotIndex].y = knots[knotIndex].y - 1;
					} else if (
						changeOfX === -1 && changeOfY === -2 ||
						changeOfX === -2 && changeOfY === -1
					) {
						knots[knotIndex].x = knots[knotIndex].x - 1;
						knots[knotIndex].y = knots[knotIndex].y - 1;
					} else if (
						changeOfX === -1 && changeOfY === 2 ||
						changeOfX === -2 && changeOfY === 1
					) {
						knots[knotIndex].x = knots[knotIndex].x - 1;
						knots[knotIndex].y = knots[knotIndex].y + 1;
					} else if (changeOfY === 2) {
						knots[knotIndex].y = knots[knotIndex].y + 1;
					} else if (changeOfX === 2) {
						knots[knotIndex].x = knots[knotIndex].x + 1;
					} else if (changeOfX === -2) {
						knots[knotIndex].x = knots[knotIndex].x - 1;
					} else if (changeOfY === -2) {
						knots[knotIndex].y = knots[knotIndex].y - 1;
					}
				}

				if (
					!knots[knotIndex].visited.find((pos) =>
						pos.x === knots[knotIndex].x && pos.y === knots[knotIndex].y
					)
				) {
					knots[knotIndex].visited.push({
						x: knots[knotIndex].x,
						y: knots[knotIndex].y,
					});
				}
			}
		}
	});
	return knots[knots.length - 1].visited.length;
};

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');
const exampleLargerInput = await Deno.readTextFile('./example-larger.txt');

const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);
const parsedExampleLargerInput = getParsedInput(exampleLargerInput);

/**
 * Part 1
 */

// assertEquals(getPart2(parsedExampleInput, 2), 13);
// assertEquals(getPart2(parsedInput, 2), 6354);
// log(
// 	`🍩 ${getPart2(parsedInput, 2)}`,
// );

/**
 * Part 2
 */
// 548
// assertEquals(getPart2(parsedExampleInput, 10), 1);
assertEquals(getPart2(parsedExampleLargerInput, 10), 36);
// log(
// 	`🍩 ${getPart2(parsedInput, 10)}`,
// );
