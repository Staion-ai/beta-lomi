import React from 'react'
import { Typography } from '@mui/material'

function StageHeader() {
    return (
        <>
            <Typography variant="h4" component="h2" className="stage-title">
                Clientes
            </Typography>
            <Typography variant="body1" className="stage-description">
                Agrega hasta 4 clientes para mostrar en tu portafolio
            </Typography>
        </>
    )
}

export default StageHeader
