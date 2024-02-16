import { Route } from "next";

//  ######  CustomLink  ######## //
export interface CustomLink {
    label: string;
    href: Route<string> | string;
    targetBlank?: boolean;
  }