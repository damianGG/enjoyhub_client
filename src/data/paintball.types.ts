import { Photo } from "@/components/GallerySlider/GallerySlider";

export interface PaintBallType {
  city: string;
  name: string;
  id: string;
  categoryName:string;
  photos:Photo[];
  category: {
    id: number;
    slug: string;
    name: string;
    };
  latitude:number;
  longitude:number;

  }
  