import React, { FC } from "react";
import { PaintBallType } from "@/data/paintball.types";
import StartRating from "@/components/StartRating";
import GallerySlider from "@/components/GallerySlider/GallerySlider"
import Link from "next/link";




const AddVenueCard = () => {

    return (
        <Link className="h-fit" href={`/profile/addvenue`} passHref>
            <div
                className={`nc-CarCard group relative border border-neutral-200  rounded-3xl overflow-hidden bg-white`}
                data-nc-id="CarCard"
            >
                <div className="relative w-full h-16">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 h-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                    </div>

                </div>
                <div className="p-5 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 justify-center">
                            <h2 className="text-xl font-semibold" >
                                <span className="line-clamp-1 text-center">kliknij aby dodać nowy obiekt</span>
                            </h2>
                        </div>
                    </div>

                </div>

            </div>
        </Link>
    );
}

export default AddVenueCard;




