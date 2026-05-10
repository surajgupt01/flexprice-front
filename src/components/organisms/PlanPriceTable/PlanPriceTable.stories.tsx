import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, fn } from '@storybook/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';

import PlanPriceTable from './PlanPriceTable';
import { PriceApi } from '@/api/PriceApi';
import { BILLING_PERIOD } from '@/constants/constants';

// ================================
// MOCK API METHODS
// ================================

PriceApi.searchPrices = fn();
PriceApi.DeletePrice = fn();

// ================================
// QUERY CLIENT
// ================================

const createQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
		},
	});

// ================================
// MOCK PLAN
// ================================

const mockPlan = {
	id: 'plan_001',

	name: 'Pro Plan',

	description: 'Professional subscription plan with advanced billing features.',

	lookup_key: 'pro-plan',

	environment_id: 'env_001',

	tenant_id: 'tenant_001',

	created_at: '2024-01-01T00:00:00Z',

	updated_at: '2024-06-01T00:00:00Z',

	created_by: 'storybook',

	updated_by: 'storybook',

	status: 'published' as any,

	metadata: {
		tier: 'professional',
		category: 'subscription',
	},

	display_order: 1,
};

// ================================
// DATES
// ================================

const now = new Date();

const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

const pastDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

// ================================
// MOCK PRICE FACTORY
// ================================

const createPrice = (overrides = {}) => ({
	id: `price_${Math.random().toString(36).slice(2)}`,

	entity_id: mockPlan.id,

	entity_type: 'plan',

	display_name: 'Base Subscription',

	description: 'Monthly subscription fee',

	type: 'flat',

	invoice_cadence: 'advance',

	billing_period: BILLING_PERIOD.MONTHLY,

	currency: 'USD',

	amount: '4900',

	start_date: '',

	end_date: '',

	lookup_key: 'base-subscription',

	environment_id: 'env_001',

	tenant_id: 'tenant_001',

	created_at: '2024-01-01T00:00:00Z',

	updated_at: '2024-06-01T00:00:00Z',

	created_by: 'storybook',

	updated_by: 'storybook',

	version: 1,

	pricing_unit: {
		id: 'pu_001',
		display_name: 'USD',
		symbol: '$',
		precision: 2,
	},

	...overrides,
});

// ================================
// MOCK PRICES
// ================================

const MOCK_PRICES = [
	createPrice({
		id: 'price_001',
		display_name: 'Base Subscription',
		type: 'flat',
		amount: '4900',
	}),

	createPrice({
		id: 'price_002',
		display_name: 'API Calls',
		type: 'usage',
		amount: '10',
		invoice_cadence: 'arrear',
		meter: {
			id: 'meter_001',
			name: 'API Meter',
		},
	}),

	createPrice({
		id: 'price_003',
		display_name: 'Storage Add-on',
		type: 'tiered',
		amount: '500',
		start_date: futureDate,
	}),

	createPrice({
		id: 'price_004',
		display_name: 'Legacy Support',
		type: 'flat',
		billing_period: BILLING_PERIOD.ANNUAL,
		amount: '29900',
		end_date: pastDate,
	}),
];

// ================================
// DECORATOR
// ================================

const withProviders = (Story: React.ComponentType) => (
	<QueryClientProvider client={createQueryClient()}>
		<MemoryRouter>
			<div className='min-h-screen bg-gray-50 p-6'>
				<Story />
			</div>
		</MemoryRouter>
	</QueryClientProvider>
);

// ================================
// META
// ================================

const meta: Meta<typeof PlanPriceTable> = {
	title: 'Organisms/PlanPriceTable',

	component: PlanPriceTable,

	tags: ['autodocs'],

	decorators: [withProviders],

	parameters: {
		layout: 'fullscreen',
	},

	args: {
		plan: mockPlan,

		onPriceUpdate: fn(),
	},

	argTypes: {
		plan: {
			control: 'object',
			description: 'Plan data',
		},

		onPriceUpdate: {
			action: 'priceUpdated',
		},
	},
};

export default meta;

type Story = StoryObj<typeof PlanPriceTable>;

// ================================
// DEFAULT
// ================================

export const Default: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: MOCK_PRICES,

				pagination: {
					total: MOCK_PRICES.length,
					limit: 10,
					offset: 0,
				},
			});

			(PriceApi.DeletePrice as any).mockResolvedValue({
				success: true,
			});

			return {};
		},
	],

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Charges')).toBeInTheDocument();

		await expect(canvas.getByText('Base Subscription')).toBeInTheDocument();

		await expect(canvas.getByText('API Calls')).toBeInTheDocument();

		await expect(canvas.getByText('Storage Add-on')).toBeInTheDocument();

		await expect(canvas.getByText('Legacy Support')).toBeInTheDocument();
	},
};

// ================================
// EMPTY STATE
// ================================

export const Empty: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: [],

				pagination: {
					total: 0,
					limit: 10,
					offset: 0,
				},
			});

			return {};
		},
	],
};

// ================================
// LOADING STATE
// ================================

export const Loading: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockReturnValue(new Promise(() => {}));

			return {};
		},
	],
};

// ================================
// UPCOMING PRICES
// ================================

export const UpcomingPrices: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: MOCK_PRICES.map((price) => ({
					...price,
					start_date: futureDate,
				})),

				pagination: {
					total: MOCK_PRICES.length,
					limit: 10,
					offset: 0,
				},
			});

			return {};
		},
	],
};

// ================================
// INACTIVE PRICES
// ================================

export const InactivePrices: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: MOCK_PRICES.map((price) => ({
					...price,
					end_date: pastDate,
				})),

				pagination: {
					total: MOCK_PRICES.length,
					limit: 10,
					offset: 0,
				},
			});

			return {};
		},
	],
};

// ================================
// ENTERPRISE PLAN
// ================================

export const EnterprisePlan: Story = {
	args: {
		plan: {
			...mockPlan,

			id: 'enterprise_plan',

			name: 'Enterprise Plan',

			lookup_key: 'enterprise-plan',

			description: 'Enterprise billing plan with premium pricing.',
		},
	},

	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: [
					createPrice({
						id: 'enterprise_001',
						display_name: 'Enterprise Base Fee',
						amount: '99900',
						billing_period: BILLING_PERIOD.ANNUAL,
					}),

					createPrice({
						id: 'enterprise_002',
						display_name: 'Dedicated Support',
						amount: '25000',
					}),
				],

				pagination: {
					total: 2,
					limit: 10,
					offset: 0,
				},
			});

			return {};
		},
	],
};

// ================================
// INTERACTION TEST
// ================================

export const InteractionTest: Story = {
	loaders: [
		async () => {
			(PriceApi.searchPrices as any).mockResolvedValue({
				items: MOCK_PRICES,

				pagination: {
					total: MOCK_PRICES.length,
					limit: 10,
					offset: 0,
				},
			});

			return {};
		},
	],

	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByText('Charges')).toBeInTheDocument();

		await expect(canvas.getByText('Base Subscription')).toBeInTheDocument();

		await expect(canvas.getByText('API Calls')).toBeInTheDocument();

		await expect(canvas.getByText('Add')).toBeInTheDocument();
	},
};
