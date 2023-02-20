import React from "react";

interface BrandProps {
  alt?: boolean;
  lg?: boolean;
}

function Brand({ alt, lg }: BrandProps) {
  return (
    <div className={`brand ${alt && "alt"} ${lg && "lg"}`}>
      <span>BA</span> ByAuthor
    </div>
  );
}

export default Brand;
