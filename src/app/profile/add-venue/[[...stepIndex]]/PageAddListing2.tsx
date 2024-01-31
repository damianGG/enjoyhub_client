"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
//import LocationMarker from "@/components/AnyReactComponent/LocationMarker";
import Label from "@/components/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useEffect, useState } from "react";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useFormState } from "./FormContext";
import { Controller, useForm } from "react-hook-form";
import LocationPicker from "./LocationPicker";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/components/ButtonSecondary";




export interface PageAddListing2Props { }
type TFormValues = {
  postalCode: string;
  city: string;
  street: string;
  street_number: string;
  latitude?: number;
  longitude?: number;
};


const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [isCreated, setCreated] = useState(false);
  const { setFormData, formData, onHandleBack, onHandleNext } = useFormState();
  const { register, handleSubmit, control } = useForm<TFormValues>({
    defaultValues: formData,
  });

  const onHandleFormSubmit = (data: TFormValues) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    onHandleNext();
    //setCreated(true);
  };

  const handleLocationSelect = (latlng: { lat: any; lng: any; }) => {
    setFormData((prevState: any) => ({ ...prevState, latitude: latlng.lat, longitude: latlng.lng }));
  };

  useEffect(() => {
    console.log("Aktualne formData:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("Przywrócone formData:", formData);
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Lokalizacja</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          uzupełnij pola z lokalizacją obiektu aby nikt nie miał problemu Cię znaleźć
        </span>

      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <form className="space-y-6" onSubmit={handleSubmit(onHandleFormSubmit)}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Kod pocztowy">
            <Input {...register("postalCode")} placeholder="" />
          </FormItem>
          <FormItem label="Miejscowość">
            <Input {...register("city")} placeholder="" />
          </FormItem>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Ulica">
            <Input {...register("street")} placeholder="" />
          </FormItem>
          <FormItem label="Numer">
            <Input {...register("street_number")} placeholder="" />
          </FormItem>
        </div>
        <h3 className="pt-10">Wskaż na mapie dokładną lokalizację obiektu</h3>
        <Controller
          name="latitude"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <Controller
          name="longitude"
          control={control}
          render={({ field }) => <input type="hidden" {...field} />}
        />
        <LocationPicker
          onLocationSelect={handleLocationSelect}
          latitude={formData.latitude}
          longitude={formData.longitude}

        />
        <div className="flex gap-4 justify-end">

        </div>
        <div className="flex justify-between space-x-5 mt-12">
          <ButtonSecondary onClick={onHandleBack}>Cofnij</ButtonSecondary>
          <ButtonPrimary onClick={onHandleNext}>Dalej</ButtonPrimary>
        </div>
      </form>
    </>
  );
};

export default PageAddListing2;
