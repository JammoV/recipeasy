import type { FC, ReactNode } from 'react'

import Logo from '@/atoms/Logo'
import Menu from '@/molecules/Menu'

interface LayoutGenericProps {
    children: ReactNode
}

const GenericTemplate: FC<LayoutGenericProps> = ({ children }) => (
    <div className="flex flex-col container mx-auto px-4">
        <Logo />
        <Menu />
        <div>{children}</div>
    </div>
)

export default GenericTemplate
