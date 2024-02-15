import rightImg from "@/images/about-hero-right.webp";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import BackgroundSection from "@/components/BackgroundSection";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";

export interface PageAboutProps { }

const PageAbout: FC<PageAboutProps> = ({ }) => {
    return (
        <div className={`nc-PageAbout overflow-hidden relative`}>
            {/* ======== BG GLASS ======== */}
            <BgGlassmorphism />

            <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
                <SectionHero
                    rightImg={rightImg}
                    heading="👋 Cześć!"
                    btnText=""
                    subHeading="Każdego dnia staramy się by szukanie miejsce gdzie można się dobrze bawić było łatwiejsze. Mamy nadzieję, że to miejsce Ci w tym pomoże :) "
                />

                <SectionFounder />
                <div className="relative py-16">
                    <BackgroundSection />
                    {/* <SectionClientSay /> */}
                </div>

                <SectionStatistic />

                {/* <SectionSubscribe2 /> */}
            </div>
        </div>
    );
};

export default PageAbout;
