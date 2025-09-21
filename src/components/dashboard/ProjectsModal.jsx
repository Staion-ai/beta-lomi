import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Card,
    CardContent,
    CardActions,
    Grid,
    Chip,
    IconButton,
    Divider,
    CircularProgress,
    Alert
} from '@mui/material'
import {
    Close as CloseIcon,
    Launch as LaunchIcon,
    Language as LanguageIcon,
    Error as ErrorIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material'
import { usePagesUser } from '../../hooks/useGetPagesUser'

const ProjectsModal = ({ open, onClose, userId }) => {
    const { data: pagesData, isLoading, error } = usePagesUser(userId, open)

    const handleVisitPage = (webUrl) => {
        if (webUrl) {
            window.open(webUrl, '_blank', 'noopener,noreferrer')
        }
    }

    // Filtrar solo páginas desplegadas (con URL válida)
    const deployedPages = pagesData ? pagesData.filter(page =>
        page.web_url && page.web_url.trim() !== ''
    ) : []

    const renderContent = () => {
        if (isLoading) {
            return (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    py={4}
                >
                    <CircularProgress size={40} />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        Cargando páginas...
                    </Typography>
                </Box>
            )
        }

        if (error) {
            return (
                <Alert
                    severity="error"
                    sx={{ my: 2 }}
                    icon={<ErrorIcon />}
                >
                    Error al cargar las páginas: {error.message}
                </Alert>
            )
        }

        if (!pagesData || deployedPages.length === 0) {
            return (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    py={6}
                    px={3}
                >
                    <LanguageIcon sx={{ fontSize: 80, color: '#8783CA', mb: 3 }} />
                    <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={500}>
                        No tienes páginas desplegadas
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3, maxWidth: 450 }}>
                        Actualmente no hay páginas web disponibles para mostrar. Las páginas aparecerán aquí una vez que el proceso de despliegue haya finalizado exitosamente.
                    </Typography>
                    <Box sx={{
                        bgcolor: '#F9DCB8',
                        p: 3,
                        borderRadius: 2,
                        border: '1px solid #8783CA',
                        maxWidth: 500
                    }}>
                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: '#8783CA' }}>
                            💡 ¿Qué puedes hacer?
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: '#8783CA' }}>
                            • Crear un nuevo proyecto desde el dashboard
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#8783CA' }}>
                            • Esperar a que tus proyectos en curso terminen de desplegarse
                        </Typography>
                    </Box>
                </Box>
            )
        }

        return (
            <Box>
                {/* Mensaje informativo simplificado */}
                <Alert
                    severity="success"
                    icon={<CheckCircleIcon />}
                    sx={{
                        mb: 3,
                        borderRadius: 2,
                        bgcolor: '#F9DCB8',
                        color: '#8783CA',
                        border: '1px solid #8783CA',
                        '& .MuiAlert-icon': {
                            color: '#8783CA'
                        }
                    }}
                >
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#8783CA' }}>
                        {deployedPages.length === 1
                            ? `Tienes 1 página web desplegada y funcionando`
                            : `Tienes ${deployedPages.length} páginas web desplegadas y funcionando`
                        }
                    </Typography>
                </Alert>

                <Grid container spacing={3}>
                    {deployedPages.map((page, index) => (
                        <Grid item xs={12} sm={6} lg={4} key={`deployed-${index}`}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        elevation: 8,
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 25px rgba(135, 131, 202, 0.15)',
                                        '& .launch-button': {
                                            bgcolor: '#6e6ab3'
                                        }
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    {/* Header del proyecto */}
                                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                                        <Box display="flex" alignItems="center" flex={1} mr={1}>
                                            <Box
                                                sx={{
                                                    p: 1,
                                                    borderRadius: 2,
                                                    bgcolor: '#8783CA',
                                                    color: 'white',
                                                    mr: 2
                                                }}
                                            >
                                                <LanguageIcon sx={{ fontSize: 20 }} />
                                            </Box>
                                            <Box flex={1}>
                                                <Typography
                                                    variant="h6"
                                                    component="h3"
                                                    sx={{
                                                        fontWeight: 600,
                                                        fontSize: '1.1rem',
                                                        lineHeight: 1.2,
                                                        mb: 0.5,
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}
                                                >
                                                    {page.name_project || 'Proyecto sin nombre'}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label="Activo"
                                            size="small"
                                            sx={{
                                                fontWeight: 600,
                                                bgcolor: '#F9DCB8',
                                                color: '#8783CA',
                                                border: '1px solid #8783CA'
                                            }}
                                        />
                                    </Box>

                                    {/* URL del proyecto */}
                                    <Box
                                        sx={{
                                            bgcolor: '#F9DCB8',
                                            p: 2,
                                            borderRadius: 1.5,
                                            border: '1px solid #8783CA'
                                        }}
                                    >
                                        <Typography variant="caption" color="#8783CA" sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}>
                                            URL del sitio web:
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: '#8783CA',
                                                fontFamily: 'monospace',
                                                fontSize: '0.85rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontWeight: 600
                                            }}
                                        >
                                            {page.web_url}
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <CardActions sx={{ p: 3, pt: 0 }}>
                                    <Button
                                        className="launch-button"
                                        variant="contained"
                                        size="medium"
                                        startIcon={<LaunchIcon />}
                                        onClick={() => handleVisitPage(page.web_url)}
                                        fullWidth
                                        sx={{
                                            textTransform: 'none',
                                            borderRadius: 2,
                                            py: 1.2,
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            transition: 'all 0.2s ease',
                                            bgcolor: '#8783CA',
                                            color: 'white',
                                            '&:hover': {
                                                bgcolor: '#6e6ab3',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 12px rgba(135, 131, 202, 0.3)'
                                            }
                                        }}
                                    >
                                        Abrir sitio web
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    bgcolor: 'background.paper'
                }
            }}
        >
            <DialogTitle
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pb: 2,
                    px: 3,
                    pt: 3
                }}
            >
                <Box>
                    <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 0.5 }}>
                        Mis Sitios Web
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Páginas desplegadas y funcionando
                    </Typography>
                </Box>
                <IconButton
                    onClick={onClose}
                    sx={{
                        color: '#8783CA',
                        bgcolor: '#F9DCB8',
                        border: '1px solid #8783CA',
                        '&:hover': {
                            bgcolor: '#f0d1a8',
                            transform: 'scale(1.05)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ py: 3 }}>
                {renderContent()}
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{
                        textTransform: 'none',
                        borderRadius: 2,
                        minWidth: 100,
                        borderColor: '#8783CA',
                        color: '#8783CA',
                        '&:hover': {
                            borderColor: '#6e6ab3',
                            bgcolor: '#F9DCB8',
                            color: '#6e6ab3'
                        }
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectsModal
