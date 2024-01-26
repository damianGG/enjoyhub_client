import Image from "next/image"
import { useState } from "react";


interface Image {
    id: number;
    url: string;
    venueId: number;
}

interface MainVenueGalleryProps {
    PHOTOS: Image[];
}

export default async function MainVenueGallery({ PHOTOS }: MainVenueGalleryProps) {

    const firstPhoto = PHOTOS[0];
    return (
        < div className="rounded-md sm:rounded-xl" >
            <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                <div
                    className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                >

                    <Image
                        width={900} height={500} src={firstPhoto.url} alt={`Slide ${firstPhoto.id}`}
                        className="object-cover rounded-md sm:rounded-xl"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
                {PHOTOS.filter((item: Image, i: number) => i >= 1 && i < 5).map((item: Image, index: number) => (
                    <div key={index}
                        className={`relative rounded-md sm:rounded-xl overflow-hidden ${index >= 3 ? "hidden sm:block" : ""
                            }`}
                    >
                        <div className=" sm:aspect-w-6 sm:aspect-h-5">
                            <Image
                                className="object-cover rounded-md sm:rounded-xl "
                                src={item.url}
                                alt={`Slide ${firstPhoto.id}`}
                                width={400} height={400}

                            />
                        </div>

                        {/* OVERLAY */}
                        <div
                            className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"

                        />
                    </div>
                ))}

                <button
                    className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                >
                    {/* <Squares2X2Icon className="w-5 h-5" /> */}
                    <span className="ml-2 text-neutral-800 text-sm font-medium">
                        Pokaż wszystkie zdjęcia
                    </span>
                </button>
            </div>
        </div >
    )
}