import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tooltip from './Tooltip';
import { Info, Plus, Settings } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	argTypes: {
		content: {
			control: 'text',
			description: 'Tooltip content',
		},

		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},

		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},

		delayDuration: {
			control: {
				type: 'number',
			},
		},

		sideOffset: {
			control: {
				type: 'number',
			},
		},

		className: {
			control: 'text',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
	<button
		ref={ref}
		className={`inline-flex items-center justify-center rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium hover:bg-zinc-100 transition-colors ${className}`}
		{...props}
	/>
));

Button.displayName = 'Button';

const IconButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
	<button ref={ref} className={`rounded-full p-2 hover:bg-zinc-100 transition-colors ${className}`} {...props} />
));

IconButton.displayName = 'IconButton';

export const Default: Story = {
	args: {
		content: 'This is a tooltip',
		side: 'top',
		align: 'center',
		delayDuration: 200,
		sideOffset: 4,
	},

	render: (args) => (
		<Tooltip {...args}>
			<Button>Hover Me</Button>
		</Tooltip>
	),
};

export const IconTrigger: Story = {
	args: {
		content: 'Settings',
	},

	render: (args) => (
		<Tooltip {...args}>
			<IconButton>
				<Settings className='h-5 w-5 text-zinc-700' />
			</IconButton>
		</Tooltip>
	),
};

export const RichContent: Story = {
	args: {
		side: 'bottom',
		content: (
			<div className='max-w-[220px] space-y-1'>
				<p className='text-sm font-semibold'>Create Workspace</p>
				<p className='text-xs text-zinc-400'>Organize projects and invite team members.</p>
			</div>
		),
	},

	render: (args) => (
		<Tooltip {...args}>
			<IconButton className='bg-black text-white hover:bg-zinc-800'>
				<Plus className='h-5 w-5' />
			</IconButton>
		</Tooltip>
	),
};

export const InstantDisplay: Story = {
	args: {
		content: 'Appears instantly',
		delayDuration: 0,
	},

	render: (args) => (
		<Tooltip {...args}>
			<Button>No Delay</Button>
		</Tooltip>
	),
};

export const InformationIndicator: Story = {
	args: {
		content: 'This field is required.',
		side: 'top',
		align: 'start',
	},

	render: (args) => (
		<Tooltip {...args}>
			<div className='flex items-center gap-1 cursor-help'>
				<span className='text-sm font-medium'>Tax ID</span>
				<Info className='h-4 w-4 text-zinc-400' />
			</div>
		</Tooltip>
	),
};
