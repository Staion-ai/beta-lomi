import React from 'react'
import { Box } from '@mui/material'
import {
    CompanyLogoField,
    HeroImageField,
    ColorSelectorField,
    TypographySelectorField,
    SocialNetworkSelectorField,
    SocialNetworkLinksField
} from './components'
import { useSocialNetworksCleaner } from '../../hooks'

function Stage2() {
    useSocialNetworksCleaner()

    return (
        <Box className="stage-container">
            <Box>
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

export default Stage2