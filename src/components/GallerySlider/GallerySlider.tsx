"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { Transition } from "@headlessui/react";
import "./styles.css"


export type Photo = {
    id: number;
    url: string;
};

interface ArrowProps {
    left?: boolean; // Zmień typ na boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type GallerySliderProps = {
    photos: Photo[];
};

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
    shouldDisplay: boolean;
}) {
    const disabled = props.disabled ? " arrow--disabled" : ""
    if (!props.shouldDisplay) return null;
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

const GallerySlider: React.FC<GallerySliderProps> = ({ photos }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const isAtStart = currentSlide === 0;
    const isAtEnd = currentSlide === photos.length - 1;

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
        <div className="navigation-wrapper"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div ref={sliderRef} className="keen-slider h-48">
                {photos.map(photo => (
                    <div key={photo.id} className="keen-slider__slide">
                        <Image
                            width={297}
                            height={190}
                            src={photo.url}
                            alt={`Slide ${photo.id}`}

                        />
                    </div>
                ))}
                {loaded && instanceRef.current && (
                    <Transition
                        show={isHovering}
                        enter="transition ease-out duration-150"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Arrow
                            left={true}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                instanceRef.current?.prev();
                            }} disabled={false}
                            shouldDisplay={!isAtStart}
                        />
                        <Arrow
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                instanceRef.current?.next();
                            }} disabled={false}
                            shouldDisplay={!isAtEnd}
                        />

                    </Transition>
                )}
                {loaded && instanceRef.current && (
                    <div className="dots">
                        {[
                            ...Array(instanceRef.current?.track?.details?.slides?.length).keys(),
                        ].map((idx) => (
                            <button
                                key={idx}
                                onClick={() => instanceRef.current?.moveToIdx(idx)}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};



export default GallerySlider;