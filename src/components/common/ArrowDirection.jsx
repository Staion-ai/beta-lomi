import React from 'react';
import { IconButton, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled component para el contenedor de la flecha
const ArrowContainer = styled(Box)(({ theme, direction }) => ({
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
    ...(direction === 'left' && {
        left: theme.spacing(2),
    }),
    ...(direction === 'right' && {
        right: theme.spacing(2),
    }),
}));

// Styled component para el botón de la flecha
const StyledArrowButton = styled(IconButton)(({ theme, direction }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[4],
    transition: 'all 0.3s ease-in-out',

    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.1)',
        boxShadow: theme.shadows[8],
    },

    '&:active': {
        transform: 'scale(0.95)',
    },

    // Animación específica según la dirección
    ...(direction === 'left' && {
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.1) translateX(-4px)',
            boxShadow: theme.shadows[8],
        },
    }),

    ...(direction === 'right' && {
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            transform: 'scale(1.1) translateX(4px)',
            boxShadow: theme.shadows[8],
        },
    }),

    // Responsive design
    [theme.breakpoints.down('sm')]: {
        width: 48,
        height: 48,
    },

    [theme.breakpoints.down('xs')]: {
        width: 40,
        height: 40,
    },
}));

/**
 * Componente reutilizable para flechas de navegación
 * 
 * @param {Object} props - Propiedades del componente
 * @param {'left' | 'right'} props.direction - Dirección de la flecha ('left' para atrás, 'right' para adelante)
 * @param {Function} props.onClick - Función a ejecutar cuando se hace clic en la flecha
 * @param {boolean} props.visible - Controla la visibilidad del componente (opcional, por defecto true)
 * @param {string} props.ariaLabel - Label para accesibilidad (opcional)
 * @param {boolean} props.disabled - Deshabilita el botón (opcional, por defecto false)
 * @param {Object} props.sx - Estilos adicionales de Material-UI (opcional)
 */
const ArrowDirection = ({
    direction = 'right',
    onClick,
    visible = true,
    ariaLabel,
    disabled = false,
    sx = {},
    ...props
}) => {
    // Validación de props
    if (!onClick || typeof onClick !== 'function') {
        console.warn('ArrowDirection: onClick prop is required and must be a function');
        return null;
    }

    if (!['left', 'right'].includes(direction)) {
        console.warn('ArrowDirection: direction prop must be either "left" or "right"');
        return null;
    }

    // No renderizar si no es visible
    if (!visible) {
        return null;
    }

    // Determinar el ícono y el aria-label por defecto
    const Icon = direction === 'left' ? ArrowBack : ArrowForward;
    const defaultAriaLabel = direction === 'left' ? 'Ir hacia atrás' : 'Ir hacia adelante';

    return (
        <ArrowContainer
            direction={direction}
            sx={sx}
            {...props}
        >
            <StyledArrowButton
                direction={direction}
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel || defaultAriaLabel}
                size="large"
            >
                <Icon fontSize="large" />
            </StyledArrowButton>
        </ArrowContainer>
    );
};

export default ArrowDirection;
