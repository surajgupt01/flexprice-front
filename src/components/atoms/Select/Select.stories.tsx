import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FlexPriceSelect from './Select'; // Adjust path if necessary
import { CreditCard, DollarSign, Wallet } from 'lucide-react';

const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/FlexPriceSelect',
	component: FlexPriceSelect,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		onChange: { action: 'changed' },
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		required: { control: 'boolean' },
	},

	render: function Render(args) {
		const [value, setValue] = useState(args.value || '');
		return <FlexPriceSelect {...args} value={value} onChange={setValue} />;
	},
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const basicOptions = [
	{ value: 'basic', label: 'Basic Plan' },
	{ value: 'pro', label: 'Pro Plan' },
	{ value: 'enterprise', label: 'Enterprise Plan' },
];

const richOptions = [
	{ value: 'monthly', label: 'Monthly Billing', description: '$10/month, billed every 30 days.' },
	{ value: 'annually', label: 'Annual Billing', description: '$8/month, billed annually ($96).' },
	{ value: 'lifetime', label: 'Lifetime Access', description: 'One time payment of $299.', disabled: true },
];

const iconOptions = [
	{ value: 'usd', label: 'US Dollar', prefixIcon: <DollarSign className='w-4 h-4 text-gray-500' /> },
	{ value: 'card', label: 'Credit Card', suffixIcon: <CreditCard className='w-4 h-4 text-gray-500' /> },
	{ value: 'wallet', label: 'Digital Wallet', prefixIcon: <Wallet className='w-4 h-4 text-gray-500' /> },
];

export const Default: Story = {
	args: {
		options: basicOptions,
		placeholder: 'Select a plan...',
		className: 'w-[300px]',
	},
};

export const WithLabelAndDescription: Story = {
	args: {
		label: 'Subscription Cycle',
		description: 'Choose the billing frequency that works best for you.',
		required: true,
		options: richOptions,
		placeholder: 'Select billing cycle...',
		className: 'w-[350px]',
	},
};

export const RadioVariant: Story = {
	args: {
		label: 'Payment Method',
		description: 'Select how you would like to pay for this invoice.',
		isRadio: true,
		options: richOptions,
		placeholder: 'Select payment method...',
		className: 'w-[350px]',
	},
};

export const WithIcons: Story = {
	args: {
		label: 'Currency / Payment',
		options: iconOptions,
		hideSelectedTick: false,
		placeholder: 'Select an option...',
		className: 'w-[300px]',
	},
};

export const ErrorState: Story = {
	args: {
		label: 'Category Selection',
		required: true,
		options: basicOptions,
		error: 'Please select a valid category to proceed.',
		className: 'w-[300px]',
	},
};

export const EmptyState: Story = {
	args: {
		label: 'Assign to Team Member',
		options: [],
		noOptionsText: 'No team members available',
		placeholder: 'Select user...',
		className: 'w-[300px]',
	},
};

export const DisabledComponent: Story = {
	args: {
		label: 'Archived Project Plan',
		options: basicOptions,
		disabled: true,
		value: 'basic',
		description: 'You cannot change the plan of an archived project.',
		className: 'w-[300px]',
	},
};
