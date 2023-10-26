'use client'

import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

export type Photo = {
    id: number;
    url: string;
};


type GallerySliderProps = {
    photos: Photo[];
};

const StyledSlider = styled(Slider)`
    .slick-next {
        right: 20px;
    }
    .slick-prev {
        left: 20px;
        z-index: 1;
    }
    .slick-prev:before, .slick-next:before{
        font-size:30px;
        font-weight: bold;
        opacity: .95;
    }
    .slick-prev, .slick-nexte{
        width: 30px;
        height: 30px;
    }
    .slick-dots{
        bottom: 15px;
    }
    .slick-dots li{
        width: 5px;
    }
    .slick-dots li button{
        width: 5px;
    }
    .slick-dots li.slick-active button:before{
        color:white;
        opacity:1;
    }
    .slick-dots li button:before{
        color:white;
        opacity:0.5;
    }
`;

const GallerySlider: React.FC<GallerySliderProps> = ({ photos }) => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
    };

    return (
        <div className="slider-container">
            <StyledSlider className=''  {...settings}>
                {photos.map(photo => (
                    <div key={photo.id}>
                        <Image width={200} height={200} src={photo.url} alt={`Slide ${photo.id}`} />
                    </div>
                ))}
            </StyledSlider>

        </div>
    );
};

export default GallerySlider;