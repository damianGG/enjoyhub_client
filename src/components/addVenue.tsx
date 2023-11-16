import React, { FC } from "react";
import { PaintBallType } from "@/data/paintball.types";
import Link from "next/link";


export interface AddVenueCardProps {
    className?: string;
}


const AddVenueCard: FC<AddVenueCardProps> = () => {

    return (

        <div
            className={`nc-CarCard group relative border border-neutral-200  rounded-3xl overflow-hidden bg-white`}
            data-nc-id="CarCard"
        >
            Dodaj obiekt +
        </div>

    );
}

export default AddVenueCard;