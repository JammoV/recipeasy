import Link from 'next/link'
import type { FC } from 'react'

const menuItems = [
    {
        id: 1,
        label: 'Home',
        path: '/',
    },
    {
        id: 2,
        label: 'Recepten',
        path: '/recepten',
    },
]

const Menu: FC = () => (
    <div className="flex flex-row border-b border-gray-400 py-2">
        {menuItems.map((item) => (
            <div className="text-sm pr-1" key={item.id}>
                <Link href={item.path}>{item.label}</Link>
            </div>
        ))}
    </div>
)

export default Menu
