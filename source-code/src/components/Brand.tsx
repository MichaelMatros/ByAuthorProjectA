import { createClasses } from "@/utils";
import React from "react";

interface BrandProps {
  alt?: boolean;
  lg?: boolean;
  mobileOnly?: boolean;
  tabletOnly?: boolean;
  desktopOnly?: boolean;
}

function Brand({ alt, lg, mobileOnly, tabletOnly, desktopOnly }: BrandProps) {
  return (
    <div
      className={createClasses(
        "brand",
        alt && "alt",
        lg && "lg",
        mobileOnly && "mobile-only",
        tabletOnly && "tablet-only",
        desktopOnly && "desktop-only"
      )}
    >
      <span>BA</span> ByAuthor
    </div>
  );
}

export default Brand;
