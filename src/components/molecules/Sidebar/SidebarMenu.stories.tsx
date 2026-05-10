import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { MemoryRouter } from 'react-router';

import SidebarNav, { NavItem } from './SidebarMenu';

import { SidebarProvider } from '@/components/ui/sidebar';

import { LayoutDashboard, Users, CreditCard, Package, BarChart3 } from 'lucide-react';

const mockItems: NavItem[] = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: LayoutDashboard,
	},
	{
		title: 'Customers',
		url: '/customers',
		icon: Users,
	},
	{
		title: 'Billing',
		url: '/billing',
		icon: CreditCard,
		items: [
			{
				title: 'Invoices',
				url: '/billing/invoices',
			},
			{
				title: 'Payments',
				url: '/billing/payments',
			},
		],
	},
	{
		title: 'Product Catalog',
		url: '/product-catalog',
		icon: Package,
		items: [
			{
				title: 'Plans',
				url: '/product-catalog/plans',
			},
			{
				title: 'Features',
				url: '/product-catalog/features',
			},
		],
	},
	{
		title: 'Analytics',
		url: '/analytics',
		icon: BarChart3,
		disabled: true,
	},
];

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],

	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={['/dashboard']}>
				<SidebarProvider>
					<div className='w-[280px] min-h-screen border bg-white p-4'>
						<Story />
					</div>
				</SidebarProvider>
			</MemoryRouter>
		),
	],

	args: {
		items: mockItems,
	},

	argTypes: {
		items: {
			control: 'object',
			description: 'Sidebar navigation items',
		},
	},

	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Dashboard')).toBeInTheDocument();

		await expect(canvas.getByText('Billing')).toBeInTheDocument();
	},
};

export const InteractiveAccordion: Story = {
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const billingItem = canvas.getByText('Billing');

		await userEvent.click(billingItem);

		await expect(canvas.getByText('Invoices')).toBeInTheDocument();
	},
};
