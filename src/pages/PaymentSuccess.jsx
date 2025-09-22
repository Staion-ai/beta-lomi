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


    const statusTranslations = {
        APPROVED: "Aprobado",
        PENDING: "Pendiente",
        DECLINED: "Rechazado",
        "Cargando...": "Cargando..."
    };
    return (
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
                        <Button href='/dashboard' variant="contained" color="success" sx={{ mt: 2 }}>
                            Ir a mi perfil
                        </Button>
                    )}

                    {status === "DECLINED" && (
                        <Button href='/dashboard' variant="outlined" color="error" sx={{ mt: 2 }}>
                            Reintentar pago
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default PaymentSuccess;