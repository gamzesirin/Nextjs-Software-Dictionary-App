'use client'

import Link from 'next/link'
import React from 'react'
import { Separator } from '@/components/ui/separator'

const Alphabet = () => {
	const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

	return (
		<div className="flex flex-wrap items-center gap-2 p-4 justify-center">
			{letters.map((letter, index) => (
				<React.Fragment key={letter}>
					<Link href={`#section-${letter}`}>
						<span className="text-2xl font-semibold cursor-pointer hover:text-indigo-500 transition-colors">
							{letter.toUpperCase()}
						</span>
					</Link>
					{index < letters.length - 1 && <Separator orientation="vertical" className="h-6" />}
				</React.Fragment>
			))}
		</div>
	)
}

export default Alphabet
