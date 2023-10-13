import React, { FC, useState } from "react";
import { PaintBallType } from "@/data/paintball.types";
import StartRating from "@/components/StartRating";
import GallerySlider from "@/components/GallerySlider"
import Link from "next/link";


export interface PaintBallProps {
    className?: string;
    data?: PaintBallType;
    size?: "default" | "small";
    onMouseOver?: () => void;
    onMouseOut?: () => void;
}

const cardStyle = {
    width: '200px',
    height: '400px',
};

const sliderStyle = {
    height: '200px',
}

const PaintballCard: FC<PaintBallProps> = ({ data, onMouseOver, onMouseOut }) => {

    const [selectedMarker, setSelectedMarker] = useState(null);

    const convertStringToURLFormat = (str: string) => {
        const map: { [key: string]: string } = {
            'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ż': 'z', 'ź': 'z',
            'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ż': 'Z', 'Ź': 'Z'
        };
        return str.replace(/[ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]/g, (match) => map[match])  // Remove Polish characters
            .replace(/[\W_]+/g, " ")  // Remove all non-alphanumeric or underscore characters
            .replace(/ /g, '-')      // Replace spaces with "-"
            .toLowerCase();
    };

    const nameForURL = convertStringToURLFormat(data?.name || "");
    const cityForURL = convertStringToURLFormat(data?.city || "");
    const id = data?.id;

    const renderSliderGallery = () => {
        return (
            <div style={sliderStyle} className="relative w-full" >
                <GallerySlider photos={data?.photos ?? []} />
            </div>
        );
    };

    const renderContent = () => {
        return (
            // <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
            <div className="pl-5 pr-5 pb-5 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <h2 className="text-xl font-semibold" >
                            <span className="line-clamp-1">{data?.name}</span>
                        </h2>
                    </div>
                    <div className="flex items-center text-neutral-500  text-sm space-x-2">
                        <span className="">2 seats</span>
                        <span>{data?.city}</span>
                        {/* <span className="">{gearshift} </span> */}
                    </div>
                </div>
                <div className="w-14  border-b border-neutral-100 "></div>
                <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">

                    </span>
                    <StartRating reviewCount={4} point={4} />
                </div>
            </div>
        );
    };

    return (
        <Link href={`paintball/${id + "-" + cityForURL + "-" + nameForURL}`}
            passHref
            onMouseOver={onMouseOver}
            onMouseOut={() => {
                onMouseOut && onMouseOut();
                setSelectedMarker(null);
            }}
        >
            <div style={cardStyle}
                className={`nc-CarCard group relative border border-neutral-200  rounded-3xl overflow-hidden bg-white`}
                data-nc-id="CarCard"
            >

                {renderSliderGallery()}
                {renderContent()}

            </div>
        </Link>
    );
}

export default PaintballCard;