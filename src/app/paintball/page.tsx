import { Key, ReactNode } from "react"
import PaintballCard from "./PaintballCard"
import { PaintBallType } from "@/data/paintball.types"
import { Photo } from "@/components/GallerySlider"
import MapFromGoogle from "@/components/MapFromGoogle"
import GlobalLoadingIndicator from "@/components/GlobalLoadingIndicator"



async function getData() {
    const res = await fetch('http://localhost:3001/venue/category/paintball')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page() {
    try {
        const venueWithPhotos: PaintBallType[] = await getData();
        return (
            <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
                <div className="relative flex min-h-screen">
                    {/* CARDSSSS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8 min-h-screen w-full xl:w-[50%] 2xl:w-[50%] max-w-[977px] flex-shrink-0 xl:pr-8">
                        {venueWithPhotos.map((item: {
                            city: string;
                            name: string;
                            photos: Photo[];
                            id: string;
                            latitude: number;
                            longitude: number;
                        }) => (
                            <PaintballCard key={item.id} data={item} />
                        ))}
                    </div>
                    <MapFromGoogle className="static top-40" paintballPlaces={venueWithPhotos} />


                </div>
            </div>


        );
    } catch (error) {
        // Handle the error here
        console.error(error);
        // You might want to render an error message or fallback UI instead of throwing an error boundary
        return null;
    }
}
