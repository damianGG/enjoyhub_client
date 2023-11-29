"use client"

import React, { useState } from "react";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing2 from "./PageAddListing2";
import { useFormState } from "./FormContext";


function ActiveStepFormComponent() {
  const { step } = useFormState();
  switch (step) {
    case 1:
      return <PageAddListing1 />;
    case 2:
      return <PageAddListing2 />;
    default:
      return null;
  }
}

export default function Page() {
  return (
    <ActiveStepFormComponent />
  )
};



