import React from 'react'
import { Grid, Typography } from '@mui/material'
import ClientCard from './ClientCard'

function ClientsList({
    fields,
    expandedItems,
    onToggleExpand,
    onRemoveClient,
    errors,
    updateStageFiles
}) {
    if (fields.length === 0) {
        return (
            <Typography sx={{
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                fontStyle: 'italic',
                marginBottom: '1rem'
            }}>
                Aún no has agregado clientes
            </Typography>
        )
    }

    return (
        <Grid container spacing={3} sx={{ marginBottom: '2rem' }}>
            {fields.map((field, index) => (
                <Grid item xs={12} lg={6} key={field.id}>
                    <ClientCard
                        index={index}
                        isExpanded={expandedItems[index]}
                        onToggleExpand={onToggleExpand}
                        onRemove={onRemoveClient}
                        hasError={!!errors.testimonials?.[index]?.clientName}
                        updateStageFiles={updateStageFiles}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ClientsList
