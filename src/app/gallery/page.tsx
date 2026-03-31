"use client";

import { ImageCursorTrail } from "@/components/ui/ImageCursorTrail";

const galleryImages = [
  "/images/591893248_1541215087502009_5797804274424608075_n.jpg",
  "/images/597531388_1548832826740235_5407246884671237047_n.jpg",
  "/images/599949982_1552116263078558_5665254307255416114_n.jpg",
  "/images/608170247_1563095581980626_416286650069626209_n.jpg",
  "/images/615925545_1576939500596234_262065853199998538_n.jpg",
  "/images/641333683_1611273163829534_6636370326147936327_n.jpg",
  "/images/646850877_1618580426432141_2500271091644643115_n.jpg",
  "/images/641462288_1612133350410182_8019026569665912712_n.jpg",
  "/images/656008214_1631416785148505_9113569755809809811_n.jpg",
  "/images/657264609_1638302024459981_2963671567164602229_n.jpg",
  "/images/506639864_10010176822400709_5506235592895454315_n.jpg",
];

export default function GalleryPage() {
  return (
    <>
      <ImageCursorTrail
        distance={20}
        maxNumberOfImages={6}
        items={galleryImages}
        className="h-screen w-full"
        imgClass="w-64 h-74 rounded-2xl"
        backgroundImage="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&h=1080&fit=crop"
      />
    </>
  );
}
