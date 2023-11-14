'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styled from 'styled-components';

export type Photo = {
    id: number;
    url: string;
};

type GallerySliderProps = {
    photos: Photo[];
};

const GallerySlider: React.FC<GallerySliderProps> = ({ photos }) => {
    const [sliderRef, slider] = useKeenSlider({
        // slidesPerView: 1,
        mode: "free-snap",
        //   spacing: 15,
        loop: true,
    });

    return (
        <div ref={sliderRef} className="keen-slider">
            {photos.map(photo => (
                <div key={photo.id} className="keen-slider__slide">
                    <Image width={500} height={500} src={photo.url} alt={`Slide ${photo.id}`} />
                </div>
            ))}
        </div>
    );
};

export default GallerySlider;