'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import "@/styles/sliders.css"

export type Photo = {
    id: number;
    url: string;
};

type GallerySliderProps = {
    photos: Photo[];
};

const GallerySlider: React.FC<GallerySliderProps> = ({ photos }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {photos.map(photo => (
                        <div key={photo.id} className="keen-slider__slide">
                            <Image width={200} height={200} src={photo.url} alt={`Slide ${photo.id}`} />
                        </div>
                    ))}
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={() =>
                                instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={() => instanceRef.current?.next()}
                            disabled={currentSlide ===
                                instanceRef.current.track.details.slides.length - 1} left={undefined} />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                            }}
                            className={"dot" + (currentSlide === idx ? " active" : "")}
                        ></button>
                    ))}
                </div>
            )}
        </>
    );
};

type ArrowProps = {
    disabled: boolean;
    left?: any; // Replace 'any' with the actual expected type
    onClick?: () => void;
}

function Arrow({ disabled, left, onClick }: ArrowProps) {
    const disabledClass = disabled ? " arrow--disabled" : "";
    return (
        <svg
            onClick={onClick}
            className={`arrow ${left ? "arrow--left" : "arrow--right"}${disabledClass}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {left ? (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            ) : (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    );
}

export default GallerySlider;