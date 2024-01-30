import { Key, ReactNode } from "react"
import Card from "./Card"
import { PaintBallType } from "@/data/paintball.types"
import { Photo } from "@/components/GallerySlider/GallerySlider"
import MapFromGoogle from "@/components/MapFromGoogle"
import GlobalLoadingIndicator from "@/components/GlobalLoadingIndicator"
import Navigation from "@/components/Navigation/Navigation"
import BgGlassmorphism from "@/components/BgGlassmorphism"



async function getData({ params }: { params: { slug: string } }) {
    let url;

    if (params.slug === "all") {
        url = `http://localhost:3001/venue/all`;
    } else {
        const categoryName = params.slug;
        url = `http://localhost:3001/venue/category/${categoryName}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
    try {
        const venueWithPhotos: PaintBallType[] = await getData({ params: { slug: params.slug } });
        return (
            <>
                <Navigation />
                <div className="container pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
                    <div className="relative flex min-h-screen">
                        <BgGlassmorphism />
                        {/* CARDSSSS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8 min-h-screen w-full xl:w-[50%] 2xl:w-[50%] max-w-[977px] flex-shrink-0 xl:pr-8">
                            {venueWithPhotos.map((item: {
                                city: string;
                                name: string;
                                categoryName: string;
                                photos: Photo[];
                                id: string;
                                latitude: number;
                                longitude: number;
                                category: {
                                    id: number;
                                    slug: string;
                                    name: string;
                                };
                            }) => (
                                <Card key={item.id} data={item} />
                            ))}
                        </div>

                        <div className="fixed top-48 right-0">
                            <MapFromGoogle paintballPlaces={venueWithPhotos} />
                        </div>


                    </div>
                </div>
            </>


        );
    } catch (error) {
        // Handle the error here
        console.error(error);
        // You might want to render an error message or fallback UI instead of throwing an error boundary
        return null;
    }
}
