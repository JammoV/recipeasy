import Link from 'next/link'
import type { FC } from 'react'

const Logo: FC = () => (
    <Link href="/">
        <a className="font-leckerli text-4xl py-8">Recipeasy</a>
    </Link>
)

export default Logo
