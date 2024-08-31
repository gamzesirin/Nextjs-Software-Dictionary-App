'use client'

import Link from 'next/link'
import React from 'react'
import SearchButton from '@/components/main/SearchButton'
import dictionaryData from '@/app/data/dictionary-data.json'

interface DictionaryItem {
	title: string
	shortDescription: string
}

interface DictionaryItemProps extends DictionaryItem {
	letter: string
}

const DictionaryItem: React.FC<DictionaryItemProps> = ({ title, shortDescription, letter }) => (
	<Link href={`/term/${letter}/${encodeURIComponent(title)}`} passHref>
		<div className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer hover:shadow-lg transition-shadow duration-300">
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-gray-600 text-sm truncate">{shortDescription}</p>
		</div>
	</Link>
)

interface AlphabetSectionProps {
	letter: string
	items: DictionaryItem[]
}

const AlphabetSection: React.FC<AlphabetSectionProps> = ({ letter, items }) => (
	<div id={`section-${letter.toLowerCase()}`} className="mb-8">
		<h2 className="text-4xl font-bold mb-4">{letter}</h2>
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{items.map((item, index) => (
				<DictionaryItem key={index} title={item.title} shortDescription={item.shortDescription} letter={letter} />
			))}
		</div>
	</div>
)

const Dictionary: React.FC = () => {
	const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

	return (
		<div className="container mx-auto px-4 py-8">
			{alphabet.map((letter) => (
				<AlphabetSection
					key={letter}
					letter={letter}
					items={dictionaryData[letter as keyof typeof dictionaryData] || []}
				/>
			))}
		</div>
	)
}

export default Dictionary
