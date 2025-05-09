import Modal from '@/modules/dashboard/components/ui/Modal';
import React from 'react';

interface InvoicesModalProps {
	isOpen: boolean;
	onClose: () => void;
	contracts: any;
}

// Simple Download Icon Component
const DownloadIcon: React.FC = () => (
	<svg viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M19.1328 13.5703V14.7703C19.1328 16.4505 19.1328 17.2905 18.8058 17.9323C18.5182 18.4968 18.0593 18.9557 17.4948 19.2433C16.853 19.5703 16.013 19.5703 14.3328 19.5703H5.93281C4.25265 19.5703 3.41258 19.5703 2.77084 19.2433C2.20635 18.9557 1.74741 18.4968 1.45979 17.9323C1.13281 17.2905 1.13281 16.4505 1.13281 14.7703V13.5703M15.1328 8.57031L10.1328 13.5703M10.1328 13.5703L5.13281 8.57031M10.1328 13.5703V1.57031'
			stroke='currentColor'
			strokeWidth='1.5'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);

const InvoicesModal: React.FC<InvoicesModalProps> = ({ isOpen, onClose, contracts }) => {
	if (!isOpen) return null;

	const generateInvoice = (invoice: any) => {
		if (invoice.status_payment === 'Activo') {
			// Create invoice content as a string
			const invoiceContent = JSON.stringify({
				id: invoice.id,
				date: invoice.Fecha_Cobro,
				amount: invoice.Monto,
				currency: invoice.currency,
			});

			// Generate the invoice and download it
			const blob = new Blob([invoiceContent], { type: 'application/pdf' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `Factura_${invoice.id}.pdf`;
			a.click();

			// Clean up by revoking the object URL
			setTimeout(() => URL.revokeObjectURL(url), 100);
		}
	};

	const formatPrice = (invoice: any) => {
		const currency = invoice.currency; //MXN, COP, USD, ARS
		const amount = invoice.Monto;
		const formattedPrice = new Intl.NumberFormat('es-AR', {
			style: 'currency',
			currency: currency,
		}).format(amount);

		return formattedPrice;
	};

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
					{contracts && contracts.length > 0 ? (
						contracts
							.filter((invoice: any) => invoice.Fecha_Cobro && invoice.status !== 'Borrador')
							.sort((a: any, b: any) => new Date(b.Fecha_Cobro).getTime() - new Date(a.Fecha_Cobro).getTime())
							.map((invoice: any) => (
								<div
									key={invoice.id}
									className='grid grid-cols-3 gap-4 px-4 py-3 border-b border-[#DFE6FF] last:border-b-0 items-center'
								>
									<div className='text-[#1A1A1A] text-left'>{invoice.Fecha_Cobro}</div>
									<div className='text-[#1A1A1A] text-center'>{formatPrice(invoice)}</div>
									<div className='text-right'>
										{invoice.Comprobante_Factura === null ? (
											<button
												className={`inline-flex items-center gap-1 text-gray-400 font-medium cursor-not-allowed`}
												disabled
											>
												Descargar
												<span className='ml-1 h-4 w-4'>
													<DownloadIcon />
												</span>
											</button>
										) : (
											<button
												className={`inline-flex items-center gap-1 text-[#9200AD] font-medium hover:underline`}
												onClick={() => generateInvoice(invoice)}
											>
												Descargar
												<span className='ml-1 h-4 w-4'>
													<DownloadIcon />
												</span>
											</button>
										)}
									</div>
								</div>
							))
					) : (
						<div className='flex flex-col items-center justify-center py-8 px-4 text-center'>
							<p className='text-[#4F5D89] font-raleway font-medium mb-2'>No tienes facturas disponibles</p>
							<p className='text-[#4F5D89] font-inter text-sm'>Las facturas aparecerán aquí cuando realices una compra</p>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default InvoicesModal;
