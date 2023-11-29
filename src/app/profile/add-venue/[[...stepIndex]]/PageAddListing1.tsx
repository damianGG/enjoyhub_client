"use client"

import React, { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { getSession } from "next-auth/react";
import { useFormState } from "./FormContext";
import Image from "next/image";
import paintballGun from "@/app/components/Navigation/icons/paintball-gun.png";
import quady from '@/app/components/Navigation/icons/quad.png'
import gokarty from '@/app/components/Navigation/icons/karting.png'
import aim from '@/app/components/Navigation/icons/aim.png'

export interface PageAddListing1Props { }
type TFormValues = {
};
const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { onHandleNext, setFormData, formData } = useFormState();

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  //  const { nextStep, updateFormData } = useMultiStepForm({ totalSteps: 2 });
  const onSubmittoSendForm = async (data: any) => {
    const session = await getSession();
    console.log(session?.accessToken);
    if (!session || !session.accessToken) {
      console.error('Brak tokenu sesji');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/venue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}` // Zamień na rzeczywisty token
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const responseData = await response.json();
      console.log(responseData);
      console.log("dodano")
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Tutaj możesz obsłużyć błędy, np. wyświetlić komunikat
    }
  };

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
  };
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const options = [
    { id: 1, image: quady, label: 'Quady' },
    { id: 3, image: paintballGun, label: 'Paintball' },
    { id: 2, image: gokarty, label: 'Gokarty' },
    { id: 4, image: aim, label: 'Aim' },
  ]

  return (
    <form onSubmit={handleSubmit(onHandleFormSubmit)}>
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <div className="flex gap-8 flex-wrap justify-between">
            {options.map((option) => (
              <label key={option.id}
                style={{
                  cursor: 'pointer',
                  margin: '10px',
                  padding: '25px',
                  borderRadius: '50%',
                  background: selectedId === option.id ? 'lightgrey' : 'transparent',
                }}
                onClick={() => {
                  field.onChange(option.id);
                  setSelectedId(option.id);
                }}

              >
                <input
                  type="radio"
                  value={option.id}
                  checked={field.value === option}
                  onChange={() => field.onChange(option.id)}
                  style={{ display: 'none' }}
                />
                <Image src={option.image} alt={`Option ${option.label}`} style={{ cursor: 'pointer', margin: '10px' }} width={150} height={150} />
                <div className="font-medium text-center mt-2">{option.label}</div>
              </label>
            ))}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>

  );
};

export default PageAddListing1;