import type { Meta, StoryObj } from '@storybook/react';
import { CostDataTable } from './CostDataTable';

const meta: Meta<typeof CostDataTable> = {
	title: 'Molecules/CostDataTable',
	component: CostDataTable,
	tags: ['autodocs'],
	args: {
		items: [
			{
				meter_id: 'api_calls',
				meter_name: 'API Calls',
				total_quantity: '250000',
				total_cost: '1250.5',
				total_events: 1200,
				currency: 'USD',
				source: 'system',
				price_id: 'price_1',
			},
		],
	},
	parameters: {
		layout: 'padded',
	},
	argTypes: {
		items: {
			control: 'object',
			description: 'List of cost analytics items',
		},
	},
};

export default meta;

type Story = StoryObj<typeof CostDataTable>;

/**
 * Default happy-path table
 */
export const Default: Story = {};

/**
 * Empty table state
 */
export const Empty: Story = {
	args: {
		items: [],
	},
};

/**
 * Large values formatting
 */
export const LargeNumbers: Story = {
	args: {
		items: [
			{
				meter_id: 'enterprise_usage',
				meter_name: 'Enterprise Usage',
				total_quantity: '999999999',
				total_cost: '12500000.75',
				currency: 'INR',
				source: 'enterprise',
				price_id: 'price_big',
				total_events: 1200,
			},
		],
	},
};

/**
 * Missing meter name fallback state
 */
export const FallbackMeterName: Story = {
	args: {
		items: [
			{
				meter_id: 'fallback_meter',
				total_quantity: '1500',
				total_cost: '75',
				currency: 'USD',
				source: 'internal',
				price_id: 'price_fallback',
				total_events: 800,
			},
		],
	},
};
