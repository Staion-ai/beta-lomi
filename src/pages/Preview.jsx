import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Backdrop, CircularProgress,
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
import { base_auth_url } from '../constants';

function Preview() {

    /*Pasarela de pago mediante modal*/
    const [open, setOpen] = useState(false);
    const { getToken } = useAuth();
    const handleOpen = () => setOpen(true);
    const handleclose = () => setOpen(false);

    const [loading, setLoading] = useState(false);

    const USD_COP = 4000;

    const handleSelectPlan = async (amountUsd) => {

        // usd a cop
        const amountCop = amountUsd * USD_COP;

        // convertir COP - centavos para wompi
        const priceCents = 32320 * 100;

        try {
            const res = await fetch(`${base_auth_url}/api/v1/payments/create-checkout/`, {
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
                const stored = sessionStorage.getItem('template_form_data') || localStorage.getItem('template_form_data');
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


    /*
    const handleButtonClick = async () => {
        const effectiveTemplateContent = templateContent || localTemplateContent;

        if (!effectiveTemplateContent) {
            showError('Debes completar el formulario primero para generar el contenido del template.');
            return;
        }

        if (!user?.email) {
            showError('Usuario no autenticado correctamente.');
            return;
        }

        if (!formData?.company_name) {
            showError('No se pudo obtener el nombre de la empresa del formulario.');
            return;
        }

        try {
            // Guardar id numérico en sessionStorage
            const templateId = selectedTemplate.id; // ✅ Aseguramos número
            console.log('Selected template ID:', selectedTemplate);
            console.log('Selected template ID (number):', templateId);
            sessionStorage.setItem('selected_template_id', templateId);
            
            const companyName = formData.company_name || 'Compañía no especificada';

            showInfo('Creando checkout...');

            const response = await fetch(`${base_auth_url}/api/v1/payments/create-checkout/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    ...effectiveTemplateContent,
                    amount: 32320,
                    currency: "COP",
                    email: user.email,
                    company_name: companyName,
                    template_id: templateId,                    
                    user_id: user.pk
                })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = data.checkout_url; // Redirige al checkout
            } else {
                showError(data.error || "Error creando el checkout");
            }
        } catch (error) {
            console.error("❌ Error creando checkout:", error);
            showError("Error al crear el checkout. Inténtalo de nuevo.");
        }
    };
    */

    /* CREACION DE WEB SIN PAGO */
    const handleButtonClick = async () => {
        const effectiveTemplateContent = templateContent || localTemplateContent;

        if (!effectiveTemplateContent) {
            showError("Debes completar el formulario primero para generar el contenido del template.");
            return;
        }

        if (!user?.email) {
            showError("Usuario no autenticado correctamente.");
            return;
        }

        if (!formData?.company_name) {
            showError("No se pudo obtener el nombre de la empresa del formulario.");
            return;
        }

        try {

            setLoading(true);

            const templateId = selectedTemplate.id;
            const companyName = formData.company_name || "Compañía no especificada";

            sessionStorage.setItem("selected_template_id", templateId);
            showInfo("Creando tu sitio web...");

            const response = await fetch(`${base_auth_url}/api/v1/user-templates/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },
                body: JSON.stringify({
                    ...effectiveTemplateContent,
                    user_id: user.pk,
                    repo_url: templateId,
                    client_name: companyName,
                })
            });

            const data = await response.json();

            if (response.ok) {
                showSuccess("Sitio creado correctamente 🎉");
                console.log("✅ UserTemplate creado:", data);
                localStorage.removeItem('template_form_data');
                // si querés redirigir:
                window.location.href = `/dashboard`;
            } else {
                showError(data.detail || "Error al crear el sitio web");
                console.error("❌ Error en creación:", data);
            }
        } catch (error) {
            console.error("❌ Error creando sitio:", error);
            showError("Error al crear el sitio. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };
    /* */

    return (
        <>
            <AuthHeader title="Preview - Vista de Plantillas" showBackButton={true} />
            <div className="preview-container">
                <div className="preview-header">
                    <Container maxWidth="lg">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography variant="h4" component="h1" color='#000' gutterBottom>
                                    Vista previa de plantillas
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
                                {isCreatingTemplate ? "Creando sitio web..." : "Crea tu web"}
                                {/* {isProcessingPayment ? 'Procesando pago...' :
                                    isCreatingTemplate ? 'Creando sitio web...' : 'Crea tu web'}
                                */}
                            </Button>
                            <Backdrop
                                sx={{
                                    color: "#fff",
                                    zIndex: (theme) => theme.zIndex.drawer + 1,
                                    flexDirection: "column",
                                }}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                                <Typography variant="h6" sx={{ mt: 2 }}>
                                    🚀 Creando tu web, por favor espera...
                                </Typography>
                            </Backdrop>
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