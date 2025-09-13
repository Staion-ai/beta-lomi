import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Alert, Button } from '@mui/material';
import TemplateSelector from '../components/beta/preview/components/TemplateSelector';
import TemplateRenderer from '../components/beta/preview/components/TemplateRenderer';
import { DEFAULT_TEMPLATE } from '../components/beta/preview/templateConfig';
import { useTemplate } from '../contexts/TemplateContext';
import { useAuth } from '../contexts/useAuth';
import AuthHeader from '../components/auth/AuthHeader';
import MessageSnackbar from '../components/common/MessageSnackBar';
import { useMessage } from '../hooks/useMessage';
import { useWompiPayment } from '../hooks/useWompiPayment';
import '../components/beta/preview/styles/Preview.css';

function Preview() {
    const location = useLocation();
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
    const { templateContent, formData } = useTemplate();
    const { user } = useAuth();
    const { message, showError, showInfo, hideMessage } = useMessage();
    const { initiatePayment, isProcessingPayment, paymentError } = useWompiPayment();

    useEffect(() => {
        if (location.state?.templateContent && !templateContent) {
            console.warn('Template content received via location state instead of context');
            showInfo('Contenido del template recibido desde navegación');
        }
    }, [location.state, templateContent, showInfo]);

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
        showInfo(`Plantilla "${template.name}" seleccionada`);
    };



    const handleButtonClick = async () => {
        if (!templateContent) {
            console.error('❌ Error: No hay contenido del template disponible');
            showError('Debes completar el formulario primero para generar el contenido del template.');
            return;
        }

        if (!user?.email) {
            console.error('❌ Error: No se encontró el email del usuario');
            showError('Usuario no autenticado correctamente.');
            return;
        }

        if (!formData?.company_name) {
            console.error('❌ Error: No se encontró el nombre de la compañía');
            showError('No se pudo obtener el nombre de la empresa del formulario.');
            return;
        }

        // Store selected template info for payment success page
        // Note: This assumes the TemplateContext has a method to update template content
        // If not available, we'll store it in sessionStorage as fallback
        try {
            sessionStorage.setItem('selected_template_id', selectedTemplate.id);
        } catch (error) {
            console.warn('Could not store selected template in sessionStorage:', error);
        }

        // Initiate payment flow
        const companyName = formData?.company_name || 'Compañía no especificada';
        
        try {
            showInfo('Redirigiendo a la pasarela de pago...');
            
            await initiatePayment({
                amount: "50000", // 500 COP in cents
                description: `Creación de sitio web para ${companyName}`,
                customerData: {
                    email: user.email,
                    name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
                    phone: user.phone || ''
                },
                onError: (error) => {
                    console.error('❌ Error al iniciar el pago:', error);
                    showError(`Error al procesar el pago: ${error?.message || 'Error desconocido'}`);
                }
            });
        } catch (error) {
            console.error('❌ Error en el flujo de pago:', error);
            showError(`Error al iniciar el pago: ${error?.message || 'Error desconocido'}`);
        }
    };

    return (
        <>
            <AuthHeader title="Preview - Vista de Plantillas" showBackButton={true} />
            <div className="preview-container">
                <div className="preview-header">
                    <Container maxWidth="lg">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="h4" component="h1" color='#000' gutterBottom>
                                    Vista Previa de Plantillas
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Selecciona una plantilla para ver cómo se ve tu proyecto.
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleButtonClick}
                                disabled={isProcessingPayment}
                                sx={{
                                    backgroundColor: '#8783CA',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    '&:hover': {
                                        backgroundColor: '#6B66B8',
                                        color: '#FFFFFF',
                                    },
                                    '&:active': {
                                        backgroundColor: '#5A549F',
                                    },
                                    '&:disabled': {
                                        backgroundColor: '#cccccc',
                                        color: '#666666',
                                    }
                                }}
                            >
                                {isProcessingPayment ? 'Procesando pago...' : 'Crea tu web'}
                            </Button>
                        </Box>
                    </Container>
                </div>

                <div className="preview-content">
                    <Container maxWidth="lg">
                        {paymentError && (
                            <Alert
                                severity="error"
                                sx={{
                                    mb: 3,
                                    borderRadius: 2,
                                    backgroundColor: '#ffebee',
                                    color: '#c62828',
                                    '& .MuiAlert-icon': {
                                        color: '#c62828'
                                    }
                                }}
                            >
                                Error en el pago: {paymentError}
                            </Alert>
                        )}
                        
                        {templateContent && (
                            <Alert
                                severity="success"
                                sx={{
                                    mb: 3,
                                    borderRadius: 2,
                                    backgroundColor: '#F9DCB8',
                                    color: '#333',
                                    '& .MuiAlert-icon': {
                                        color: '#8783CA'
                                    }
                                }}
                            >
                                ¡Excelente! Tu proyecto ha sido procesado correctamente.
                                Ahora puedes ver cómo se verá en diferentes plantillas.
                            </Alert>
                        )}

                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={handleTemplateChange}
                        />

                        <TemplateRenderer
                            template={selectedTemplate}
                            data={templateContent}
                        />
                    </Container>
                </div>
            </div>

            <MessageSnackbar
                open={message.open}
                message={message.text}
                severity={message.severity}
                onClose={hideMessage}
            />
        </>
    );
}

export default Preview;