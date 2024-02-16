import Heading from "@/components/Heading";
import Image, { StaticImageData } from "next/image";
import React from "react";
import fouder from "@/images/founder.png";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: StaticImageData;
}

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Damian`,
    job: "Founder",
    avatar: fouder,
  },
];

const SectionFounder = () => {
  return (
    <div className="nc-SectionFounder relative">
      <Heading
        desc="By rozrywka była dostępna dla każdego, bez względu na to, gdzie się znajdujesz."
      >
        ⛱ Założyciel
      </Heading>
      <div className="flex justify-center">
        {FOUNDER_DEMO.map((item) => (
          <div key={item.id} className="max-w-sm">
            <div className="relative h-72 w-72 aspect-h-1 aspect-w-1 rounded-xl  overflow-hidden">
              <Image
                fill
                className=" object-cover"
                src={item.avatar}
                alt=""
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
              />
            </div>

            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl ">
              {item.name}
            </h3>
            <span className="block text-sm text-neutral-500 sm:text-base ">
              {item.job}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionFounder;
