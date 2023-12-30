import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
export interface PageAddListing4Props { }
type TFormValues = {
};
const PageAddListing4: FC<PageAddListing4Props> = () => {


    const { setFormData, formData, onHandleBack, onHandleNext } = useFormState();
    const onHandleFormSubmit = (data: TFormValues) => {
        setFormData((prev: any) => ({ ...prev, ...data }));
        onHandleNext();
        //setCreated(true);
    };
    const { register, handleSubmit } = useForm<TFormValues>({
        defaultValues: formData,
    });

    return (
        <>
            <div>
                <h2 className="text-2xl font-semibold">Kontakt i socialmedia</h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {`Dodaj podstaowy kontakt tak aby kliencie mogli w łatwy sposób mogli się z Tobą skontaktować`}
                </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <form onSubmit={handleSubmit(onHandleFormSubmit)}>
                <div className="space-y-8">
                    <FormItem label="numer telefonu">
                        <Input placeholder="..." />
                    </FormItem>
                    <FormItem label="email do kontaktu">
                        <Input placeholder="..." />
                    </FormItem>
                    <FormItem label="strona www">
                        <Input placeholder="adres strony www" />
                    </FormItem>
                    <FormItem label="instagram">
                        <Input placeholder="link do konta na instagramie" />
                    </FormItem>
                </div>
                <div className="flex justify-between mt-10">
                    <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonSecondary font-medium border bg-white border-neutral-200 text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800  " type="submit">Cofnij</button>

                    <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50   " type="submit">Dalej</button>

                </div>
            </form>
        </>
    );
};

export default PageAddListing4;
