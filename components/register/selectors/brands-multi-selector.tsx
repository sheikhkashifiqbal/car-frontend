'use client'


import CustomMultiSelect, {ICustomMultiSelect} from "@/components/app-custom/custom-multi-select";


type  BrandsMultiSelector = Omit<ICustomMultiSelect, 'placeholder' | 'data'>

// data?:  {value: string, label: string}[]

export default function BrandsMultiSelector(
		{
				onChange,
				className,
				value
		}:  BrandsMultiSelector
) {
	const data = [
		{
			value: "bmw",
			label: "Bmw"
		},
		{
			value: "porsche",
			label: "Porsche"
		},
		{
			value: "mercedes",
			label: "Mercedes"
		},
		{
			value: "toyota",
			label: "Toyota"
		},
		{
			value: "ford",
			label: "Ford"
		},
		{
			value: "opel",
			label: "Opel"
		},
	]
	return (
			<CustomMultiSelect
					value={value}
					className={className}
					data={data}
					onChange={onChange}
					placeholder={'Select the brand or brands'}
			/>
	)
}
