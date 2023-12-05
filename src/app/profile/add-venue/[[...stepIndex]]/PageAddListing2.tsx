"use client";

import { MapPinIcon } from "@heroicons/react/24/solid";
//import LocationMarker from "@/components/AnyReactComponent/LocationMarker";
import Label from "@/components/Label";
import GoogleMapReact from "google-map-react";
import React, { FC, useState } from "react";
import Button from "@/shared/Button";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import FormItem from "../FormItem";
import { useFormState } from "./FormContext";
import { Controller, useForm } from "react-hook-form";
import LocationPicker from "./LocationPicker";




export interface PageAddListing2Props { }
type TFormValues = {
};
const PageAddListing2: FC<PageAddListing2Props> = () => {
  const [isCreated, setCreated] = useState(false);
  const { setFormData, formData, onHandleBack,onHandleNext } = useFormState();
  const { register, handleSubmit } = useForm<TFormValues>({
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
  const { control } = useForm();

  return isCreated ? (
    <div>
      <p>Account created successfully</p>
      <pre>{JSON.stringify(formData)}</pre>
    </div>) : (
    <form className="space-y-6" onSubmit={handleSubmit(onHandleFormSubmit)}>
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
      <LocationPicker onLocationSelect={handleLocationSelect} />
      <div className="flex gap-4 justify-end">
        <button
          type="button"
          onClick={onHandleBack}
          className="h-11 px-6 inline-block bg-blue-600 font-semibold text-black rounded-md"
        >
          Back
        </button>
        <button className="h-11 px-6 inline-block bg-blue-600 font-semibold text-black rounded-md">
          Create
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PageAddListing2;
