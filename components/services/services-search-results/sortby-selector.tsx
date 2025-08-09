'use client'
import {SelectGroup} from "@/components/ui/select";
import CustomSelect, {CustomSelectItem} from "@/components/app-custom/custom-select";
import * as React from "react";
import {useState} from "react";
import {cn} from "@/lib/utils";


interface ISortbySelector {
	placeholder?: string
	triggerClassname?: string
	onChange?: (value: string) => void
}

export default function SortbySelector(
		{
			placeholder = 'Select sort by',
			triggerClassname,
			onChange
		}: ISortbySelector
) {
	const values = [
		{
			id: 0,
			value: 'rating',
			text: 'Rating'
		},
		{
			id: 1,
			value: 'price',
			text: 'Price'
		}
	]
	const [value,setValue] = useState<string | undefined>(values[0].value)
	return (
			<CustomSelect
					value={value}
					triggerClassname={cn('bg-soft-gray text-sm font-medium text-dark-gray', triggerClassname)}
					placeholder={placeholder}
					onChange={(value) => {
						setValue(value)
						onChange && onChange(value)
					}}
			>
				<div className={'p-5 flex flex-col gap-y-3'}>
					<SelectGroup>
						{values.map((C) => {
							return (
									<CustomSelectItem key={C.id} value={C.value}>
										{C.text}
									</CustomSelectItem>
							)
						})}
					</SelectGroup>
				</div>
			</CustomSelect>
	)
}
