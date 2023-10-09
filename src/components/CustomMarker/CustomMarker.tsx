import OverlayView from "../OverlayView/OverlayView";
import { motion } from "framer-motion";
interface CustomMarkerProps {
    map?: google.maps.Map;
    highlight?: boolean;
    imageSrc: string;
}

export default function CustomMarker({
    map,
    highlight,
    imageSrc
}: CustomMarkerProps) {


    return (
        <>
            {map && (
                <OverlayView
                    position={{
                        lat: 50.5083,
                        lng: 21.42584
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
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.1 }}
                            className={`bg-white rounded-full py-1.5 px-2 drop-shadow text-xs text-white ${highlight && "text-black bg-zinc-50 font-bold py-2 px-2.5"
                                }`}
                            style={{
                                backgroundImage: `url(${imageSrc})`, // ustawiamy obrazek jako tło przycisku
                                backgroundSize: '70%',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center', // ustawia obrazek na środku
                                width: '45px',
                                height: '45px',

                            }}
                        ></motion.button>
                    </motion.div>
                </OverlayView>
            )}
        </>
    )
}