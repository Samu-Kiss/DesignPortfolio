// src/components/ErrorBoundary.jsx
import React, { Component } from 'react';
import './ErrorBoundary/ErrorBoundary.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-boundary-content">
                        <h1 className="error-boundary-title">
                            <span className="luxurious">O</span>
                            <span className="lexend">OPS</span>
                        </h1>
                        <p className="error-boundary-text">
                            Algo salió mal. Por favor, recarga la página o vuelve al inicio.
                        </p>
                        <div className="error-boundary-actions">
                            <button 
                                onClick={this.handleReload} 
                                className="error-boundary-btn"
                            >
                                Recargar página
                            </button>
                            <button 
                                onClick={this.handleGoHome} 
                                className="error-boundary-btn primary"
                            >
                                Volver al inicio
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
