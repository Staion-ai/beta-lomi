import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar, Alert } from '@mui/material'

const NotificationSnackbar = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
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
