import { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	argTypes: {
		className: {
			control: 'text',
			description: 'Custom Tailwind classes',
		},

		size: {
			control: {
				type: 'number',
			},
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: 24,
		className: 'text-blue-500',
	},
};
