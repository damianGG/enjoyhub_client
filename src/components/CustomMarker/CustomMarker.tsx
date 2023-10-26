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
    const [mouseMoved, setMouseMoved] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Funkcja do obsługi kliknięć poza kartą
    const handleMouseDown = () => {
        setMouseMoved(false); // Resetujemy stan myszki przy każdym nowym naciśnięciu
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = () => {
        setMouseMoved(true); // Ustawiamy stan myszki na przesunięty, gdy wykryjemy ruch
    };

    const handleMouseUp = (event: MouseEvent) => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        if (!mouseMoved && cardRef.current && !cardRef.current.contains(event.target as Node)) {
            setShowCard(false); // Zamykamy kartę tylko, gdy myszka nie została przesunięta
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []); // Bez zależności, aby zarejestrować nasłuchiwacze tylko raz



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
                                backgroundImage: `url(${imageSrc})`,
                                backgroundSize: '70%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                width: '45px',
                                height: '45px',
                            }}
                        ></motion.button>
                        <div ref={cardRef}>
                            {showCard && <CardOnMap data={dataOfVenue} />}
                        </div>
                    </motion.div>
                </OverlayView>
            )}
        </>
    )
}