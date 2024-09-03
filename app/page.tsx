'use client'

import Alphabet from '@/components/main/Alphabet'
import Dictionary from '@/components/main/Dictionary'
import Header from '@/components/main/Header'

export default function Home() {
	return (
		<>
			{/* header */}
			<Header />
			{/* alphabet */}
			<Alphabet />
			{/* dictionary */}
			<Dictionary />
		</>
	)
}
