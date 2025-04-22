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
	<svg viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M19.1328 13.5703V14.7703C19.1328 16.4505 19.1328 17.2905 18.8058 17.9323C18.5182 18.4968 18.0593 18.9557 17.4948 19.2433C16.853 19.5703 16.013 19.5703 14.3328 19.5703H5.93281C4.25265 19.5703 3.41258 19.5703 2.77084 19.2433C2.20635 18.9557 1.74741 18.4968 1.45979 17.9323C1.13281 17.2905 1.13281 16.4505 1.13281 14.7703V13.5703M15.1328 8.57031L10.1328 13.5703M10.1328 13.5703L5.13281 8.57031M10.1328 13.5703V1.57031'
			stroke='#9200AD'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const InvoicesModal: React.FC<InvoicesModalProps> = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	// Use mock data for now
	const invoices = mockInvoices;

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Mis facturas' size='large'>
			<div className='w-full text-sm'>
				{/* Header Row */}
				<div className='grid grid-cols-3 gap-4 px-4 py-3 bg-[#DFE6FF] border border-[#DFE6FF] rounded-t-lg  font-bold font-inter text-[#29324F]'>
					<div className='text-left'>Fecha</div>
					<div className='text-center'>Monto</div>
					<div className='text-right'>Factura</div>
				</div>

				{/* Invoice Rows */}
				<div className='space-y-1 border-l border-r border-b border-[#DFE6FF] bg-[#F7F9FF] rounded-b-lg'>
					{invoices.map((invoice) => (
						<div
							key={invoice.id}
							className='grid grid-cols-3 gap-4 px-4 py-3 border-b border-[#DFE6FF] last:border-b-0 items-center'
						>
							<div className='text-[#1A1A1A] text-left'>{invoice.date}</div>
							<div className='text-[#1A1A1A] text-center'>
								${invoice.amount} {invoice.currency}
							</div>
							<div className='text-right'>
								<a
									href={invoice.downloadLink}
									download // Suggest downloading the file
									className='inline-flex items-center gap-1 text-[#9200AD] font-medium hover:underline'
								>
									Descargar
									<span className='ml-1 h-4 w-4'>
										<DownloadIcon />
									</span>
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
