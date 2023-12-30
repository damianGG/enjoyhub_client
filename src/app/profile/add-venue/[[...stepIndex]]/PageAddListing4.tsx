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
                <h2 className="text-2xl font-semibold">Opisz swoje miejsce</h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {`W kilku zdań opisz swoje miejsce - opis zawsze możesz edytować`}
                </span>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
            <form onSubmit={handleSubmit(onHandleFormSubmit)}>
                <div className="space-y-8">
                    <textarea
                        className="block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white"
                        // rows="14"
                        placeholder="..."
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default PageAddListing4;
