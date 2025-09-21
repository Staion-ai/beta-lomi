import React from 'react'
import { Box } from '@mui/material'
import {
  StageHeader,
  ClientsList,
  AddClientButton,
  EmptyStateMessage,
  useClientsManager
} from './components'

function Stage4({ updateStageFiles }) {
  const {
    fields,
    errors,
    expandedItems,
    addClient,
    removeClient,
    toggleExpand
  } = useClientsManager()

  return (
    <Box className="stage-container">
      <StageHeader />

      <Box>
        <ClientsList
          fields={fields}
          expandedItems={expandedItems}
          onToggleExpand={toggleExpand}
          onRemoveClient={removeClient}
          errors={errors}
          updateStageFiles={updateStageFiles}
        />

        <AddClientButton
          clientsCount={fields.length}
          onAddClient={addClient}
          maxClients={4}
        />

        <EmptyStateMessage show={fields.length === 0} />
      </Box>
    </Box>
  )
}

export default Stage4