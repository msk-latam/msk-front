import Modal from '@/modules/dashboard/components/ui/Modal';
import React from 'react';

// Define the structure for invoice data
interface Invoice {
	id: string; // Unique identifier
	date: string; // Format like DD-MM-YY
	amount: string; // Format like $XXX.XXX
	currency: string; // e.g., ARS, USD
	downloadLink: string; // URL to download the invoice PDF
}

// --- Mock Data (Replace with actual data fetching) ---
const mockInvoices: Invoice[] = [
	{ id: '1', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
	{ id: '2', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
	{ id: '3', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
	{ id: '4', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
	{ id: '5', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
	{ id: '6', date: '20-05-25', amount: '146.145', currency: 'ARS', downloadLink: '#' },
];
// --- End Mock Data ---

interface InvoicesModalProps {
	isOpen: boolean;
	onClose: () => void;
	// In a real app, you'd pass the invoices as a prop
	// invoices: Invoice[];
}

// Simple Download Icon Component
const DownloadIcon: React.FC = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M2.6665 10V11.3333C2.6665 12.0697 3.26344 12.6667 3.99984 12.6667H11.9998C12.7362 12.6667 13.3332 12.0697 13.3332 11.3333V10'
			stroke='#9200AD'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path
			d='M4.6665 7.33331L7.99984 10.6666L11.3332 7.33331'
			stroke='#9200AD'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
		<path d='M8 10.6667V3.33331' stroke='#9200AD' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
	</svg>
);

const InvoicesModal: React.FC<InvoicesModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	// Use mock data for now
	const invoices = mockInvoices;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Mis facturas' size='medium'>
			<div className='w-full text-sm'>
				{/* Header Row */}
				<div className='grid grid-cols-3 gap-4 px-4 py-3 bg-[#F0F3FF] rounded-lg mb-2 font-medium text-[#1A1A1A]'>
					<div>Fecha</div>
					<div>Monto</div>
					<div className='text-right'>Factura</div>
				</div>

				{/* Invoice Rows */}
				<div className='space-y-1'>
					{invoices.map((invoice) => (
						<div
							key={invoice.id}
							className='grid grid-cols-3 gap-4 px-4 py-3 border-b border-gray-100 last:border-b-0 items-center'
						>
							<div className='text-[#1A1A1A]'>{invoice.date}</div>
							<div className='text-[#1A1A1A]'>
								${invoice.amount} {invoice.currency}
							</div>
							<div className='text-right'>
								<a
									href={invoice.downloadLink}
									download // Suggest downloading the file
									className='inline-flex items-center gap-1 text-[#9200AD] font-medium hover:underline'
								>
									Descargar
									<DownloadIcon />
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</Modal>
	);
};

export default InvoicesModal;
