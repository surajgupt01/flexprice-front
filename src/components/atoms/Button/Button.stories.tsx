import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import { Bookmark, Link } from 'lucide-react';

const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',

	component: Button,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	argTypes: {
		variant: {
			control: 'select',

			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
		},

		size: {
			control: 'select',

			options: ['default', 'sm', 'lg', 'icon', 'xs'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Button',
	},
};

export const Variants: Story = {
	render: () => (
		<div className='flex gap-4 flex-wrap'>
			<Button variant='default'>Default</Button>

			<Button variant='secondary'>
				Bookmark
				<Bookmark></Bookmark>
			</Button>

			<Button variant='destructive'>Destructive</Button>

			<Button variant='ghost'>Ghost</Button>

			<Button variant='link'>
				<Link />
				Link
			</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-4'>
			<Button size='xs'>XS</Button>

			<Button size='sm'>SM</Button>

			<Button size='default'>Default</Button>

			<Button size='lg'>LG</Button>
		</div>
	),
};
