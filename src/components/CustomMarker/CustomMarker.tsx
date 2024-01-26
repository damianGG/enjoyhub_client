
import { PaintBallType } from "@/data/paintball.types";
import OverlayView from "../OverlayView/OverlayView";
import { motion } from "framer-motion";
import CardOnMap from "../CardOnMap";
import { useEffect, useRef, useState } from "react";


interface CustomMarkerProps {
    map?: google.maps.Map;
    highlight?: boolean;
    imageSrc: string;
    lat: number;
    lng: number;
    dataOfVenue: PaintBallType | undefined;
}

export default function CustomMarker({
    map,
    highlight,
    imageSrc,
    lat,
    lng,
    dataOfVenue,
}: CustomMarkerProps) {

    const [showCard, setShowCard] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    // Funkcja do obsługi kliknięć poza kartą
    const handleClickOutside = (event: MouseEvent) => {
        if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowCard(false);
        }
    };

    useEffect(() => {
        // Dodawanie nasłuchiwacza, gdy karta jest wyświetlana
        if (showCard) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Usuwanie nasłuchiwacza, gdy karta jest ukrywana
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCard]); // Dodanie showCard jako zależność useEffect



    return (
        <>
            {map && (
                <OverlayView
                    position={{
                        lat: lat,
                        lng: lng
                    }}
                    map={map}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                        }}
                    >
                        <motion.button
                            onClick={() => setShowCard(!showCard)}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.1 }}
                            className={`bg-white rounded-full py-1.5 px-2 drop-shadow text-xs text-white ${highlight && "text-black bg-zinc-50 font-bold py-2 px-2.5"
                                }`}
                            style={{
                                //backgroundImage: `url(${imageSrc})`,
                                backgroundImage: `url(/icons/${imageSrc}.svg)`,
                                backgroundSize: '70%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                width: '45px',
                                height: '45px',
                            }}
                        ></motion.button>
                        <div ref={cardRef}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, 24px)'
                            }}

                        >
                            {showCard && <CardOnMap data={dataOfVenue} />}
                        </div>
                    </motion.div>
                </OverlayView>
            )}
        </>
    )
}