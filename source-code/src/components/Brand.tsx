import { createClasses } from "@/utils";
import React, { useMemo } from "react";

interface BrandProps {
  alt?: boolean;
  lg?: boolean;
  className?: string;
}

function Brand({ alt, lg, className }: BrandProps) {
  return (
    <div
      className={createClasses(
        "brand",
        "items-center gap-[10px] font-poppins text-[16px]",
        "flex",
        alt && "brand--alt text-app-light",
        lg && "lg",
        className
      )}
    >
      <span
        className={createClasses(
          "px-[8px] py-[6px] font-semibold border-1 rounded-[10px] border",
          alt ? "border-app-light" : "border-app-dark"
        )}
      >
        BA
      </span>{" "}
      ByAuthor
    </div>
  );
}

export default Brand;
