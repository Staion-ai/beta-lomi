import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box, Alert } from '@mui/material';
import TemplateSelector from '../components/beta/preview/components/TemplateSelector';
import TemplateRenderer from '../components/beta/preview/components/TemplateRenderer';
import { DEFAULT_TEMPLATE } from '../components/beta/preview/templateConfig';
import { useTemplate } from '../contexts/TemplateContext';
import AuthHeader from '../components/auth/AuthHeader';
import '../components/beta/preview/styles/Preview.css';

function Preview() {
    const location = useLocation();
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);
    const { templateContent } = useTemplate();

    console.log('Template content from context:', templateContent);

    useEffect(() => {
        // Check if template content was passed from form completion (fallback)
        if (location.state?.templateContent && !templateContent) {
            // This is a fallback in case the context was not used
            console.warn('Template content received via location state instead of context');
        }
    }, [location.state, templateContent]);

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
    };

    return (
        <>
            <AuthHeader title="Preview - Vista de Plantillas" />
            <div className="preview-container">
                <div className="preview-header">
                    <Container maxWidth="lg">
                        <Typography variant="h4" component="h1" gutterBottom>
                            Vista Previa de Plantillas
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Selecciona una plantilla para ver cómo se ve tu proyecto.
                        </Typography>
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
                                ¡Excelente! Tu proyecto "{templateContent.company_name}" ha sido procesado correctamente.
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
        </>
    );
}

export default Preview;
