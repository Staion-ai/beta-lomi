import React from 'react'
import { Box } from '@mui/material'
import {
  StageHeader,
  CompanyNameField,
  CompanyDescriptionField,
  ColorSelectorField,
  TypographySelectorField,
  SocialNetworkSelectorField
} from './components'
import { stage1Config } from './constants/stage1Constants'

function Stage1() {
  return (
    <Box className="stage-container">
      <StageHeader
        title={stage1Config.title}
        description={stage1Config.description}
      />

      <Box>
        <CompanyNameField />
        <CompanyDescriptionField />
        <ColorSelectorField />
        <TypographySelectorField />
        <SocialNetworkSelectorField />
      </Box>
    </Box>
  )
}

export default Stage1