import React from 'react'
import SearchButton from './SearchButton'

const Header = () => {
	return (
		<>
			<div className="text-center flex flex-col items-center justify-center gap-2 h-[400px] bg-indigo-200">
				<h1 className="text-3xl font-bold text-blue-800">Yazılım Sözlüğüne Hoş Geldin!</h1>
				<p className="font-semibold">
					A’dan Z’ye tüm teknoloji terimlerinin tanımlarını senin için <br /> hazırladığımız teknoloji sözlüğünde
					bulabilirsin!
				</p>
				<SearchButton />
			</div>
		</>
	)
}

export default Header
