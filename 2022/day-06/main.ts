/**
 * Advent of Code - Day 6
 * https://adventofcode.com
 *
 * Run with `deno run --allow-read --allow-env main.ts`.
 */

import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { log } from '../../utils.ts';

const input = await Deno.readTextFile('./input.txt');

const getMarker = (input: string, sequenze: number) => {
	// Iterate through the string, character by character
	for (let index = 0; index < input.length; index++) {
		// get the first 4 chars and check, if there are duplicated chars starting at index 0
		// if not, go ahead and take the second 4 chars starting at index 1, and so on...

		// example:
		// [aacd]ef => dupliacted char (a), take the next 4 chars by moving the index + 1
		// a[acde]f => no duplicated char, return the (index + sequenz) as marker index
		if (!/(.).*\1/.test(input.slice(0 + index, sequenze + index))) {
			return index + sequenze;
		}
	}
};

// /**
//  * Part 1
//  */
assertEquals(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 4), 7);
assertEquals(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 4), 5);
assertEquals(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 4), 6);
assertEquals(getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4), 10);
assertEquals(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4), 11);
log(
	`🍩 ${getMarker(input, 4)}`,
);

// /**
//  * Part 2
//  */
assertEquals(getMarker('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14), 19);
assertEquals(getMarker('bvwbjplbgvbhsrlpgdmjqwftvncz', 14), 23);
assertEquals(getMarker('nppdvjthqldpwncqszvftbrmjlhg', 14), 23);
assertEquals(
	getMarker('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14),
	29,
);
assertEquals(getMarker('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14), 26);
log(
	`🍩 ${getMarker(input, 14)}`,
);
