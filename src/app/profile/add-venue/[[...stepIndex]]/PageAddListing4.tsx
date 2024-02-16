import React, { FC } from "react";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useFormState } from "./FormContext";
import ButtonSecondary from "@/components/ButtonSecondary";
import ButtonPrimary from "@/components/ButtonPrimary";
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
                <h2 className="text-2xl font-semibold">Opisz swoje miejsce</h2>
                <span className="block mt-2 text-neutral-500 ">
                    {`W kilku zdań opisz swoje miejsce - opis zawsze możesz edytować`}
                </span>
            </div>
            <div className="w-14 border-b border-neutral-200 "></div>
            <form onSubmit={handleSubmit(onHandleFormSubmit)}>
                <div className="space-y-8">
                    <textarea
                        className="block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white"
                        // rows="14"
                        placeholder="..."
                    ></textarea>
                </div>
                <div className="flex justify-between space-x-5 mt-12">
                    <ButtonSecondary onClick={onHandleBack}>Cofnij</ButtonSecondary>
                    <ButtonPrimary type="submit">Dalej</ButtonPrimary>
                </div>
            </form>
        </>
    );
};

export default PageAddListing4;
