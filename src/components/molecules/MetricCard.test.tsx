import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import MetricCard from './MetricCard';

describe('MetricCard', () => {
	it('renders title correctly', () => {
		render(<MetricCard title='Revenue' value={1200} />);

		expect(screen.getByText('Revenue')).toBeInTheDocument();
	});

	it('renders numeric value correctly', () => {
		render(<MetricCard title='Users' value={1500} />);

		expect(screen.getByText(/1,500/)).toBeInTheDocument();
	});

	it('renders percentage value correctly', () => {
		render(<MetricCard title='Growth' value={12.45} isPercent />);

		expect(screen.getByText('12.45%')).toBeInTheDocument();
	});

	it('renders currency value correctly', () => {
		render(<MetricCard title='Profit' value={25000} currency='USD' />);

		expect(screen.getByText(/\$/)).toBeInTheDocument();
	});

	it('shows positive trend indicator', () => {
		const { container } = render(<MetricCard title='Sales' value={22} isPercent showChangeIndicator />);

		const svg = container.querySelector('svg');

		expect(svg).toBeInTheDocument();
	});

	it('shows negative trend indicator', () => {
		const { container } = render(<MetricCard title='Churn' value={5} isPercent showChangeIndicator isNegative />);

		const svg = container.querySelector('svg');

		expect(svg).toBeInTheDocument();
	});

	it('does not render trend indicator when disabled', () => {
		const { container } = render(<MetricCard title='Traffic' value={1000} />);

		const svg = container.querySelector('svg');

		expect(svg).not.toBeInTheDocument();
	});

	it('matches snapshot', () => {
		const { asFragment } = render(<MetricCard title='Snapshot Test' value={45000} currency='INR' showChangeIndicator />);

		expect(asFragment()).toMatchSnapshot();
	});
});
