import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import MetricCard from './MetricCard';

const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	args: {
		title: 'Revenue',
		value: 125000,
		currency: 'USD',
		isPercent: false,
		showChangeIndicator: false,
		isNegative: false,
	},
	argTypes: {
		title: {
			control: 'text',
			description: 'Title of the metric',
		},
		value: {
			control: 'number',
			description: 'Metric value',
		},
		currency: {
			control: 'text',
			description: 'Currency code like USD, INR',
		},
		isPercent: {
			control: 'boolean',
			description: 'Displays value as percentage',
		},
		showChangeIndicator: {
			control: 'boolean',
			description: 'Shows trending arrow indicator',
		},
		isNegative: {
			control: 'boolean',
			description: 'Displays negative trend state',
		},
	},
};

export default meta;

type Story = StoryObj<typeof MetricCard>;

/**
 * Default happy-path usage
 */
export const Default: Story = {
	args: {
		title: 'Monthly Revenue',
		value: 125000,
		currency: 'USD',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Monthly Revenue')).toBeInTheDocument();
	},
};

/**
 * Positive growth state
 */
export const PositiveTrend: Story = {
	args: {
		title: 'Sales Growth',
		value: 18.45,
		isPercent: true,
		showChangeIndicator: true,
	},
};

/**
 * Negative/error-like trend state
 */
export const NegativeTrend: Story = {
	args: {
		title: 'Churn Rate',
		value: 7.21,
		isPercent: true,
		showChangeIndicator: true,
		isNegative: true,
	},
};

/**
 * Currency metric example
 */
export const CurrencyMetric: Story = {
	args: {
		title: 'Profit',
		value: 542300,
		currency: 'INR',
		showChangeIndicator: true,
	},
};

/**
 * Percentage-only state
 */
export const PercentageMetric: Story = {
	args: {
		title: 'Conversion Rate',
		value: 32.8,
		isPercent: true,
	},
};

/**
 * Large number formatting state
 */
export const LargeValue: Story = {
	args: {
		title: 'Annual Revenue',
		value: 98543210.89,
		currency: 'USD',
	},
};
