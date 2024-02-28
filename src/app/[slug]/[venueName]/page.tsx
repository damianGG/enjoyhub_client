import Image from "next/image"
import Map from "@/components/Map"
// import MapFromGoogle from "@/components/MapFromGoogle";
// import { PaintBallType } from "@/data/paintball.types";
import MapFromGoogleVenue from "@/components/MapFromGoogleVenue";
import InstagramIcon from "/instagram.webp"
import MainVenueGallery from "./MainVenueGallery";
import { env } from "process";
import Link from "next/link";
import SideBox from "./SideBox";


export default async function Page({ params }: { params: { venueName: string } }) {

    const id = params.venueName.split('-')[0];

    // Make both fetch calls simultaneously
    const [res, resPhotos] = await Promise.all([
        fetch(`http://localhost:3001/venue/${id}`),
        fetch(`http://localhost:3001/venue/${id}/photos`)
    ]);

    if (!res.ok) {
        //throw new Error('Failed to fetch data')
        console.log('Failed to fetch data')
    }
    if (!resPhotos.ok) {
        // throw new Error('Failed to fetch data photos')
        console.log('Failed to fetch data photos')
    }

    // Parse the JSON for both responses
    const [data, PHOTOS] = await Promise.all([res.json(), resPhotos.json()]);

    const firstPhoto = PHOTOS[0];
    const data2 = data[0];

    const renderGallery = () => {
        return (
            < div className="rounded-md sm:rounded-xl" >
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                    <div
                        className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                    >
                        {/* <Image
                            width={900} height={500} src={firstPhoto.url} alt={`Slide ${firstPhoto.id}`}
                            className="object-cover rounded-md sm:rounded-xl"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        /> */}
                        <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                    {PHOTOS.filter((_: string, i: number) => i >= 1 && i < 5).map((item: { url: string }, index: number) => (
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
                        className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                    >
                        <span className="ml-2 text-neutral-800 text-sm font-medium">
                            Pokaż wszystkie zdjęcia
                        </span>
                    </button>
                </div>
            </div >
        )
    }

    const rederMainPage = () => {
        return (
            <main className=" relative  mt-11 flex flex-col lg:flex-row ">
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                    <div className="listingSection__wrap">
                        <h2 className="text-2xl font-semibold">Co będziesz robił?</h2>
                        <div className="w-14 border-b border-neutral-200 "></div>
                        <div className="text-neutral-6000 ">
                            <span>Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.</span>
                            <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
                            <span>The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.</span>
                        </div>
                    </div>
                    <div className="listingSection__wrap">
                        <div>
                            <h2 className="text-2xl font-semibold">W cenie</h2>
                            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">Rzeczy które zapewnia organizator</span>
                        </div>
                        <div className="w-14 border-b border-neutral-200 "></div>
                        <div className="text-neutral-6000 ">
                            <span>Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.</span>
                            <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
                            <span>The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.</span>
                        </div>
                    </div>
                    <div className="listingSection__wrap">
                        <div>
                            <h2 className="text-2xl font-semibold">Opis</h2>
                            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">Poznaj nasze miejsce bliżej</span>
                        </div>
                        <div className="w-14 border-b border-neutral-200 "></div>
                        <div className="text-neutral-6000 ">
                            <span>Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.</span>
                            <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
                            <span>The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.</span>
                        </div>
                    </div>
                </div>
                
                <SideBox />
            </main>
        )
    }


    return (

        <div className="container">
            {/* <MainVenueGallery PHOTOS={PHOTOS} /> */}
            {renderGallery()}
            {rederMainPage()}

            {<MapFromGoogleVenue latitude={data2.latitude} longitude={data2.longitude}
                venueName={data2.category ? data2.category.name : 'paintball'}

            />}

        </div>


    )
}

