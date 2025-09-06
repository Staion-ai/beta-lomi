import { useState, useEffect, Suspense } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';

const TemplateRenderer = ({ template }) => {
    const [Component, setComponent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!template) {
            setComponent(null);
            return;
        }

        const loadTemplate = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const module = await template.component();
                setComponent(() => module.default);
            } catch (err) {
                console.error('Error loading template:', err);
                setError('Error cargando la plantilla');
            } finally {
                setLoading(false);
            }
        };

        loadTemplate();
    }, [template]);

    if (loading) {
        return (
            <Box 
                className="template-loading" 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                minHeight="200px"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box className="template-error" sx={{ mt: 2 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!Component) {
        return (
            <Box className="template-placeholder" sx={{ mt: 2 }}>
                <Alert severity="info">Selecciona una plantilla para ver la vista previa</Alert>
            </Box>
        );
    }

    return (
        <Box className="template-container">
            <Suspense fallback={
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            }>
                <Component />
            </Suspense>
        </Box>
    );
};

export default TemplateRenderer;