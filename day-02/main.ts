/**
 * Advent of Code - Day 2
 * https://adventofcode.com/2022/day/2
 *
 * Run with `deno run --allow-read  main.ts`.
 *
 * - Rock defeats Scissors
 * - Scissors defeats Paper
 * - Paper defeats Rock
 * - Same means draw
 *
 * Example:
 * A Y
 * B X
 * C Z
 *
 * - Fist column is opponent is going to play
 * - A = Rock
 * - B = Paper
 * - C = Scissor
 *
 * /// Part 1
 *
 * - Second column is what I am going to play
 * - X = Rock
 * - Y = Paper
 * - Z = Scissor
 *
 * My total score = sum of each score from each round
 *
 * - score depends on the shape selected
 * - 1 = Rock
 * - 2 = Paper
 * - 3 = Scissor
 * - + outcome of the round
 * - 0 = lost
 * - 3 = draw
 * - 6 = won
 *
 * /// Part 2
 *
 * - second column says how you need to end the game
 * - X = lost
 * - Y = draw
 * - Z = win
 *
 * - Same calculation applies like in part 1
 */

import { sum } from '../utils.ts';

type RockPaperScissor = 'ROCK' | 'PAPER' | 'SCISSOR';
type MatchResult = 'WON' | 'DRAW' | 'LOST';

const getParsedInput = (input: string) =>
	input.split('\n').filter((el) => !!el).map((el) => el.split(' '));

const matchToReadableValues = (value: string) => {
	switch (value) {
		case 'A':
		case 'X':
			return 'ROCK';

		case 'B':
		case 'Y':
			return 'PAPER';

		default:
			return 'SCISSOR';
	}
};

const applyElfsInstructions = (
	[opponent, howTheRoundShouldEnd]: string[],
) => {
	switch (howTheRoundShouldEnd) {
		// lost
		case 'X':
			switch (opponent) {
				case 'A':
					return [opponent, 'Z'];
				case 'B':
					return [opponent, 'X'];
				default:
					return [opponent, 'Y'];
			}
		// win
		case 'Z':
			switch (opponent) {
				case 'A':
					return [opponent, 'Y'];
				case 'B':
					return [opponent, 'Z'];
				default:
					return [opponent, 'X'];
			}
		// draw
		default:
			return [opponent, opponent];
	}
};

const getOutcomeOfMatch = (
	opponent: RockPaperScissor,
	myself: RockPaperScissor,
) => {
	if (myself === opponent) {
		return 'DRAW';
	} else if (
		myself === 'ROCK' && opponent === 'SCISSOR' ||
		myself === 'SCISSOR' && opponent === 'PAPER' ||
		myself === 'PAPER' && opponent === 'ROCK'
	) {
		return 'WON';
	} else {
		return 'LOST';
	}
};

const getScoreOfMatch = (value: MatchResult) => {
	switch (value) {
		case 'DRAW':
			return 3;
		case 'WON':
			return 6;
		case 'LOST':
			return 0;
	}
};

const getScoreOfShape = (value: RockPaperScissor) => {
	switch (value) {
		case 'ROCK':
			return 1;
		case 'PAPER':
			return 2;
		case 'SCISSOR':
			return 3;
		default:
			return 0;
	}
};

const getCalculatedTotalScore = (values: RockPaperScissor[][]) => {
	const matchesOutcome = values.map(([opponent, myself]) =>
		getOutcomeOfMatch(opponent, myself)
	);
	const scoreOfMatches = matchesOutcome.map(getScoreOfMatch);
	const scoreOfShapes = values.map(([_, myself]) => getScoreOfShape(myself));
	return sum(scoreOfMatches) + sum(scoreOfShapes);
};

const input = await Deno.readTextFile('./input.txt');
const parsedInput = getParsedInput(input);

// PART 1
const getMyTotalScore = (
	input: string[][],
) => {
	const allMatches = input.map((matches) => matches.map(matchToReadableValues));
	return getCalculatedTotalScore(allMatches);
};
const myTotalScore = getMyTotalScore(parsedInput);
console.log(
	`🍩 Part 1, my total score in "Rock Paper Scissor" is ${myTotalScore}.`,
);

// PART 2
const getMyTotalScoreWithElfsInstructions = (input: string[][]) => {
	const allMatches = input.map((matches) =>
		applyElfsInstructions(matches).map(
			matchToReadableValues,
		)
	);
	return getCalculatedTotalScore(allMatches);
};
const myTotalScoreWithElfsInstructions = getMyTotalScoreWithElfsInstructions(
	parsedInput,
);
console.log(
	`🍩 Part 2, my total score in "Rock Paper Scissor" with the Elfs instructions is ${myTotalScoreWithElfsInstructions}.`,
);
