import { useState, useCallback } from 'react';
import { WOMPI_CONFIG } from '../constants';

export function useWompiPayment() {
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const generateReference = useCallback(() => {
        // Generate unique reference for the transaction
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        return `LOMI_${timestamp}_${random}`;
    }, []);

    const initiatePayment = useCallback(async ({ 
        amount = WOMPI_CONFIG.default_amount,
        description = "Creación de sitio web",
        customerData = {},
        onError
    }) => {
        try {
            setIsProcessingPayment(true);
            setPaymentError(null);

            // Validate Wompi configuration
            if (!WOMPI_CONFIG.public_key) {
                throw new Error('Wompi public key no configurada. Contacte al administrador.');
            }

            const reference = generateReference();
            const returnUrl = `${window.location.origin}/payment-success`;
            const cancelUrl = `${window.location.origin}/preview`;

            // Prepare Wompi payment data
            const paymentData = {
                public_key: WOMPI_CONFIG.public_key,
                currency: WOMPI_CONFIG.currency,
                amount_in_cents: parseInt(amount),
                reference: reference,
                redirect_url: returnUrl,
                cancel_url: cancelUrl,
                customer_data: {
                    phone_number: customerData.phone || '',
                    full_name: customerData.name || '',
                    email: customerData.email || ''
                },
                payment_description: description
            };

            // Store payment context in sessionStorage for handling return
            const paymentContext = {
                reference,
                amount,
                description,
                timestamp: Date.now(),
                onSuccessCallback: 'handleTemplateCreation' // We'll handle this in Preview component
            };
            sessionStorage.setItem('wompi_payment_context', JSON.stringify(paymentContext));

            // Build Wompi checkout URL
            const baseUrl = WOMPI_CONFIG.is_sandbox ? WOMPI_CONFIG.sandbox_url : WOMPI_CONFIG.production_url;
            const paymentUrl = new URL(baseUrl);
            // Add payment parameters to URL
            Object.entries(paymentData).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    // Handle nested objects like customer_data
                    Object.entries(value).forEach(([nestedKey, nestedValue]) => {
                        if (nestedValue) {
                            paymentUrl.searchParams.append(`${key}[${nestedKey}]`, nestedValue);
                        }
                    });
                } else if (value) {
                    paymentUrl.searchParams.append(key, value);
                }
            });

            // Redirect to Wompi checkout
            window.location.href = paymentUrl.toString();

        } catch (error) {
            console.error('Error initiating Wompi payment:', error);
            setPaymentError(error.message || 'Error al iniciar el pago');
            if (onError) {
                onError(error);
            }
        } finally {
            setIsProcessingPayment(false);
        }
    }, [generateReference]);

    const handlePaymentReturn = useCallback(() => {
        // Check if we're returning from a payment
        const paymentContext = sessionStorage.getItem('wompi_payment_context');
        
        if (paymentContext) {
            try {
                const context = JSON.parse(paymentContext);
                // Clear the context to prevent duplicate processing
                sessionStorage.removeItem('wompi_payment_context');
                return context;
            } catch (error) {
                console.error('Error parsing payment context:', error);
                return null;
            }
        }
        
        return null;
    }, []);

    return {
        isProcessingPayment,
        paymentError,
        initiatePayment,
        handlePaymentReturn,
        generateReference
    };
}