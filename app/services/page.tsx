"use client"
import ServicesSlider from "@/components/services/services-slider";
import ServicesSelectors from "@/components/services/services-selectors";
import Container from "@/components/Container";
import ServicesCards from "@/components/services/ServicesCards";
import * as React from "react";
import ServicesSearchResults from "@/components/services/services-search-results";
import {useState} from "react";
import { Toaster } from 'sonner';



export default function Services() {
	const [showResults,setShowResults] = useState(false);

	function handleSearch() {
		setShowResults(true)
	}
	return (
		<>
			<div className={'min-h-screen bg-light-gray'}>
				<ServicesSlider />
				<ServicesSelectors onSearchClicked={handleSearch}/>
				<section className={'w-full bg-light-gray py-10'}>
					<Container>
						{!showResults && <ServicesCards />}
						{showResults && <ServicesSearchResults />}
					</Container>
				</section>
			</div>
			<Toaster />
		</>
	)
}
