'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_: Error): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Error capturado por ErrorBoundary:', error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
						flexDirection: 'column',
						textAlign: 'center',
					}}
				>
					<h1>Ocurrió un error al cargar esta página.</h1>
					<button
						onClick={() => window.location.reload()}
						style={{
							marginTop: '20px',
							padding: '10px 20px',
							fontSize: '16px',
							cursor: 'pointer',
							backgroundColor: '#9200AD',
							color: '#fff',
							border: 'none',
							borderRadius: '5px',
						}}
					>
						Recargar Página
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
