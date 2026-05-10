import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import EmptyState from './EmptyState';

import { Database, FileSearch, PackageOpen, Users } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],

	args: {
		title: 'No Data Found',
		description: 'There is currently no data available to display.',
		icon: <Database size={48} />,
	},

	argTypes: {
		title: {
			control: 'text',
			description: 'Main heading/title',
		},
		description: {
			control: 'text',
			description: 'Supporting description text',
		},
		icon: {
			control: false,
			description: 'Optional icon element',
		},
	},

	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

/**
 * Default empty state
 */
export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('No Data Found')).toBeInTheDocument();
	},
};

/**
 * Without description
 */
export const TitleOnly: Story = {
	args: {
		title: 'No Customers Yet',
		description: undefined,
		icon: <Users size={48} />,
	},
};

/**
 * Search empty state
 */
export const SearchResultsEmpty: Story = {
	args: {
		title: 'No Results Found',
		description: 'Try adjusting your search or filters to find what you are looking for.',
		icon: <FileSearch size={48} />,
	},
};

/**
 * Product catalog empty state
 */
export const ProductCatalogEmpty: Story = {
	args: {
		title: 'No Products Available',
		description: 'Products added to the catalog will appear here.',
		icon: <PackageOpen size={48} />,
	},
};

/**
 * Interaction test example
 */
export const InteractiveState: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const title = canvas.getByText('No Data Found');

		await userEvent.hover(title);

		await expect(title).toBeInTheDocument();
	},
};
