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

export interface PageAddListing1Props { }
type TFormValues = {
};
const PageAddListing1: FC<PageAddListing1Props> = () => {
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
    if (session && session.accessToken) {
      try {
        const response = await fetch('http://localhost:3001/venue', {
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