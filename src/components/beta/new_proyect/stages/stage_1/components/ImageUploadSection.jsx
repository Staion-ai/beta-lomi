import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import CompanyLogoField from './CompanyLogoField'
import HeroImageField from './HeroImageField'

function ImageUploadSection() {
    return (
        <Box className="form-field image-upload-section">
            <Typography
                variant="h6"
                sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '18px',
                    fontWeight: 500,
                    marginBottom: '1rem',
                    textAlign: 'left'
                }}
            >
                Imágenes de tu empresa
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '14px',
                    marginBottom: '1.5rem',
                    lineHeight: 1.5
                }}
            >
                Sube el logo de tu empresa y una imagen principal para la sección hero de tu sitio web
            </Typography>

            <Grid container spacing={2} className="image-upload-container">
                <Grid item xs={12} md={6}>
                    <CompanyLogoField />
                </Grid>
                <Grid item xs={12} md={6}>
                    <HeroImageField />
                </Grid>
            </Grid>
        </Box>
    )
}

export default ImageUploadSection
