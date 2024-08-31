'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import dictionaryData from '@/app/data/dictionary-data.json'

interface SearchResult {
	title: string
	shortDescription: string
	letter: string
}

export default function SearchButton() {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [searchResults, setSearchResults] = useState<SearchResult[]>([])

	useEffect(() => {
		if (searchTerm.length > 0) {
			const results: SearchResult[] = []
			Object.entries(dictionaryData).forEach(([letter, items]) => {
				items.forEach((item) => {
					if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
						results.push({ ...item, letter })
					}
				})
			})
			setSearchResults(results.slice(0, 5)) // Limit to 5 results for better performance
		} else {
			setSearchResults([])
		}
	}, [searchTerm])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const handleClear = () => {
		setSearchTerm('')
		setSearchResults([])
	}

	return (
		<div className="relative w-full max-w-md">
			<style jsx global>{`
				.no-focus-outline:focus {
					outline: none !important;
					box-shadow: none !important;
					border-color: transparent !important;
				}
			`}</style>
			<div className="relative">
				<Input
					type="text"
					placeholder="Sözlükte arama yapın..."
					value={searchTerm}
					onChange={handleSearch}
					className="w-full rounded-md bg-background pl-10 pr-12 no-focus-outline"
				/>
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<SearchIcon className="w-5 h-5 text-muted-foreground" />
				</div>
				{searchTerm && (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="absolute inset-y-0 right-0 pr-3"
						onClick={handleClear}
					>
						<XIcon className="w-5 h-5 text-muted-foreground" />
					</Button>
				)}
			</div>
			{searchResults.length > 0 && (
				<div className="absolute z-10 w-full mt-2 overflow-hidden bg-background rounded-md">
					<ul className="py-1">
						{searchResults.map((result, index) => (
							<li key={index}>
								<Link
									href={`/term/${result.letter}/${encodeURIComponent(result.title)}`}
									className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
									prefetch={false}
								>
									<div className="font-semibold">{result.title}</div>
									<div className="text-xs text-muted-foreground truncate">{result.shortDescription}</div>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
			{searchTerm && searchResults.length === 0 && (
				<div className="absolute z-10 w-full mt-2 p-2 bg-background rounded-md text-sm text-muted-foreground">
					Sonuç bulunamadı.
				</div>
			)}
		</div>
	)
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	)
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	)
}
