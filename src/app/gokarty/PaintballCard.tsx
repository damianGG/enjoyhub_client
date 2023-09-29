import React, { FC } from "react";
import { PaintBallType } from "@/data/paintball.types";
import StartRating from "@/components/StartRating";
import Image from "next/image";
import Link from "next/link";
import GallerySlider from "@/components/GallerySlider"
import GallerySliderV2 from "@/components/GallerySliderV2";


export interface PaintBallProps {
    className?: string;
    data?: PaintBallType;
    size?: "default" | "small";
}


const PaintballCard: FC<PaintBallProps> = ({ data }) => {

    const renderSliderGallery = () => {

        console.log(data)
        console.log(data?.photos)
        return (
            <div className="relative w-full">
                <GallerySlider photos={data?.photos ?? []}
                />

                {/* <GallerySliderV2
                    uniqueID={`StayCard_${data?.id}`}
                    ratioClass="aspect-w-4 aspect-h-3 "
                    photos={data?.photos ?? []}
                /> */}
            </div>
        );
    };

    const renderContent = () => {
        return (
            // <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
            <div className="p-5  space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold" >
                            <span className="line-clamp-1">{data?.name}</span>
                        </h2>
                    </div>
                    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
                        <span className="">2 seats</span>
                        <span>{data?.city}</span>
                        {/* <span className="">{gearshift} </span> */}
                    </div>
                </div>
                <div className="w-14  border-b border-neutral-100 dark:border-neutral-800"></div>
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">

                    </span>
                    <StartRating reviewCount={4} point={4} />
                </div>
            </div>
        );
    };

    return (
        <div
            className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900`}
            data-nc-id="CarCard"
        >

            {renderSliderGallery()}
            {renderContent()}

        </div>
    );
}






export default PaintballCard;