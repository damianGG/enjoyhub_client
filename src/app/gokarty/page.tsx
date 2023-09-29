import { Key, ReactNode } from "react"
import PaintballCard from "./PaintballCard"
import { PaintBallType } from "@/data/paintball.types"
import { Photo } from "@/components/GallerySlider"

async function getData() {
    const res = await fetch('http://localhost:3000/venue/category/paintball')
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
            <div className="p-5 grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {venueWithPhotos.map((item: {
                    city: string;
                    name: string;
                    photos: Photo[];
                    id: string
                }) => (
                    <PaintballCard key={item.id} data={item} />
                ))}
            </div>
        );
    } catch (error) {
        // Handle the error here
        console.error(error);
        // You might want to render an error message or fallback UI instead of throwing an error boundary
        return null;
    }
}
