/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log } from '../../utils.ts';

type NormalizedData = {
	crates: string[][];
	instructions: {
		move: number;
		from: number;
		to: number;
	}[];
};

const getCratesMatrix = (crates: string) => {
	const parsedCrates = crates.split('\n');

	// Get the highest number so I know how many rows I need to create
	const indexOfCrates = parsedCrates.pop();
	const theAmountOfCrates = Math.max(
		...indexOfCrates?.split(' ').filter((el) => el).map((el) => parseInt(el)) ??
			[],
	);

	// create empty arrays (rows)
	const matrixArray: string[][] = [];
	for (let index = 0; index < theAmountOfCrates; index++) {
		matrixArray.push([]);
	}

	// fill rows with the containers
	// I need to reverse the order because I start at the bottom not from
	// the top
	parsedCrates.reverse().forEach((crate) => {
		const crates = [...crate];
		for (let i = 0; i < theAmountOfCrates; i++) {
			let val;
			if (i === 0) {
				// take the first crate
				val = crates.at(1);
			} else {
				// each crate which follows I need to handle the white-spcae
				val = crates.at(i * 4 + 1);
			}

			if (val?.trim()) {
				matrixArray[i].push(val);
			}
		}
	});

	return matrixArray;
};

const getCratesInstructions = (instructions: string) => {
	const parsedInstructions = instructions.split('\n').filter((el) => !!el);
	return parsedInstructions.map((instruction) => {
		// get the instructions by parsing the numbers
		const [move, from, to] = instruction.match(/\d+/g) ?? [];
		return {
			move: parseInt(move),
			// recude 1 because array usually starts with 0
			from: parseInt(from) - 1,
			to: parseInt(to) - 1,
		};
	});
};

const getParsedInput = (input: string) => {
	const [crates, instructions] = input.split('\n\n');
	const cratesMatrix = getCratesMatrix(crates);
	const cratesInstructions = getCratesInstructions(instructions);

	return { crates: cratesMatrix, instructions: cratesInstructions };
};

const getResult = (results: string[][]) =>
	results.map((result) => result.reverse()[0]).join('');

const getPart1 = (
	{ instructions, crates }: NormalizedData,
) => {
	instructions.forEach(({ move, from, to }) => {
		// move container by container and add the container to the new row
		for (let index = 0; index < move; index++) {
			crates[to].push(crates[from].pop() ?? '');
		}
	});
	return getResult(crates);
};

const getPart2 = (
	{ crates, instructions }: NormalizedData,
) => {
	instructions.forEach(({ move, from, to }) => {
		// get all crates I need to move
		const cratesToMove = [...crates[from]].reverse().slice(0, move).reverse();
		// remove the crates I need to move from the origin
		crates[from].splice(crates[from].length - move, move);
		// add the crates to the new destination
		crates[to] = [...crates[to], ...cratesToMove];
	});

	return getResult(crates);
};

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');
const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);
/**
 * Part 1
 */
assertEquals(getPart1(parsedExampleInput), 'CMZ');
log(
	`🍩 ${getPart1(parsedInput)}`,
);

const input2 = await Deno.readTextFile('./input.txt');
const exampleInput2 = await Deno.readTextFile('./example.txt');
const parsedInput2 = getParsedInput(input2);
const parsedExampleInput2 = getParsedInput(exampleInput2);
/**
 * Part 2
 */
assertEquals(getPart2(parsedExampleInput2), 'MCD');
log(
	`🍩 ${getPart2(parsedInput2)}`,
);
