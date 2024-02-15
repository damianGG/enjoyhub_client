import Image from "next/image"
import Map from "@/components/Map"
// import MapFromGoogle from "@/components/MapFromGoogle";
// import { PaintBallType } from "@/data/paintball.types";
import MapFromGoogleVenue from "@/components/MapFromGoogleVenue";
import MainVenueGallery from "./MainVenueGallery";
import { env } from "process";


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
                        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                        <div className="text-neutral-6000 dark:text-neutral-300">
                            <span>Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.</span>
                            <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
                            <span>The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.</span>
                        </div>
                    </div>
                    <div className="listingSection__wrap">
                        <h2 className="text-2xl font-semibold">Co zapewnia organizator?</h2>
                        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                        <div className="text-neutral-6000 dark:text-neutral-300">
                            <span>Providing lake views, The Symphony 9 Tam Coc in Ninh Binh provides accommodation, an outdoor swimming pool, a bar, a shared lounge, a garden and barbecue facilities. Complimentary WiFi is provided.</span>
                            <span>There is a private bathroom with bidet in all units, along with a hairdryer and free toiletries.</span>
                            <span>The Symphony 9 Tam Coc offers a terrace. Both a bicycle rental service and a car rental service are available at the accommodation, while cycling can be enjoyed nearby.</span>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
                    <div className="sticky top-28">
                        <div className="listingSectionSidebar__wrap shadow-xl">
                            <div className="flex justify-between">
                                <span className="text-3xl font-semibold">80 zł<span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">/osoba</span>
                                </span>
                                <div className="nc-StartRating flex items-center space-x-1 text-sm  " data-nc-id="StartRating">
                                    <div className="pb-[2px]">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px] text-orange-500">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <span className="font-medium ">4.5</span>
                                    <span className="text-neutral-500 dark:text-neutral-400">(112)</span>
                                </div>
                            </div>
                            <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
                                <div className="StayDatesRangeInput z-10 relative flex flex-1 z-[11]" data-headlessui-state="">
                                    <button className="flex-1 flex relative p-3 items-center space-x-3 focus:outline-none " type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:rm:">
                                        <div className="text-neutral-300 dark:text-neutral-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 lg:w-7 lg:h-7">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path>
                                            </svg>
                                        </div>
                                        <div className="flex-grow text-left">
                                            <span className="block xl:text-lg font-semibold">Feb 06 - Feb 23</span>
                                            <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">Check in - Check out</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                                <div className="flex relative flex-1" data-headlessui-state="">
                                    <div className="flex-1 flex items-center focus:outline-none rounded-b-3xl ">
                                        <button className="relative z-10 flex-1 flex text-left items-center p-3 space-x-3 focus:outline-none" type="button" aria-expanded="false" data-headlessui-state="" id="headlessui-popover-button-:ro:">
                                            <div className="text-neutral-300 dark:text-neutral-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-5 h-5 lg:w-7 lg:h-7">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"></path>
                                                </svg>
                                            </div>
                                            <div className="flex-grow">
                                                <span className="block xl:text-lg font-semibold">4 Guests</span>
                                                <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">Guests</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="flex flex-col space-y-4">
                                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                    <span>$119 x 3 night</span>
                                    <span>$357</span>
                                </div>
                                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                    <span>Service charge</span>
                                    <span>$0</span>
                                </div>
                                <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>$199</span>
                                </div>
                            </div>
                            <a className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50   " href="/checkout">Reserve</a>
                        </div>
                    </div>
                </div>

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

