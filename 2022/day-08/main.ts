/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env  main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log, sum } from '../../utils.ts';

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el).map((el) => el.trim()).map((line) =>
		line.split('').map((el) => parseInt(el))
	);

type IsTreeVisible = {
	allTrees: number[][];
	treeRow: number[];
	tree: number;
	posX: number;
	posY: number;
};

type LookUpTreesProps = {
	trees: number[][];
	x: number;
	y: number;
	colLength: number;
	rowLength: number;
};

// fill up arrays trees with looking up, down, left, right from a tree
const lookUpTrees = (
	{ trees, x, y, colLength, rowLength }: LookUpTreesProps,
) => {
	const up: number[] = [];
	const down: number[] = [];
	const right: number[] = [];
	const left: number[] = [];

	// up
	for (let index = y; index > 0; index--) {
		up.push(trees[index - 1][x]);
	}

	// down
	for (let index = y + 1; index < colLength; index++) {
		down.push(trees[index][x]);
	}

	// left
	for (let index = x; index > 0; index--) {
		left.push(trees[y][index - 1]);
	}

	// right
	for (let index = x; index < rowLength - 1; index++) {
		right.push(trees[y][index + 1]);
	}

	return { up, down, right, left };
};

// return visisble trees from each side
const isTreeVisible = (
	{ allTrees, treeRow, tree, posX: x, posY: y }: IsTreeVisible,
) => {
	const colLength = allTrees.length;
	const rowLength = treeRow.length;

	// check for edges, they are always visible
	if (x === 0 || y === 0) {
		return true;
	}

	if (rowLength === x + 1 || colLength === y + 1) {
		return true;
	}

	const { up, down, left, right } = lookUpTrees({
		y,
		x,
		trees: allTrees,
		colLength,
		rowLength,
	});

	if (Math.max(...up) < tree) {
		return true;
	}

	if (Math.max(...down) < tree) {
		return true;
	}

	if (Math.max(...left) < tree) {
		return true;
	}

	if (Math.max(...right) < tree) {
		return true;
	}

	return false;
};

const getPart1 = (allTrees: number[][]) => {
	// get all the visisble trees
	const allTreesMap = allTrees.map((treeRow, y) => {
		return treeRow.map((tree, x) => {
			return isTreeVisible({ posY: y, posX: x, tree, treeRow, allTrees });
		});
	});

	// calculate all the visisble trees
	return sum(
		allTreesMap.map((tree) => tree.filter((isVisible) => isVisible).length),
	);
};
const getPart2 = (allTrees: number[][]) => {
	const treeScores = allTrees.map((treeRow, y) => {
		return treeRow.map((tree, x) => {
			const colLength = allTrees.length;
			const rowLength = treeRow.length;
			// simply get all trees seen from one tree
			const { up, down, left, right } = lookUpTrees({
				y,
				x,
				trees: allTrees,
				colLength,
				rowLength,
			});
			// find out how many trees are visisble
			const [sumUp, sumDown, sumRight, sumLeft] = [up, down, left, right].map(
				(directions) => {
					const treeDistances: number[] = [];
					directions.every((dir) => {
						if (dir < tree) {
							treeDistances.push(1);
							return true;
						}
						if (dir >= tree) {
							treeDistances.push(1);
							return false;
						}
					});

					return treeDistances;
				},
			).map((treesOfOneView) => sum(treesOfOneView));

			// calculate the score of visisble trees
			return sumDown * sumLeft * sumUp * sumRight;
		});
	});

	// joining all scores into one array
	let bestTrees: number[] = [];
	treeScores.forEach((tree) => {
		bestTrees = [...bestTrees, ...tree];
	});

	// find the best tree by highest score
	return Math.max(...bestTrees);
};

const input = await Deno.readTextFile('./input.txt');
const exampleInput = await Deno.readTextFile('./example.txt');

const parsedInput = getParsedInput(input);
const parsedExampleInput = getParsedInput(exampleInput);

/**
 * Part 1
 */
assertEquals(getPart1(parsedExampleInput), 21);
log(
	`🍩 ${getPart1(parsedInput)}`,
);

// /**
//  * Part 2
//  */
assertEquals(getPart2(parsedExampleInput), 8);
log(
	`🍩 ${getPart2(parsedInput)}`,
);
