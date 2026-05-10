import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CostDataTable } from './CostDataTable';

describe('CostDataTable', () => {
	const mockItems = [
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
		{
			meter_id: 'storage',
			meter_name: 'Storage Usage',
			total_quantity: '500',
			total_cost: '299.99',
			total_events: 250,
			currency: 'USD',
			source: 'system',
			price_id: 'price_2',
		},
	];

	it('renders heading correctly', () => {
		render(<CostDataTable items={mockItems} />);

		expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
	});

	it('renders table column headers', () => {
		render(<CostDataTable items={mockItems} />);

		expect(screen.getByText('Cost Attribute')).toBeInTheDocument();
		expect(screen.getByText('Total Quantity')).toBeInTheDocument();
		expect(screen.getByText('Total Cost')).toBeInTheDocument();
	});

	it('renders meter names correctly', () => {
		render(<CostDataTable items={mockItems} />);

		expect(screen.getByText('API Calls')).toBeInTheDocument();
		expect(screen.getByText('Storage Usage')).toBeInTheDocument();
	});

	it('renders formatted quantity values', () => {
		render(<CostDataTable items={mockItems} />);

		expect(screen.getByText(/250,000/)).toBeInTheDocument();
		expect(screen.getByText('500')).toBeInTheDocument();
	});

	it('renders formatted currency values', () => {
		render(<CostDataTable items={mockItems} />);

		expect(screen.getByText(/\$1,250.50/)).toBeInTheDocument();
		expect(screen.getByText(/\$299.99/)).toBeInTheDocument();
	});

	it('falls back to meter_id when meter_name is missing', () => {
		const fallbackItems = [
			{
				meter_id: 'fallback_meter',
				total_quantity: '1500',
				total_cost: '75',
				total_events: 50,
				currency: 'USD',
				source: 'internal',
				price_id: 'price_fallback',
			},
		];

		render(<CostDataTable items={fallbackItems} />);

		expect(screen.getByText('fallback_meter')).toBeInTheDocument();
	});

	it('renders empty state without crashing', () => {
		render(<CostDataTable items={[]} />);

		expect(screen.getByText('Cost Breakdown')).toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<CostDataTable items={mockItems} />);

		expect(asFragment()).toMatchSnapshot();
	});
});
