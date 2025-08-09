"use client"
import {memo, useEffect, useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";

import ServiceRegistrationStep1 from "@/components/register/service-register/service-registration-step-1";
import ServiceRegistrationHeader from "@/components/register/service-register/service-registration-header";
import ServiceRegistrationBottomButtons
	from "@/components/register/service-register/service-registration-bottom-buttons";
import ServiceRegistrationStep2 from "@/components/register/service-register/service-registration-step-2";
import ServiceRegistrationStep3 from "@/components/register/service-register/service-registration-step-3";
import StoreRegistrationStep2 from "@/components/register/store-register/store-registration-step-2";


interface IStoreRegistrationFull {
	closeFormAndGoBack: () => void
	openPopup: () => void
}

function StoreRegistrationFull({closeFormAndGoBack, openPopup}: IStoreRegistrationFull) {

	const [step,setStep] = useState<1 | 2 | 3>(1);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [step]);


	const fileSchema = z
			.instanceof(File, {message: 'Not a valid file format!'})
			.refine((file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type), {
				message: "Only JPEG, JPG and PNG files are allowed",
			})
			.refine((file) => file.size <= 2 * 1024 * 1024, {
				message: "File size must be less than 2MB",
			});


	const storeBranchInfoSchema = z.object({
		category: z.string({required_error: "Select the category"}),
		carBrands: z.array(z.string({required_error: "Select at least 1 car brand"}), {required_error: "Select at least 1 car brand"}).min(1, {message: "Select at least 1 car brand"}),
		state: z.array(z.string({required_error: 'state is required'}), {required_error: "state is required"}).min(1, {message: "Select at least 1 state"})
	})


	const storeBranchFormSchema = z.object({
		name: z.string({required_error: 'branch name is required'}).min(3, "branch name must be at least 3 characters"),
		code: z.string({required_error: 'branch code is required'}).min(3, "branch code must be at least 3 characters"),
		managerName: z.string({required_error: 'manager name is required'}).min(3, "manager name must be at least 3 characters"),
		managerSurname: z.string({required_error: 'manager surname is required'}).min(3, "manager surname must be at least 3 characters"),
		address: z.string({required_error: 'address is required'}).min(3, "address must be at least 3 characters"),
		location: z.string({required_error: 'location is required'}).min(3, "location must be at least 3 characters"),
		workDays: z.array(z.string({required_error: "Select work days"}), {required_error: "Select work days"}).min(1, {message: "Select at least 1 work day"}).max(7),
		workHours: z.array(z.string({required_error: "Select work hours"}), {required_error: "Select work hours"}).length(2, {message: "Select work hours"}),
		email: z.string({required_error: 'email is required'}).email('provide a valid email address'),
		password: z.string({required_error: 'password is required'}).min(8, 'password must be at least 8 characters'),
		repeatPassword: z.string({required_error: 'repeat password is required'}),
		logo: fileSchema,
		cover: fileSchema,
		info: z.array(storeBranchInfoSchema).min(1, {message: "Provide at least 1 info"})
	}).refine((data) => data.password === data.repeatPassword, {
		message: 'Passwords do not match',
		path: ['repeatPassword'], // This ensures the error is attached to the `repeatPassword` field
	}).refine((data) => data.workHours[0] < data.workHours[1], {
		message: "Start time must be before end time",
		path: ['workHours'],
	});


	const storeRegistrationFormSchema = z.object({
		companyName: z.string({required_error: 'company name is required'}).min(3, "company name must be at least 3 characters"),
		brandName: z.string({required_error: 'brand name is required'}).min(3, "brand name must be at least 3 characters"),
		taxId: z.string({required_error: 'tax id is required'}).min(3, "tax id must be at least 3 characters"),
		managerName: z.string({required_error: 'manager name is required'}).min(3, "manager name must be at least 3 characters"),
		managerSurname: z.string({required_error: 'manager surname is required'}).min(3, "manager surname must be at least 3 characters"),
		managerStationaryPhone: z.string({required_error: 'stationary phone is required'}).min(3, "stationary phone must be at least 3 characters"),
		managerMobileNumber: z.string({required_error: 'mobile number is required'}).min(3, "mobile number must be at least 3 characters"),
		email: z.string({required_error: 'email is required'}).email('provide a valid email address'),
		website: z.string({required_error: 'website is required'}).min(3, "website must be at least 3 characters"),
		password: z.string({required_error: 'password is required'}).min(8, 'password must be at least 8 characters'),
		repeatPassword: z.string({required_error: 'repeat password is required'}),
		tinPhoto: fileSchema,
		branches: z.array(storeBranchFormSchema).min(1)
	})
			.refine((data) => data.password === data.repeatPassword, {
				message: 'Passwords do not match',
				path: ['repeatPassword'], // This ensures the error is attached to the `repeatPassword` field
			});


	const form = useForm<z.infer<typeof storeRegistrationFormSchema>>({
		resolver: zodResolver(storeRegistrationFormSchema),
		defaultValues: {
			branches: [
				{
					info: [{}],
					workHours: [undefined, undefined],
					workDays: []
				}
			]
		},
		mode: "onChange"
	})




	function onSubmit(values: z.infer<typeof storeRegistrationFormSchema>) {
		console.log(values)
	}
	// console.log(form.formState.isValid)
	// console.log(form.)
	return (
			<div className={'pt-10 pb-20 mx-auto w-[806px] h-full flex flex-col gap-y-6'}>


				{/*Header*/}
				<ServiceRegistrationHeader step={step}/>

				{/*Full	Form with divided steps*/}
				<Form {...form}>
					<form className={'flex flex-col gap-y-5'}>
						{step === 1 && <ServiceRegistrationStep1 type={"store"} form={form} />}
						{step === 2 && <StoreRegistrationStep2 form={form} />}
						{step === 3 && <ServiceRegistrationStep3 form={form} />}
					</form>
				</Form>

				{/*Bottom Buttons prev and next...*/}
				<ServiceRegistrationBottomButtons
						form={form}
						step={step}
						setStep={setStep}
						closeFormAndGoBack={closeFormAndGoBack}
						openPopup={openPopup}
				/>
			</div>
	)
}


export default memo(StoreRegistrationFull)
