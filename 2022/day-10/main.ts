/**
 * Advent of Code - Day 0
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env main.ts`.
 */

import { log, sum } from '../../utils.ts';

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el).map((el) => el.trim().split(' '));

const getPart1 = (input: string[][]) => {
	let x = 1;
	let cycleCount = 1;
	const singnalStrenghts: number[] = [];
	let nextSignalStrength = 20;
	const display: string[] = [];

	let currentCharIndex = 0;

	const drawPixel = () => {
		const displayAmountOfLines = display.length - 1;
		const amountOfChatsInLine = display[displayAmountOfLines]?.length;

		// char to draw depending on the sprite placement
		const charToDraw = x - 1 === currentCharIndex || x === currentCharIndex ||
				x + 1 === currentCharIndex
			? '#'
			: '.';

		// add chars and create new line if char index is 0
		if (amountOfChatsInLine && currentCharIndex !== 0) {
			display[displayAmountOfLines] = display[displayAmountOfLines] +
				charToDraw;
		} else {
			display.push(charToDraw);
		}

		currentCharIndex = currentCharIndex + 1;

		if (currentCharIndex === 40) {
			currentCharIndex = 0;
		}
	};

	// count the strengths
	const executeSignalStrengtsCount = () => {
		if (cycleCount === nextSignalStrength) {
			singnalStrenghts.push(nextSignalStrength * x);
			nextSignalStrength = nextSignalStrength + 40;
		}
	};

	input.forEach(([instruction, value]) => {
		switch (instruction) {
			// if noop, basically do nothing, just count up the cycle
			// execute the signal strength and draw a pixel
			case 'noop':
				cycleCount = cycleCount + 1;
				executeSignalStrengtsCount();
				drawPixel();
				break;

			// count up the cycle
			// draw a pixel
			// count the x
			case 'addx':
				for (let index = 0; index < 2; index++) {
					cycleCount = cycleCount + 1;
					if (index === 0) {
						drawPixel();
					}
					if (index === 1) {
						drawPixel();
						x = x + parseInt(value);
					}

					executeSignalStrengtsCount();
				}
				break;
		}
	});
	return { sum: sum(singnalStrenghts), display };
};

const input = await Deno.readTextFile('./input.txt');
const parsedInput = getParsedInput(input);
const { display, sum: singnalStrenghts } = getPart1(parsedInput);
log(
	`🍩 ${singnalStrenghts}\n`,
	`${display.join('\n')}`,
);
