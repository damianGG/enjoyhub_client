import React, { FC } from "react";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import SocialsList from "@/components/SocialsList";
import Label from "@/components/Label";
import Input from "@/shared/Input";
import Textarea from "@/shared/Textarea";
import Button from "@/components/Button";

export interface PageContactProps { }

const info = [
  // {
  //   title: "🗺 ADDRESS",
  //   desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  // },
  {
    title: "💌 email",
    desc: "biuro@enjoyhub.pl",
  },
  {
    title: "☎ telefon",
    desc: "456-456-456",
  },
];

const PageContact: FC<PageContactProps> = ({ }) => {
  return (
    <div className={`nc-PageContact overflow-hidden`}>
      <div className="mb-24 lg:mb-32">
        <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900  justify-center">
          Kontakt
        </h2>
        <div className="container max-w-7xl mx-auto">
          <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
            <div className="max-w-sm space-y-8">
              {info.map((item, index) => (
                <div key={index}>
                  <h3 className="uppercase font-semibold text-sm  tracking-wider">
                    {item.title}
                  </h3>
                  <span className="block mt-2 text-neutral-500 ">
                    {item.desc}
                  </span>
                </div>
              ))}
              <div>
                <h3 className="uppercase font-semibold text-sm  tracking-wider">
                  🌏 SOCIALS
                </h3>
                <SocialsList className="mt-2" />
              </div>
            </div>
            <div>
              <form className="grid grid-cols-1 gap-6" action="#" method="post">
                <label className="block">
                  <Label>Imię</Label>

                  <Input
                    placeholder="Example Doe"
                    type="text"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Email</Label>

                  <Input
                    type="email"
                    placeholder="example@example.com"
                    className="mt-1"
                  />
                </label>
                <label className="block">
                  <Label>Wiadomość</Label>

                  <Textarea className="mt-1" rows={6} />
                </label>
                <div>
                  <Button type="submit">Wyślij wiadomość</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
    </div>
  );
};

export default PageContact;
