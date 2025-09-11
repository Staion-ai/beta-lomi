import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Alert, Button } from '@mui/material';
import TemplateSelector from '../components/beta/preview/components/TemplateSelector';
import TemplateRenderer from '../components/beta/preview/components/TemplateRenderer';
import { DEFAULT_TEMPLATE } from '../components/beta/preview/templateConfig';
import { useTemplate } from '../contexts/TemplateContext';
import { useAuth } from '../contexts/useAuth';
import AuthHeader from '../components/auth/AuthHeader';
import MessageSnackbar from '../components/common/MessageSnackBar';
import { useMessage } from '../hooks/useMessage';
import '../components/beta/preview/styles/Preview.css';
import { useCreateTemplate } from '../hooks/useCreateTemplate';
import { getAccessToken } from '../lib/tokenStorage';

function Preview() {
    const location = useLocation();
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
    const { templateContent, formData } = useTemplate();
    const { user, getToken } = useAuth();
    const { message, showError, showSuccess, showInfo, hideMessage } = useMessage();

    const { mutateAsync: createTemplate } = useCreateTemplate();

    const navigate = useNavigate()

    useEffect(() => {
        if (location.state?.templateContent && !templateContent) {
            console.warn('Template content received via location state instead of context');
            showInfo('Contenido del template recibido desde navegación');
        }
    }, [location.state, templateContent]);

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

        const companyName = formData?.company_name || 'Compañía no especificada';

        const webCreationData = {
            ...templateContent,
            client_name: companyName,
            user_id: user.pk,
            repo_url: selectedTemplate.id,
        };

        try {
            showInfo('Creando tu sitio web...');

            await createTemplate({
                templateData: webCreationData,
                token: getToken()
            }, {
                onError: (error) => {
                    console.error('❌ Error al crear la plantilla de usuario:', error);
                    showError(`Error al crear la plantilla: ${error?.detail || error?.message}`);
                }
            }
            );

            showSuccess('¡Tu sitio web ha sido creado exitosamente!');
            navigate('/dashboard');
        } catch (error) {
            console.error('❌ Error al crear la web:', error);
            showError(`${error?.detail || error?.message}`);
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
                                    }
                                }}
                            >
                                Crea tu web
                            </Button>
                        </Box>
                    </Container>
                </div>

                <div className="preview-content">
                    <Container maxWidth="lg">
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