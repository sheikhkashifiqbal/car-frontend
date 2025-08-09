'use client'
import Container from "@/components/Container";
import CustomInput from "@/components/app-custom/custom-input";
import {ServiceSelector} from "@/components/services/selectors/service-selector";
import {CitySelector} from "@/components/services/selectors/city-selector";
import {Button} from "@/components/ui/button";
import PlusIcon from '@/assets/icons/spare-parts/PlusIcon.svg'
import CustomBlueBtn from "@/components/app-custom/CustomBlueBtn";


interface ISparePartsSearchSelectors {
	onSearchClick?: () => void
}

export default function SparePartsSearchSelectors({onSearchClick}: ISparePartsSearchSelectors) {
	return (
			<div className={'w-full bg-soft-blue pt-14 pb-24'}>
				<Container>
					<div className={'flex flex-col gap-y-2'}>
						<h1 className={'text-[2rem] leading-[3rem] text-charcoal font-semibold'}>
							Need Car Spare parts? <br />
							Find Top Suppliers Near You Now!
						</h1>
						<div className={'flex flex-col gap-3'}>
							<div className={'grid grid-cols-1 450:grid-cols-2 900:grid-cols-4 gap-3'}>
								<CustomInput className={'pl-5 rounded-[8px] text-base placeholder:text-charcoal '} placeholder={'VIN number'} value={''} />
								<ServiceSelector />
								<ServiceSelector />
								<CitySelector />
							</div>
							<div className={'flex gap-3'}>
								<Button className={'flex flex-[0.8] py-3 px-4 items-center justify-center gap-x-3 bg-white/40 border rounded-[8px] border-white text-slate-gray text-base font-medium'}>
									<img className={''} src={PlusIcon.src}/>
									Add new spare part
								</Button>
								<CustomBlueBtn onClick={onSearchClick} className={'flex-[0.2]'}/>
							</div>
						</div>
					</div>
				</Container>
			</div>
	)
}
