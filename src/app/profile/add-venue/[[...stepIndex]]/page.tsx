"use client"

import React, { useState } from "react";
import PageAddListing1 from "./PageAddListing1";
import PageAddListing2 from "./PageAddListing2";
import PageAddListing3 from "./PageAddListing3";
import { useFormState } from "./FormContext";


function ActiveStepFormComponent() {
  const { step } = useFormState();
  switch (step) {
    case 1:
      return <PageAddListing1 />;
    case 2:
      return <PageAddListing2 />;
    case 3:
      return <PageAddListing3 />;
    default:
      return null;
  }
}

export default function Page() {
  return (
    <ActiveStepFormComponent />
  )
};



