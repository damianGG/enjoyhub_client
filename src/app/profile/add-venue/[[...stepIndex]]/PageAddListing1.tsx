"use client"

import React, { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { getSession } from "next-auth/react";

export interface PageAddListing1Props { }

const PageAddListing1: FC<PageAddListing1Props> = () => {
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm();
  //const { data: session } = useSession();
  const onSubmit = async (data: any) => {
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

  console.log(watch("example"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-semibold">Choosing listing categories</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div className="space-y-8">
        <FormItem
          label="Wybierz typ rozrywki"
          desc="Hotel: Professional hospitality businesses that usually have a unique style or theme defining their brand and decor"
        >


          <Select>
            <option value="1">Paintball</option>
            <option value="2">Gokarty</option>
            <option value="3">Strzelnica</option>
          </Select>


        </FormItem>

        <FormItem
          label="Nazwa obiektu"
          desc="Podaj nazwę swojego obiektu "
        >
          <Input placeholder="Nazwa obiektu" {...register("name", { required: true })} />
          {errors.name && <span>To pole jest wymagane</span>}
        </FormItem>

        <FormItem
          label="Miejscowość"
          desc="Miejscowość "
        >
          <Input placeholder="Miejscowość" {...register("city", { required: true })} />
          {errors.city && <span>To pole jest wymagane</span>}
        </FormItem>

        <input type="submit" />
      </div>
    </form>

  );
};

export default PageAddListing1;