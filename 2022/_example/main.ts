/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log } from '../../utils.ts';

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el).map((el) => el.trim());

const getPart1 = (input: string[]) => {
	return `${input.join()}`;
};
const getPart2 = (input: string[]) => {
	return `${input.join()}`;
};

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');

const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);

/**
 * Part 1
 */
assertEquals(getPart1(parsedExampleInput), 'A,B');
log(
	`🍩 ${getPart1(parsedInput)}`,
);

/**
 * Part 2
 */
assertEquals(getPart2(parsedExampleInput), 'A,B');
log(
	`🍩 ${getPart2(parsedInput)}`,
);
