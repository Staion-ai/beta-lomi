import React from 'react'
import { Box, Typography } from '@mui/material'

function StageHeader({ title, description }) {
    return (
        <>
            <Typography variant="h4" component="h2" className="stage-title">
                {title}
            </Typography>
            <Typography variant="body1" className="stage-description">
                {description}
            </Typography>
        </>
    )
}

export default StageHeader
