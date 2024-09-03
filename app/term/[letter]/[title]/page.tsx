'use client'

import Image from 'next/image'
import Link from 'next/link'
import dictionaryData from '@/app/data/dictionary-data.json'
import { useParams } from 'next/navigation'

interface DictionaryItem {
	title: string
	shortDescription: string
	image: string
	fullDescription: string
	relatedTerms?: string[]
}

type DictionaryData = {
	[key: string]: DictionaryItem[]
}

const typedDictionaryData = dictionaryData as unknown as DictionaryData

export default function TermDetail() {
	const params = useParams()
	const letter = params.letter as string
	const title = params.title as string

	const term = typedDictionaryData[letter.toUpperCase()]?.find(
		(item) => item.title.toLowerCase() === decodeURIComponent(title).toLowerCase()
	)

	if (!term) {
		return <div>Term not found</div>
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
				&larr; Geri Dön
			</Link>
			<h1 className="text-4xl font-bold mb-4">{term.title}</h1>
			<p className="text-xl">{term.shortDescription}</p>
			<Image src={term.image} alt={term.title} width={500} height={300} className="mt-4" />
			<p className="text-gray-600 mt-4">{term.fullDescription}</p>
			{term.relatedTerms && term.relatedTerms.length > 0 && (
				<div className="mt-8">
					<h2 className="text-2xl font-bold mb-4">İlgili Terimler</h2>
					<ul>
						{term.relatedTerms.map((relatedTerm, index) => (
							<li key={index} className="text-blue-500 hover:underline">
								<Link href="#">{relatedTerm}</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}
