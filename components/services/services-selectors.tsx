import Container from "@/components/Container";
import {Button} from "@/components/ui/button";
import CustomSelect, {CustomSelectItem, CustomSelectLabel} from "@/components/app-custom/custom-select";
import {SelectGroup} from "@/components/ui/select";
import {DatePickerWithRange} from "@/components/app-custom/date-range-picker";
import {CarSelector} from "@/components/services/selectors/car-selector";
import {CarModelSelector} from "@/components/services/selectors/car-model-selector";
import {ServiceSelector} from "@/components/services/selectors/service-selector";
import {CitySelector} from "@/components/services/selectors/city-selector";
import CustomBlueBtn from "@/components/app-custom/CustomBlueBtn";
import {useState} from "react";


interface IServicesSelectors {
	onSearchClicked?: () => void;
}

export default function ServicesSelectors({onSearchClicked}: IServicesSelectors) {
	const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
	const [selectedModel, setSelectedModel] = useState<string>("");
	
	return (
			<div className={'w-full bg-soft-blue py-14'}>
				<Container>
					<div className={'flex flex-col gap-y-10'}>
						<h1 className={'text-charcoal text-[2rem] leading-[3rem] font-semibold'}>
							Need Car Service? <br />
							Find Expert Workshops Near You Now!
						</h1>
						<div className={'w-full flex flex-col 450:flex-row gap-3'}>
							<div className={'grid gap-3 w-full grid-cols-1 450:grid-cols-2 sm:grid-cols-3 xl:grid-cols-5'}>
								              <CarSelector
                onChange={(value) => setSelectedBrandId(Number(value))}
                placeholder="Select brand"
                triggerClassname="border-soft-gray text-misty-gray text-sm italic font-medium"
              />
								
							 <CarModelSelector
                brandId={selectedBrandId}
                value={selectedModel}
                onChange={(value) => setSelectedModel(value)}
                placeholder="Select model"
                triggerClassname="border-soft-gray text-misty-gray text-sm italic font-medium"
              />

								
								<ServiceSelector />
								<DatePickerWithRange />
								<CitySelector />
							</div>
							<CustomBlueBtn onClick={onSearchClicked && onSearchClicked}/>
						</div>
					</div>
				</Container>
			</div>
	)
}
