/**
 * Advent of Code - Day 7
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env main.ts`.
 *
 * $ = commands executed
 * / = outermost directory
 * cd = change directory
 * cd x = move into the directory
 * cd .. = move out one level from the directory
 * cd / = switches to the outermost directory
 * ls = list all files
 * 123 abc = file abc with size 123
 * dir xyz = folder xyz
 *
 * 1. get total size of directories
 * 1. which directors at most 100000
 * 1. what is the sum of these directories?
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log, sum } from '../../utils.ts';

const getSolutions = (terminalInput: string[]) => {
	const directory: any = {};
	const currentPath: string[] = [];

	// go through each command line by line
	terminalInput.forEach((line) => {
		const command = line.split(' ');

		// determinate if the command is a command or just an output
		if (command.at(0) === '$') {
			if (command.at(1) === 'cd') {
				if (command.at(2) === '..') {
					currentPath.pop();
				} else {
					const key = `${command.at(2)}`;
					let d = directory;
					currentPath.forEach((c) => {
						d = d[`${c}`];
					});

					Object.assign(d, { [`${key}`]: {} });
					currentPath.push(key);
				}
			}

			// skip this command, no actions
			if (command.at(1) === 'ls') {
				return;
			}
			// if a directory is found create an empty object in the object (subdirectory)
		} else if (command.at(0) === 'dir') {
			let d = directory;
			currentPath.forEach((path, i) => {
				if (currentPath.length === i + 1) {
					Object.assign(d[path], { [`${command.at(1)}`]: {} });
				} else {
					d = d[path];
				}
			});
		} else {
			// fill up the object with data
			const key = command.at(1);
			const value = command.at(0) ?? '';

			let d = directory;
			currentPath.forEach((path, i) => {
				if (currentPath.length === i + 1) {
					Object.assign(d[path], { [`${key}`]: parseInt(value) });
				} else {
					d = d[path];
				}
			});
		}
	});

	// count the directory size
	const counWithinObject = (object: any) => {
		let sum = 0;

		for (const key in object) {
			const objChild = object[key];
			if (typeof objChild === 'object') {
				const sumOfObjChild = counWithinObject(objChild);
				sum = sum + sumOfObjChild;
			}

			if (typeof objChild === 'number') {
				sum = sum + objChild;
			}
		}

		return sum;
	};

	const getSumOfObjects = (objects: any) => {
		const t: number[] = [];
		const spreadObjects = (object: any) => {
			for (const key in object) {
				const objChild = object[key];
				if (typeof objChild === 'object') {
					spreadObjects(objChild);
					t.push(objChild);
				}
			}
		};
		spreadObjects(objects);
		const n = t.map((object: any) => {
			const count = counWithinObject(object);

			return count;
		});
		return n;
	};

	const sumOfAllDirLowerThanTreshold = sum(
		getSumOfObjects(directory).filter((n) => n <= 100000),
	);
	const sumOfAllDirs = getSumOfObjects(directory);

	const minimumNeeded = 70000000 - Math.max(...sumOfAllDirs);
	const minimum = 30000000 - minimumNeeded;
	const allFitting = getSumOfObjects(directory).filter((n) => n > minimum);
	const smallestFittinDirectory = Math.min(...allFitting);

	return [sumOfAllDirLowerThanTreshold, smallestFittinDirectory];
};

const input = await Deno.readTextFile('./input.txt');
const terminalInput = input.split('\n').filter((el) => !!el.trim());
const exampleInput = await Deno.readTextFile('./example.txt');
const exampleTerminalInput = exampleInput.split('\n').filter((el) =>
	!!el.trim()
);

const [examplePart1, examplePart2] = getSolutions(exampleTerminalInput);

assertEquals(examplePart1, 95437);
assertEquals(examplePart2, 24933642);

const [part1, part2] = getSolutions(terminalInput);

log(
	`🍩 Part 1: ${part1}`,
);

log(
	`🍩 Part 2: ${part2}`,
);
