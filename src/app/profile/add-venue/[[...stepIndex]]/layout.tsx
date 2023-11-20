import React from "react";
import { FC } from "react";
import ButtonPrimary from "@/components/Button";
import ButtonSecondary from "@/components/Button";


export interface CommonLayoutProps {
  children: React.ReactNode;
  params: {
    stepIndex: string;
  };
}

const CommonLayout: FC<CommonLayoutProps> = ({ children, params }) => {
  const index = Number(params.stepIndex) || 1;
  const nextHref = (
    index < 10 ? `/profile/add-venue/${index + 1}` : `/add-venue/${1}`
  )
  const backtHref = (
    index > 1 ? `/profile/add-venue/${index - 1}` : `/add-venue/${1}`
  )
  const nextBtnText = index > 9 ? "Publish listing" : "Continue";
  return (
    <div
      className={`nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32`}
    >
      <div className="space-y-11">
        <div>
          <span className="text-4xl font-semibold">{index}</span>{" "}
          <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 2
          </span>
        </div>

        {/* --------------------- */}
        <div className="listingSection__wrap ">{children}</div>

        {/* --------------------- */}
        <div className="flex justify-end space-x-5">
          <ButtonPrimary href={backtHref}>Go back</ButtonPrimary>
          <ButtonSecondary href={nextHref}>
            {nextBtnText || "Continue"}
          </ButtonSecondary>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
