/**
 * Advent of Code - Day 4
 * https://adventofcode.com/2022/day/4
 *
 * Run with `deno run --allow-read --allow-env  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log } from '../../utils.ts';

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el).map((el) => el.trim());

const getSplittedPairs = (pairs: string[]) =>
	pairs.map((pair) => pair.split(','));

const getPairsFilledWithNumbers = (pair: string) => {
	const pairFilledWithNumbers: number[] = [];
	const [start, end] = pair.split('-');
	[...Array(parseInt(end) - parseInt(start) + 1).keys()].forEach((i) =>
		pairFilledWithNumbers.push(parseInt(start) + i)
	);
	return pairFilledWithNumbers;
};

const getAmountOfPairsWhichIncludesAnotherPair = (pairs: number[][][]) =>
	pairs.map(([a, b]) => {
		return a.every((number) => b.includes(number)) ||
			b.every((number) => a.includes(number));
	}).filter((isOverlapping) => isOverlapping).length;

const getPart1 = (input: string[]) => {
	const allPairsSplittet = getSplittedPairs(input);
	const pairsFilledWithNumbers = allPairsSplittet.map((pairs) =>
		pairs.map(getPairsFilledWithNumbers)
	);
	return getAmountOfPairsWhichIncludesAnotherPair(
		pairsFilledWithNumbers,
	);
};

const getAmountOfOverlappingPairs = (pairs: number[][][]) =>
	pairs.map(([a, b]) => {
		return a.find((number) => b.includes(number)) ||
			b.find((number) => a.includes(number));
	}).filter((el) => el).length;

const getPart2 = (input: string[]) => {
	const allPairsSplittet = getSplittedPairs(input);
	const pairsFilledWithNumbers = allPairsSplittet.map((pairs) =>
		pairs.map(getPairsFilledWithNumbers)
	);
	const amountOfOverlappingPairs = getAmountOfOverlappingPairs(
		pairsFilledWithNumbers,
	);
	return amountOfOverlappingPairs;
};

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');

const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);

/**
 * Part 1
 */
assertEquals(getPart1(parsedExampleInput), 2);
log(
	`🍩 ${getPart1(parsedInput)}`,
);

/**
 * Part 2
 */
assertEquals(getPart2(parsedExampleInput), 4);
log(
	`🍩 ${getPart2(parsedInput)}`,
);
