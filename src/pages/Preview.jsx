import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Alert, Button,
    /*Modal*/
    Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TemplateSelector from '../components/beta/preview/components/TemplateSelector';
import TemplateRenderer from '../components/beta/preview/components/TemplateRenderer';
import { DEFAULT_TEMPLATE } from '../components/beta/preview/templateConfig';
import { useTemplate } from '../contexts/TemplateContext';
import { useAuth } from '../contexts/useAuth';
import AuthHeader from '../components/auth/AuthHeader';
import MessageSnackbar from '../components/common/MessageSnackBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useMessage } from '../hooks/useMessage';
import { useWompiPayment } from '../hooks/useWompiPayment';
import '../components/beta/preview/styles/Preview.css';
import ArrowDirection from '../components/common/ArrowDirection';
import { useCreateTemplate } from '../hooks/useCreateTemplate';

function Preview() {

    /*Pasarela de pago mediante modal*/
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleclose = () => setOpen(false);

    const USD_COP = 4000;

    const handleSelectPlan = async (amountUsd) => {

        // usd a cop
        const amountCop = amountUsd * USD_COP;

        // convertir COP - centavos para wompi
        const priceCents = 32320 * 100;

        try {
            const res = await fetch("http://127.0.0.1:8000/api/accounts/payments/create-checkout/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount_in_cents: priceCents }),
            });
            const data = await res.json();
            if (data.checkout_url) {
                window.open(data.checkout_url, "_blank"); // Redirección a Wompi Checkout
            }
        } catch (err) {
            console.error("❌ Error creando checkout:", err);
        }
    };
    /*Fin de pasarela*/

    const location = useLocation();
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
    const { templateContent, formData } = useTemplate();
    const { user } = useAuth();
    const { message, showError, showInfo, showSuccess, hideMessage } = useMessage();
    const { initiatePayment, isProcessingPayment, paymentError } = useWompiPayment();
    const { mutate: createTemplate, isPending: isCreatingTemplate } = useCreateTemplate()
    const [localTemplateContent, setLocalTemplateContent] = useState(null);

    useEffect(() => {
        if (location.state?.templateContent && !templateContent) {
            console.warn('Template content received via location state instead of context');
            showInfo('Contenido del template recibido desde navegación');
        }
    }, [location.state, templateContent, showInfo]);

    // Load template content from localStorage or sessionStorage as a fallback
    useEffect(() => {
        if (!templateContent) {
            try {
                const stored = sessionStorage.getItem('template_content') || localStorage.getItem('template_content');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setLocalTemplateContent(parsed);
                    showInfo('Contenido del template cargado');
                }
            } catch (err) {
                console.warn('Failed to parse template_content from storage', err);
            }
        } else {
            setLocalTemplateContent(null);
        }
    }, [templateContent, showInfo]);

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
        showInfo(`Plantilla "${template.name}" seleccionada`);
    };

    /*HandleSelec*/


    const handleButtonClick = async () => {
        const effectiveTemplateContent = templateContent || localTemplateContent;

        if (!effectiveTemplateContent) {
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

        try {
            sessionStorage.setItem('selected_template_id', selectedTemplate.id);
            console.log("Id del template a comprar:", selectedTemplate.id);
        } catch (error) {
            console.warn('Could not store selected template in sessionStorage:', error);
        }

        handleOpen();

        /*
        // Initiate payment flow
        const companyName = formData?.company_name || 'Compañía no especificada';

        const webCreationData = {
            ...templateContent,
            client_name: companyName,
            user_id: user.pk,
            repo_url: selectedTemplate.id,
        };

        try {
            showInfo('Creando tu sitio web...');

            createTemplate({
                templateData: webCreationData,
            }, {
                onSuccess: (data) => {
                    console.log('✅ Plantilla de usuario creada con éxito:', data);
                    localStorage.removeItem('template_content');
                    localStorage.removeItem('template_form_data')
                    showSuccess('¡Tu sitio web ha sido creado exitosamente!');
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2500);
                },
                onError: (error) => {
                    console.error('❌ Error al crear la plantilla de usuario:', error);
                    showError(`Error al crear la plantilla: ${error?.detail || error?.message}`);
                }
            });
        } catch (error) {
            console.error('❌ Error al crear la web:', error);
            showError(`${error?.detail || error?.message}`);
        }
        */
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
                                disabled={isProcessingPayment || isCreatingTemplate}
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
                                {isProcessingPayment ? 'Procesando pago...' :
                                    isCreatingTemplate ? 'Creando sitio web...' : 'Crea tu web'}
                            </Button>
                        </Box>

                        <Dialog
                            open={open}
                            onClose={handleclose}
                            maxWidth="sm"
                            fullWidth
                        >
                            <DialogTitle>Elige tu plan</DialogTitle>
                            <DialogContent dividers>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap={3}
                                >
                                    <Box
                                        sx={{
                                            border: "1px solid #ccc",
                                            borderRadius: "8px",
                                            p: 2,
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleSelectPlan(7)}
                                    >
                                        <Typography>Plan Starter - $32,320 COP - Incluye IVA / año</Typography>
                                        {/* Lista de beneficios */}
                                        <List dense>
                                            <ListItem disableGutters>
                                                <ListItemIcon>
                                                    <CheckCircleIcon color="success" fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Incluye subdominio en lomilabs.com" />
                                            </ListItem>

                                            <ListItem disableGutters>
                                                <ListItemIcon>
                                                    <CheckCircleIcon color="success" fontSize="small" />
                                                </ListItemIcon>
                                                <ListItemText primary="Soporte básico" />
                                            </ListItem>
                                        </List>
                                        <Typography
                                            variant="button"
                                            sx={{
                                                mt: 2,
                                                display: "block",
                                                textAlign: "center",
                                                bgcolor: "#8783CA",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                borderRadius: "8px",
                                                px: 2,
                                                py: 1,
                                                transition: "0.3s",
                                                "&:hover": {
                                                    bgcolor: "#6B66B8",
                                                },
                                            }}
                                        >
                                            Comprar
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            border: "1px solid #ccc",
                                            borderRadius: "8px",
                                            p: 2,
                                            cursor: "not-allowed",
                                            opacity: 0.6,
                                            pointerEvents: "none",
                                        }}
                                        onClick={() => handleSelectPlan(19)}
                                    >
                                        <Typography>Plan Pro - $19 USD</Typography>
                                        <Typography
                                            variant='body2'
                                            color='text.secondary'
                                        >
                                            Proximamente
                                        </Typography>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleclose} color='secondary'>
                                    Cerrar
                                </Button>
                            </DialogActions>
                        </Dialog>
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

                        {(templateContent || localTemplateContent) && (
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

                        <ArrowDirection
                            direction="left"
                            onClick={() => navigate(-1)}
                            ariaLabel="Página anterior"
                        />

                        <TemplateSelector
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={handleTemplateChange}
                        />

                        <TemplateRenderer
                            template={selectedTemplate}
                            data={templateContent || localTemplateContent}
                        />
                    </Container>
                </div>
            </div>

            {/* Loading overlay during template creation */}
            {isCreatingTemplate && (
                <LoadingSpinner
                    open={isCreatingTemplate}
                    message="Creando tu sitio web..."
                    submessage="Por favor espera mientras procesamos tu solicitud"
                    variant="overlay"
                    showProgress={true}
                />
            )}

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