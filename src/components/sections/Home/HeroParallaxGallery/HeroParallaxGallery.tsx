"use client";

import { useGetFacilitiesQuery } from "../../../../Redux/api/facilities.api";
import { HeroParallax } from "../../../ui/scrolling-gallery";

export function HeroParallaxGallery() {
  const {
    data: facilities,
    // isLoading,
    // error,
  } = useGetFacilitiesQuery([{ field: "limit", value: 15 }]);
  console.log(facilities);
  return <HeroParallax products={facilities?.data} />;
}
