import { Photo } from "@/components/GallerySlider";

export interface PaintBallType {
  city: string;
  name: string;
  id: string;
  photos:Photo[];
  latitude:number;
  longitude:number;

  }
  