import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useWompiPayment } from '../hooks/useWompiPayment';
import { useAuth } from '../contexts/useAuth';
import { useTemplate } from '../contexts/TemplateContext';
import { useCreateTemplate } from '../hooks/useCreateTemplate';
import { useMessage } from '../hooks/useMessage';

function PaymentSuccess() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing'); // processing, success, error
    const [message, setMessage] = useState('Procesando pago...');
    
    const { handlePaymentReturn } = useWompiPayment();
    const { user, getToken } = useAuth();
    const { templateContent, formData } = useTemplate();
    const { mutateAsync: createTemplate } = useCreateTemplate();
    const { showError, showSuccess } = useMessage();

    useEffect(() => {
        const processPaymentReturn = async () => {
            try {
                // Check if user is still authenticated
                if (!user?.email) {
                    setStatus('error');
                    setMessage('Usuario no autenticado. Redirigiendo al login...');
                    setTimeout(() => navigate('/login'), 3000);
                    return;
                }

                // Get payment context
                const paymentContext = handlePaymentReturn();
                
                if (!paymentContext) {
                    setStatus('error');
                    setMessage('No se encontró información del pago. Redirigiendo...');
                    setTimeout(() => navigate('/preview'), 3000);
                    return;
                }

                // Validate we have the necessary data for template creation
                if (!templateContent) {
                    setStatus('error');
                    setMessage('No se encontró el contenido del template. Redirigiendo...');
                    setTimeout(() => navigate('/preview'), 3000);
                    return;
                }

                if (!formData?.company_name) {
                    setStatus('error');
                    setMessage('No se encontró la información de la empresa. Redirigiendo...');
                    setTimeout(() => navigate('/preview'), 3000);
                    return;
                }

                // Payment was successful, proceed with template creation
                setMessage('Pago exitoso. Creando tu sitio web...');

                const companyName = formData?.company_name || 'Compañía no especificada';

                const webCreationData = {
                    ...templateContent,
                    client_name: companyName,
                    user_id: user.pk,
                    repo_url: templateContent.selectedTemplateId || 'template1', // Default template
                    payment_reference: paymentContext.reference
                };

                await createTemplate({
                    templateData: webCreationData,
                    token: getToken()
                });

                setStatus('success');
                setMessage('¡Pago procesado y sitio web creado exitosamente!');
                showSuccess('¡Tu sitio web ha sido creado exitosamente!');
                
                // Redirect to dashboard after 2 seconds
                setTimeout(() => navigate('/dashboard'), 2000);

            } catch (error) {
                console.error('Error processing payment return:', error);
                setStatus('error');
                setMessage('Error al procesar el pago o crear el sitio web.');
                showError(`Error: ${error?.detail || error?.message || 'Error desconocido'}`);
                
                // Redirect to preview after 3 seconds
                setTimeout(() => navigate('/preview'), 3000);
            }
        };

        processPaymentReturn();
    }, [user, templateContent, formData, handlePaymentReturn, createTemplate, getToken, navigate, showError, showSuccess]);

    const getAlertSeverity = () => {
        switch (status) {
            case 'success':
                return 'success';
            case 'error':
                return 'error';
            default:
                return 'info';
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                minHeight="50vh"
                textAlign="center"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Procesamiento de Pago
                </Typography>
                
                {status === 'processing' && (
                    <CircularProgress size={60} sx={{ mb: 3, color: '#8783CA' }} />
                )}
                
                <Alert 
                    severity={getAlertSeverity()} 
                    sx={{ 
                        mt: 2, 
                        maxWidth: 600,
                        '& .MuiAlert-icon': {
                            color: status === 'processing' ? '#8783CA' : undefined
                        }
                    }}
                >
                    {message}
                </Alert>

                {status === 'success' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Serás redirigido al panel de control en unos segundos...
                    </Typography>
                )}

                {status === 'error' && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Serás redirigido de vuelta a la vista previa...
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default PaymentSuccess;