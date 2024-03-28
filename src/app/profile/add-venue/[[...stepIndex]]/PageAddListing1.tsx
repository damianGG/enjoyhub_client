"use client"

import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { getSession } from "next-auth/react";
import { useFormState } from "./FormContext";
import Image from "next/image";
import paintballGun from "@/images/icons/paintball-gun.png";
import quady from '@/images/icons/quad.png'
import gokarty from '@/images/icons/karting.png'
import aim from '@/images/icons/aim.png'
import offroad from '@/images/icons/off-road.png'
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";

export interface PageAddListing1Props { }
type TFormValues = {
};
const PageAddListing1: FC<PageAddListing1Props> = ({ }) => {
  const { onHandleNext, setFormData, formData } = useFormState();
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const options = [
    { id: 1, image: quady, label: 'Quady' },
    { id: 3, image: paintballGun, label: 'Paintball' },
    { id: 2, image: gokarty, label: 'Gokarty' },
    { id: 4, image: aim, label: 'Aim' },
    { id: 5, image: offroad, label: 'Off-road' },
  ]

  const onSubmittoSendForm = async (data: any) => {
    const session = await getSession();
    console.log('Session:', session);
    console.log(JSON.stringify(data))
    if (session && session.accessToken) {
      try {
        const response = await fetch(`https://enjoyhubserver-production.up.railway.app/venue`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.accessToken}`
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          throw new Error(`Błąd sieci: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Venue ID zapisane:", responseData.id);

        // Zapisz ID venue i przejdź do następnego kroku
        setFormData((prev: any) => ({ ...prev, venueId: responseData.id }));
        onHandleNext();
      } catch (error) {
        console.error('Wystąpił problem:', error);
      }
    } else {
      console.log('Brak sesji lub tokenu');
    }
  };


  const onHandleFormSubmit = (data: TFormValues) => {
    onSubmittoSendForm(data);
    // setFormData((prev: any) => ({ ...prev, ...data }));
    // onHandleNext();
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Kliknij na obiektu który chcesz dodać</h2>
      <div className="w-14 border-b border-neutral-200 "></div>
      <form onSubmit={handleSubmit(onHandleFormSubmit)}>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <div className="flex gap-6 flex-wrap justify-between">
              {options.map((option) => (
                <div key={option.id} className="w-30 flex-col p-4 bg-neutral-50  rounded-2xl  flex "
                  style={{
                    cursor: 'pointer',
                    padding: '25px',
                    background: selectedId === option.id ? 'lightgrey' : '#f9fafb',
                  }}
                  onClick={() => {
                    field.onChange(option.id);
                    setSelectedId(option.id);
                  }}

                >
                  <label
                  >

                    <input
                      type="radio"
                      value={option.id}
                      checked={field.value === option}
                      onChange={() => field.onChange(option.id)}
                      style={{ display: 'none' }}
                    />

                    <Image src={option.image} alt={`Option ${option.label}`} style={{ cursor: 'pointer', margin: '10px' }} width={75} height={75} />
                    <h4 className="font-medium text-center mt-2">{option.label}</h4>

                  </label>
                </div>
              ))}
            </div>
          )}
        />
        {/* <button type="submit">Submit</button> */}
        <div className="flex justify-end space-x-5 mt-12">
          <ButtonPrimary type="submit">Dalej</ButtonPrimary>
        </div>
      </form>
    </>

  );
};

export default PageAddListing1;