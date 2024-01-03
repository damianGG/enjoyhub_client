"use client"

import React, { useState } from "react";
import { FC } from "react";
import ButtonPrimary from "@/components/Button";
import ButtonSecondary from "@/components/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageManager from "./ImageManager";
import Map from "@/components/Map";
import PositionManager from "./PositionManager";


export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
      <Tabs value={activeTab} onChange={handleChange} centered>
        <Tab label="Zdjęcia" />
        <Tab label="Mapa" />
        <Tab label="Tab 3" />
      </Tabs>
      <div className="space-y-11">
        <div className="listingSection__wrap ">
          {activeTab === 0 && <ImageManager />}
          {activeTab === 1 && <PositionManager />}

        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
