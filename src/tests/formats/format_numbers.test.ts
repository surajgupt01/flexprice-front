import { describe, it, expect } from 'vitest';

import formatNumber, { formatCompactNumber } from '../../utils/common/format_number';

describe('formatNumber', () => {
	it('formats numbers with commas', () => {
		expect(formatNumber(10000)).toBe('10,000');
	});

	it('formats decimals correctly', () => {
		expect(formatNumber(1234.567, 2)).toBe('1,234.57');
	});

	it('returns "-" for empty values', () => {
		expect(formatNumber(0)).toBe('-');
	});

	it('clamps decimal places correctly', () => {
		expect(formatNumber(12.123456, 20)).toContain('12.123456');
	});
});

describe('formatCompactNumber', () => {
	it('formats thousands correctly', () => {
		expect(formatCompactNumber(1500)).toBe('1.5k');
	});

	it('formats millions correctly', () => {
		expect(formatCompactNumber(2500000)).toBe('2.5M');
	});

	it('formats billions correctly', () => {
		expect(formatCompactNumber(3000000000)).toBe('3B');
	});

	it('returns small numbers normally', () => {
		expect(formatCompactNumber(500)).toBe('500');
	});
});
