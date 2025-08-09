'use client'



import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {cn, fileSchema} from "@/lib/utils";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {X} from "lucide-react";
import * as React from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form";
import CustomFormFieldSelector from "@/components/app-custom/custom-form-field-selector";
import {SupportProblemSelector} from "@/components/support/support-problem-selector";
import {grayTriggerClassname} from "@/components/shadcn-extended/SelectExt";
import CustomFormFieldTextarea from "@/components/app-custom/custom-form-field-textarea";
import CustomFormFieldFile from "@/components/app-custom/custom-form-field-file";
import CustomBlueBtn from "@/components/app-custom/CustomBlueBtn";

interface ISupportReportProblemPopup {
	isOpen?: boolean;
	closePopup: () => void
}

export default function SupportReportProblemPopup(
		{
				isOpen,
				closePopup
		}: ISupportReportProblemPopup
) {

	const supportReportProblemFormSchema = z.object({
		problem: z.string({required_error: 'please select the problem'}),
		describe: z.string().optional(),
		image: fileSchema.optional()
	})


	const form = useForm<z.infer<typeof supportReportProblemFormSchema>>({
		resolver: zodResolver(supportReportProblemFormSchema),
		mode: 'onChange'
	})


	function onSubmit(values: z.infer<typeof supportReportProblemFormSchema>) {
		console.log(values)
	}

	return (
			<Dialog open={isOpen}>
				<DialogContent className={cn("overflow-y-auto max-w-[95%] 650:max-w-[650px] lg:max-w-[800px] max-h-[450px] 650:max-h-[600px] bg-light-gray rounded-3xl py-8 flex flex-col gap-y-8")}>
					<ScrollArea className={'h-[450px] 650:h-[600px]'}>
						<DialogHeader className={'w-full flex flex-col gap-8 border-b-[1px] border-b-blue-gray p-8 pt-0'}>
							<div className={'flex justify-between items-center'}>
								<DialogTitle className={'p-0 m-0 text-2xl text-charcoal font-medium'}>
									Do you have any problem?
								</DialogTitle>
								<DialogPrimitive.Close onClick={() => {
									closePopup()
									setTimeout(() => {
										form.reset()
									},300)
								}}>
									<X className={'size-6 text-charcoal/50'}/>
								</DialogPrimitive.Close>
							</div>
						</DialogHeader>

						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className={'px-8 pt-8 flex flex-col gap-y-8'}>
								<div className={'flex flex-col gap-y-2'}>
									<CustomFormFieldSelector
											label={'Where do you have a problem'}
											control={form.control}
											name={'problem'}
											Children={(onChange, hasError, value) => {
												return (
														<SupportProblemSelector
															value={value}
															onChange={onChange}
															triggerClassname={cn(grayTriggerClassname, hasError && '!border-vibrant-red')}
														/>
												)
											}}
									/>

									<CustomFormFieldTextarea
										control={form.control}
										name={'describe'}
										label={''}
										placeholder={'Can you describe your problem?'}
									/>
								</div>

								<CustomFormFieldFile
										control={form.control}
										name={'image'}
										label={'Attach image'}
										description={'If you have screenshot or image related to the problem feel free to send it'}
								/>

								<CustomBlueBtn text={'Submit'}/>
							</form>
						</Form>

					</ScrollArea>
				</DialogContent>
			</Dialog>
	)
}
