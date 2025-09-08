import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Alert } from '@mui/material'

const NotificationSnackbar = ({ open, message, severity, onClose }) => {
    // Aumentar el tiempo de auto-hide para mensajes largos o de error/warning
    const getAutoHideDuration = () => {
        if (severity === 'error' || severity === 'warning') {
            return message.length > 100 ? 10000 : 8000
        }
        return 6000
    }

    return (
        <Snackbar
            open={open}
            autoHideDuration={getAutoHideDuration()}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{
                    width: '100%',
                    maxWidth: '500px',
                    whiteSpace: 'pre-line',
                    '& .MuiAlert-message': {
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                    }
                }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

NotificationSnackbar.propTypes = {
    open: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
    onClose: PropTypes.func.isRequired
}

export default NotificationSnackbar
