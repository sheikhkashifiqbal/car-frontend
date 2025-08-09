'use client'
import {useState} from "react";
import MinusIcon from '@/assets/icons/register/MinusIcon.svg'
import PlusIcon from '@/assets/icons/register/PlusIcon.svg'


interface IBoxQuantitySelector {
	onChange: (value: number) => void
	value: number
}

export default function BoxQuantitySelector({
		onChange,
		value
																						}: IBoxQuantitySelector) {
	return (
			<div className={'h-14 max-w-[144px] flex items-center justify-between bg-white border border-soft-gray py-3 px-4 rounded-[12px]'}>
				<div
						className={'cursor-pointer size-6 flex items-center justify-center'}
						onClick={() => {
							if(value > 1) {
								onChange(value - 1)
							}
						}}
				>
					<img src={MinusIcon.src}/>
				</div>
				<div className={'flex items-center justify-center size-8 h-6 text-charcoal text-base font-medium'}>
					{value}
				</div>
				<div
						className={'cursor-pointer size-6 flex items-center justify-center'}
						onClick={() => {
							onChange(value + 1)
						}}
				>
					<img src={PlusIcon.src}/>
				</div>
			</div>
	)
}
