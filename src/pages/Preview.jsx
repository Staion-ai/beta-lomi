import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import TemplateSelector from './Preview/components/TemplateSelector';
import TemplateRenderer from './Preview/components/TemplateRenderer';
import { DEFAULT_TEMPLATE } from './Preview/templateConfig';
import './Preview/styles/Preview.css';

function Preview() {
    const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE);

    const handleTemplateChange = (template) => {
        setSelectedTemplate(template);
    };

    return (
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
                    <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        onTemplateChange={handleTemplateChange}
                    />
                    
                    <TemplateRenderer template={selectedTemplate} />
                </Container>
            </div>
        </div>
    );
}

export default Preview;
