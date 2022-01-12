import React from 'react'
import { Box } from '@mui/material'
import Link from 'next/link'

const menuItems = [
    {
        label: 'Home',
        path: '/'
    },
    {
        label: 'Recepten',
        path: '/recepten'
    }
];

const Menu: React.VFC = () => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTop: 'solid 1px #999999',
        borderBottom: 'solid 1px #999999',
    }}>
        {
            menuItems.map((item, i: number) => (
                <Box key={i} sx={{
                    p: 1,
                    fontSize: '1.2rem',
                    textDecoration: 'none'
                }}>
                <Link href={item.path}>
                    {item.label}
                </Link>
                </Box>
            ))
        }
    </Box>
)

export default Menu