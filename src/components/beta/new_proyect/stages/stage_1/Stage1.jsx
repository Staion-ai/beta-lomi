import React from 'react'
import { Box } from '@mui/material'
import {
  StageHeader,
  CompanyNameField,
  CompanyDescriptionField,
  CompanyLogoField,
  HeroImageField,
  ColorSelectorField,
  TypographySelectorField,
  SocialNetworkSelectorField,
  SocialNetworkLinksField
} from './components'
import { stage1Config } from './constants/stage1Constants'
import { useSocialNetworksCleaner } from '../../hooks'

function Stage1() {
  useSocialNetworksCleaner()

  return (
    <Box className="stage-container">
      <StageHeader
        title={stage1Config.title}
        description={stage1Config.description}
      />

      <Box>
        <CompanyNameField />
        <CompanyDescriptionField />
        <CompanyLogoField />
        <HeroImageField />
        <ColorSelectorField />
        <TypographySelectorField />
        <SocialNetworkSelectorField />
        <SocialNetworkLinksField />
      </Box>
    </Box>
  )
}

export default Stage1