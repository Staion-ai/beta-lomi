import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Card, CardContent, Button } from '@mui/material';
import { useWompiPayment } from '../hooks/useWompiPayment';
import { useAuth } from '../contexts/useAuth';
import { useTemplate } from '../contexts/TemplateContext';
import { useCreateTemplate } from '../hooks/useCreateTemplate';
import { useMessage } from '../hooks/useMessage';

import { useSearchParams } from "react-router-dom";
import { base_auth_url } from '../constants';

function PaymentSuccess() {
    const navigate = useNavigate();
    const [message, setMessage] = useState('Procesando pago...');

    const { handlePaymentReturn } = useWompiPayment();
    const { user, getToken } = useAuth();
    const { templateContent, formData } = useTemplate();
    const { mutateAsync: createTemplate } = useCreateTemplate();
    const { showError, showSuccess } = useMessage();

    const [paymentData, setPaymentData] = useState(null);
    const [status, setStatus] = useState("Cargando...");

    // Tomar transactionId de la URL
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");

    useEffect(() => {
        if (!transactionId) return;

        fetch(`${base_auth_url}/api/v1/payments/verify/${transactionId}/`)
            .then(res => res.json())
            .then(apiRes => {
                console.log("RESPUESTA DEL BACKEND", apiRes);

                setStatus(apiRes.status || "ERROR");
                setPaymentData(apiRes.data.data || null);  // 👈 GUARDA SOLO LA DATA
                console.log("Confirmacion", apiRes.data.data)
            })
            .catch(() => setStatus("ERROR"));
    }, [transactionId]);

    if (!paymentData) return <p>Cargando información del pago...</p>;

    /*
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
    */
    const statusTranslations = {
        APPROVED: "Aprobado",
        PENDING: "Pendiente",
        DECLINED: "Rechazado",
        "Cargando...": "Cargando..."
    };
    return (
        /*
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
        */
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Card sx={{ maxWidth: 500, width: "100%", boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    {status === "APPROVED" && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ✅ ¡Pago aprobado!
                        </Alert>
                    )}

                    {status === "PENDING" && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            ⏳ El pago está en proceso...
                        </Alert>
                    )}

                    {status === "DECLINED" && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            ❌ El pago fue rechazado.
                        </Alert>
                    )}

                    <Typography variant="h6" gutterBottom>
                        Estado del pago: {statusTranslations[status] || status}
                    </Typography>

                    <Typography><b>Referencia:</b> {paymentData.reference}</Typography>
                    <Typography>
                        <b>Monto:</b> {paymentData.amount_in_cents / 100} {paymentData.currency}
                    </Typography>
                    <Typography><b>Método de pago:</b> {paymentData.payment_method_type}</Typography>
                    <Typography>
                        <b>Fecha:</b>{" "}
                        {new Date(paymentData.finalized_at).toLocaleString()}
                    </Typography>

                    {status === "APPROVED" && (
                        <Button href='/preview' variant="contained" color="success" sx={{ mt: 2 }}>
                            Ir a mi perfil
                        </Button>
                    )}

                    {status === "DECLINED" && (
                        <Button href='/preview' variant="outlined" color="error" sx={{ mt: 2 }}>
                            Reintentar pago
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default PaymentSuccess;