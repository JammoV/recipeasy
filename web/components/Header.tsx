import React from 'react'
import { Typography } from '@mui/material'

const Header: React.VFC = () => (
    <Typography 
        align='center' 
        variant='body1'
        sx={{
            fontSize: '4rem',
            fontFamily: ['Neuton', 'serif'].join(','),
            marginTop: '1rem',
            marginBottom: '1rem'
        }}
    >
        Recipeasy
    </Typography>
)

export default Header