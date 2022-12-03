/**
 * Advent of Code - Day 3
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log, sum } from '../utils.ts';

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el);

const splitItemsIntoBothCompartments = (items: string[]) =>
	items.map((item) => {
		const itemLength = item.length;
		return [
			item.slice(0, itemLength / 2),
			item.slice(itemLength / 2, itemLength),
		];
	});

const findItemsWhichAreInBothCompartments = (items: string[][]) =>
	items.map(([itemA, itemB]) =>
		[...itemA].find((i) => itemB.includes(i)) ?? ''
	);

const getCalculatedSumOfPriorities = (items: string[]) =>
	sum(items.map((item) => {
		switch (item === item.toUpperCase()) {
			case true:
				return item?.charCodeAt(0) - 38;
			default:
				return item?.charCodeAt(0) - 96;
		}
	}));

const splitElfsIntoGroupsOfThree = (items: string[]) => {
	let group: string[] = [];
	const groups: Array<Array<string>> = [];
	items.forEach((item, i) => {
		if (i % 3 === 2) {
			groups.push([...group, item]);
			group = [];
		} else {
			group.push(item);
		}
	});

	return groups;
};

const getSimilarItemsInAllGroups = (groups: string[][]) =>
	groups.map(([a, b, c]) =>
		[...a].find((i) => b.includes(i) && c.includes(i)) ?? ''
	);

const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);

// PART 1
const getTheSumOfThePriorityItems = (items: string[]) => {
	const splittedItems = splitItemsIntoBothCompartments(items);
	const itemsOfBorthCompartments = findItemsWhichAreInBothCompartments(
		splittedItems,
	);
	const prioSumOfAllItemsOfBothCompartments = getCalculatedSumOfPriorities(
		itemsOfBorthCompartments,
	);
	return prioSumOfAllItemsOfBothCompartments;
};

assertEquals(getTheSumOfThePriorityItems(parsedExampleInput), 157);
log(
	`🍩 The sum of the prioritized items are: ${
		getTheSumOfThePriorityItems(parsedInput)
	}`,
);

// PART 2
const getCorrospondedBadgesOfThreeElfs = (items: string[]) => {
	const groups = splitElfsIntoGroupsOfThree(items);
	const similarItemsInAllGroups = getSimilarItemsInAllGroups(groups);
	const calculatedSumOfPriorities = getCalculatedSumOfPriorities(
		similarItemsInAllGroups,
	);
	return calculatedSumOfPriorities;
};

assertEquals(getCorrospondedBadgesOfThreeElfs(parsedExampleInput), 70);
log(
	`🍩 The sum of the similar items of a group of three Elfs is: ${
		getCorrospondedBadgesOfThreeElfs(parsedInput)
	}`,
);
