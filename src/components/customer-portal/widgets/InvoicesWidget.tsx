import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import CustomerPortalApi from '@/api/CustomerPortalApi';
import { Card, Chip } from '@/components/atoms';
import { Invoice, INVOICE_STATUS } from '@/models/Invoice';
import { PAYMENT_STATUS } from '@/constants/payment';
import { formatDateShort, getCurrencySymbol } from '@/utils/common/helper_functions';
import { formatAmount } from '@/components/atoms/Input/Input';
import { Download, Search } from 'lucide-react';
import { Input } from '@/components/ui';
import EmptyState from '../EmptyState';

const getStatusChip = (invoice: Invoice) => {
	if (invoice.payment_status === PAYMENT_STATUS.SUCCEEDED) return <Chip label='Paid' variant='success' />;
	if (invoice.invoice_status === INVOICE_STATUS.VOIDED) return <Chip label='Voided' variant='default' />;
	if (invoice.invoice_status === INVOICE_STATUS.DRAFT) return <Chip label='Draft' variant='default' />;
	const isOverdue = new Date(invoice.due_date) < new Date();
	if (isOverdue) return <Chip label='Overdue' variant='failed' />;
	return <Chip label='Pending' variant='warning' />;
};

const InvoicesWidget = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const {
		data: invoicesData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['portal-invoices-tab'],
		queryFn: () => CustomerPortalApi.getInvoices({ limit: 100, offset: 0 }),
	});

	useEffect(() => {
		if (isError) toast.error('Failed to load invoices');
	}, [isError]);

	if (isLoading) {
		return (
			<div className='space-y-6'>
				<div className='h-10 bg-zinc-100 animate-pulse rounded-md'></div>
				<Card className='bg-white border border-[#E9E9E9] rounded-xl p-4'>
					<div className='animate-pulse space-y-3'>
						{[1, 2, 3, 4].map((i) => (
							<div key={i} className='h-12 bg-zinc-100 rounded'></div>
						))}
					</div>
				</Card>
			</div>
		);
	}

	const invoices = invoicesData?.items || [];
	const currency = invoices[0]?.currency || 'USD';
	const currencySymbol = getCurrencySymbol(currency);

	const filteredInvoices = invoices.filter((invoice) => {
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return (
			invoice.invoice_number?.toLowerCase().includes(query) ||
			invoice.invoice_status?.toLowerCase().includes(query) ||
			invoice.payment_status?.toLowerCase().includes(query)
		);
	});

	const handleDownloadPdf = async (invoice: Invoice) => {
		try {
			await CustomerPortalApi.downloadInvoicePdf(invoice.id);
			toast.success('Invoice downloaded');
		} catch {
			toast.error('Failed to download invoice');
		}
	};

	if (invoices.length === 0) {
		return (
			<Card className='bg-white border border-[#E9E9E9] rounded-xl p-6'>
				<EmptyState title='No invoices' description='No invoices have been generated yet' />
			</Card>
		);
	}

	return (
		<div className='space-y-6'>
			<div className='relative'>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400' />
				<Input
					placeholder='Search invoices...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='pl-10 bg-white border-[#E9E9E9]'
				/>
			</div>

			<Card className='bg-white border border-[#E9E9E9] rounded-xl overflow-hidden'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-[#E9E9E9] bg-zinc-50'>
								<th className='text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider'>Date</th>
								<th className='text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider'>Invoice #</th>
								<th className='text-left px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider'>Status</th>
								<th className='text-right px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider'>Amount</th>
								<th className='text-center px-4 py-3 text-xs font-medium text-zinc-500 uppercase tracking-wider'>Download</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-[#E9E9E9]'>
							{filteredInvoices.map((invoice) => (
								<tr key={invoice.id} className='hover:bg-zinc-50 transition-colors'>
									<td className='px-4 py-3 text-sm text-zinc-700'>
										{invoice.finalized_at ? formatDateShort(invoice.finalized_at) : formatDateShort(invoice.created_at)}
									</td>
									<td className='px-4 py-3 text-sm text-zinc-900 font-medium'>
										{invoice.invoice_number || `INV-${invoice.id.slice(0, 8)}`}
									</td>
									<td className='px-4 py-3'>{getStatusChip(invoice)}</td>
									<td className='px-4 py-3 text-sm text-zinc-900 text-right font-medium'>
										{currencySymbol}
										{formatAmount(String(invoice.total ?? 0))}
									</td>
									<td className='px-4 py-3 text-center'>
										{invoice.invoice_status === INVOICE_STATUS.FINALIZED && (
											<button
												onClick={() => handleDownloadPdf(invoice)}
												className='p-2 hover:bg-zinc-100 rounded-md transition-colors text-zinc-500 hover:text-zinc-700'>
												<Download className='h-4 w-4' />
											</button>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{filteredInvoices.length === 0 && (
						<div className='py-8'>
							<EmptyState title='No invoices found' description='No invoices match your search criteria' />
						</div>
					)}
				</div>
			</Card>
		</div>
	);
};

export default InvoicesWidget;
