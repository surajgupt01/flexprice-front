import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CouponModal from './CouponModal';
import { Coupon } from '@/models/Coupon';
import { Button } from '@/components/atoms';

const mockCoupons = [
	{
		id: 'coupon-1',
		name: 'SUMMER_SALE_50',
		description: '50% off on summer items',
		discountValue: 50,
		discountType: 'percentage',
	},
	{
		id: 'coupon-2',
		name: 'WELCOME_10',
		description: 'Flat $10 off for new users',
		discountValue: 10,
		discountType: 'fixed',
	},
	{
		id: 'coupon-3',
		name: 'FREE_SHIPPING',
		description: 'Free shipping on orders over $50',
		discountValue: 0,
		discountType: 'shipping',
	},
] as unknown as Coupon[];

// --- Meta Setup ---
const meta: Meta<typeof CouponModal> = {
	title: 'Organisms/CouponModal',
	component: CouponModal,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		onSave: { action: 'onSave triggered' },
		onCancel: { action: 'onCancel triggered' },
		onOpenChange: { action: 'onOpenChange triggered' },
		isOpen: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof CouponModal>;

// --- Static Visual Stories ---

export const Default: Story = {
	args: {
		isOpen: true,
		coupons: mockCoupons,
	},
};

export const WithPreselectedCoupon: Story = {
	args: {
		isOpen: true,
		coupons: mockCoupons,
		selectedCouponId: 'coupon-2',
	},
};

export const EmptyCouponsList: Story = {
	args: {
		isOpen: true,
		coupons: [],
	},
};

export const Interactive: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState(false);

		const handleSave = (id: string) => {
			args.onSave?.(id); // Safely call action logger
			setIsOpen(false); // Closes successfully after validation passes
		};

		const handleCancel = () => {
			args.onCancel?.(); // Safely call action logger
			setIsOpen(false); // GUARANTEED to close
		};

		return (
			<div className='p-10 flex flex-col items-center justify-center'>
				<Button onClick={() => setIsOpen(true)}>Open Modal (With Data)</Button>
				<CouponModal {...args} isOpen={isOpen} onOpenChange={setIsOpen} onSave={handleSave} onCancel={handleCancel} />
			</div>
		);
	},
	args: {
		coupons: mockCoupons,
	},
	parameters: {
		docs: {
			description: {
				story: 'Select a coupon and click "Add". Validation will pass, and the modal will close.',
			},
		},
	},
};

export const InteractiveEmpty: Story = {
	render: (args) => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isOpen, setIsOpen] = useState(false);

		const handleSave = (id: string) => {
			args.onSave?.(id);
			setIsOpen(false);
		};

		const handleCancel = () => {
			args.onCancel?.(); // Safely call action logger
			setIsOpen(false); // GUARANTEED to close
		};

		return (
			<div className='p-10 flex flex-col items-center justify-center'>
				<Button variant='outline' onClick={() => setIsOpen(true)}>
					Open Modal (No Data)
				</Button>
				<CouponModal {...args} isOpen={isOpen} onOpenChange={setIsOpen} onSave={handleSave} onCancel={handleCancel} />
			</div>
		);
	},
	args: {
		coupons: [],
	},
	parameters: {
		docs: {
			description: {
				story:
					'Click "Add" without selecting a coupon. The modal will stay open and display an error. Clicking "Cancel" will safely close it.',
			},
		},
	},
};
