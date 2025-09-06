import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { AVAILABLE_TEMPLATES } from '../templateConfig';

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
    const handleChange = (event) => {
        const templateId = event.target.value;
        const template = AVAILABLE_TEMPLATES.find(t => t.id === templateId);
        onTemplateChange(template);
    };

    return (
        <Box className="template-selector" sx={{ minWidth: 300, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                Seleccionar Plantilla
            </Typography>
            <FormControl fullWidth>
                <InputLabel id="template-select-label">Plantilla</InputLabel>
                <Select
                    labelId="template-select-label"
                    id="template-select"
                    value={selectedTemplate?.id || ''}
                    label="Plantilla"
                    onChange={handleChange}
                >
                    {AVAILABLE_TEMPLATES.map((template) => (
                        <MenuItem key={template.id} value={template.id}>
                            <Box>
                                <Typography variant="body1" component="div">
                                    {template.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {template.description}
                                </Typography>
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default TemplateSelector;