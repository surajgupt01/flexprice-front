import type { Meta, StoryObj } from '@storybook/react';

import Progress from './Progress';

const meta: Meta<typeof Progress> = {
	title: 'Atoms/Progress',
	component: Progress,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A customizable progress component built using Radix UI Progress primitive with support for labels, colors, and custom styling.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
			description: 'Progress value percentage',
		},
		indicatorColor: {
			control: 'text',
			description: 'Tailwind class for indicator color',
		},
		backgroundColor: {
			control: 'text',
			description: 'Tailwind class for background track color',
		},
		label: {
			control: 'text',
			description: 'Optional label below progress bar',
		},
		labelColor: {
			control: 'text',
			description: 'Tailwind class for label text color',
		},
		className: {
			control: 'text',
			description: 'Additional custom classes',
		},
	},
	args: {
		value: 60,
		label: 'Progress Status',
	},
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const Default: Story = {};

export const Success: Story = {
	args: {
		value: 85,
		label: 'Upload Complete',
		indicatorColor: 'bg-green-500',
		backgroundColor: 'bg-green-100',
		labelColor: 'text-green-700',
	},
};

export const Warning: Story = {
	args: {
		value: 45,
		label: 'Storage Almost Full',
		indicatorColor: 'bg-yellow-500',
		backgroundColor: 'bg-yellow-100',
		labelColor: 'text-yellow-700',
	},
};

export const Error: Story = {
	args: {
		value: 20,
		label: 'System Failure',
		indicatorColor: 'bg-red-500',
		backgroundColor: 'bg-red-100',
		labelColor: 'text-red-700',
	},
};

export const WithoutLabel: Story = {
	args: {
		value: 70,
		label: '',
	},
};

export const FullProgress: Story = {
	args: {
		value: 100,
		label: 'Completed',
		indicatorColor: 'bg-blue-600',
		backgroundColor: 'bg-blue-100',
	},
};

export const ZeroProgress: Story = {
	args: {
		value: 0,
		label: 'Not Started',
		indicatorColor: 'bg-gray-500',
		backgroundColor: 'bg-gray-200',
	},
};

export const CustomHeight: Story = {
	args: {
		value: 55,
		label: 'Custom Styled Progress',
		className: 'h-6 rounded-xl',
		indicatorColor: 'bg-purple-500',
		backgroundColor: 'bg-purple-100',
		labelColor: 'text-purple-700',
	},
};

export const DashboardExample: Story = {
	render: () => (
		<div className='w-[350px] space-y-5 rounded-2xl border p-6 shadow-sm'>
			<div>
				<div className='mb-2 flex items-center justify-between text-sm'>
					<span>API Usage</span>
					<span>72%</span>
				</div>

				<Progress value={72} indicatorColor='bg-blue-500' backgroundColor='bg-blue-100' />
			</div>

			<div>
				<div className='mb-2 flex items-center justify-between text-sm'>
					<span>Storage</span>
					<span>45%</span>
				</div>

				<Progress value={45} indicatorColor='bg-yellow-500' backgroundColor='bg-yellow-100' />
			</div>

			<div>
				<div className='mb-2 flex items-center justify-between text-sm'>
					<span>Bandwidth</span>
					<span>92%</span>
				</div>

				<Progress value={92} indicatorColor='bg-red-500' backgroundColor='bg-red-100' />
			</div>
		</div>
	),
	parameters: {
		docs: {
			description: {
				story: 'Example usage inside a dashboard or analytics UI.',
			},
		},
	},
};
