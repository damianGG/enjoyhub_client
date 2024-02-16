import React, { FC } from "react";
import { PaintBallType } from "@/data/paintball.types";
import StartRating from "@/components/StartRating";
import GallerySlider from "@/components/GallerySlider/GallerySlider"
import Link from "next/link";


export interface PaintBallProps {
    className?: string;
    data?: PaintBallType;
    size?: "default" | "small";
}


const PaintballCard: FC<PaintBallProps> = ({ data }) => {

    const id = data?.id;
    const categoryName = data?.category?.name;

    const renderSliderGallery = () => {
        return (
            <div className="relative w-full h-48">
                <GallerySlider photos={data?.photos ?? []} />
            </div>
        );
    };

    const renderContent = () => {
        return (
            // <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
            <div className="pl-5 pr-5 pb-5 space-y-4 mb-3 mt-3">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold" >
                            <span className="line-clamp-1">{data?.name}</span>
                        </h2>
                    </div>
                    <div className="flex items-center text-neutral-500  text-sm space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path></svg>
                        <span>{data?.city}</span>
                        {/* <span className="">{gearshift} </span> */}
                    </div>
                </div>
                <div className="w-14  border-b border-neutral-100 "></div>

                <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-semibold">130 zł<span className="text-sm text-neutral-500  font-normal">/osoba</span>
                    </span><div className="nc-StartRating flex items-center space-x-1 text-sm  " data-nc-id="StartRating">
                        <div className="pb-[2px]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px] text-orange-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path></svg>
                        </div><span className="font-medium ">4.4</span>
                        <span className="text-neutral-500 ">(478)</span>
                    </div>
                </div>
                {/* <StartRating reviewCount={4} point={4} /> */}

            </div>
        );
    };

    return (
        <Link className="h-fit" href={`/profile/edit-venue/${id}`} passHref>
            <div
                className={`nc-CarCard group relative border border-neutral-200  rounded-3xl overflow-hidden bg-white`}
                data-nc-id="CarCard"
            >

                {/* {renderSliderGallery()} */}
                {renderContent()}

            </div>
        </Link>
    );
}

export default PaintballCard;




