import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Card, CardContent, Typography, Alert, Button } from '@mui/material';
import { base_auth_url } from '../constants';

function PaymentSuccess() {
    const navigate = useNavigate();
    const [paymentData, setPaymentData] = useState(null);
    const [status, setStatus] = useState('Cargando...');
    const [polling, setPolling] = useState(true);

    // Tomar reference de la URL
    const [searchParams] = useSearchParams();
    const transaction_id = searchParams.get("id");

    console.log("Referencia obtenida de la URL:", transaction_id);
    console.log("params actual:", searchParams);

    useEffect(() => {
        if (!transaction_id) return;

        console.log("Verificando pago con referencia:", transaction_id);

        const fetchPayment = async () => {
            try {
                const res = await fetch(`${base_auth_url}/api/v1/payments/verify/${transaction_id}/`);
                const data = await res.json();

                if (res.ok) {
                    console.log("Datos del pago:", data);
                    setPaymentData(data);
                    setStatus(data.status || 'ERROR');
                    if (data.status === 'APPROVED') {
                        localStorage.removeItem('selected_template_id'); // Limpiar selección previa
                        localStorage.removeItem('template_form_data'); // Limpiar datos del formulario
                    }
                    // Detener polling si ya está aprobado o rechazado
                    if (data.status === 'APPROVED' || data.status === 'DECLINED') {
                        setPolling(false);
                    }
                } else {
                    console.error("Error al obtener el pago:", data);
                    setStatus('ERROR');
                }
            } catch (err) {
                setStatus('ERROR');
            }
        };

        // Primer fetch
        fetchPayment();

        // Hacer polling cada 5 segundos mientras polling sea true
        let interval;
        if (polling) {
            interval = setInterval(fetchPayment, 5000);
        }

        return () => clearInterval(interval);
    }, [transaction_id, polling]);

    const statusTranslations = {
        APPROVED: 'Aprobado',
        PENDING: 'Pendiente',
        DECLINED: 'Rechazado',
        'Cargando...': 'Cargando...',
        ERROR: 'Error'
    };

    if (!paymentData) return <p>Cargando información del pago...</p>;

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
            <Card sx={{ maxWidth: 500, width: '100%', boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    {status === 'APPROVED' && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ✅ ¡Pago aprobado!
                        </Alert>
                    )}

                    {status === 'PENDING' && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            ⏳ El pago está en proceso...
                        </Alert>
                    )}

                    {status === 'DECLINED' && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            ❌ El pago fue rechazado.
                        </Alert>
                    )}

                    {status === 'ERROR' && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            ⚠️ Error al obtener información del pago
                        </Alert>
                    )}

                    <Typography variant="h6" gutterBottom>
                        Estado del pago: {statusTranslations[status] || status}
                    </Typography>

                    <Typography><b>Referencia:</b> {paymentData.reference}</Typography>
                    <Typography>
                        <b>Monto:</b> {paymentData.amount_in_cents / 100} {paymentData.currency}
                    </Typography>
                    {paymentData.payment_method_type && (
                        <Typography><b>Método de pago:</b> {paymentData.payment_method_type}</Typography>
                    )}
                    {paymentData.finalized_at && (
                        <Typography><b>Fecha:</b> {new Date(paymentData.finalized_at).toLocaleString()}</Typography>
                    )}

                    {status === 'APPROVED' && (
                        <Button href='/dashboard' variant="contained" color="success" sx={{ mt: 2 }}>
                            Ir a mi perfil
                        </Button>
                    )}

                    {status === 'DECLINED' && (
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
