import React from "react";
import "@style/loader.scss";
import { createClasses } from "@/utils";

interface LoaderProps {
  size?: "md" | "lg";
}

function Loader({ size }: LoaderProps) {
  createClasses();
  return (
    <div className={createClasses("loader", size && "loader--" + size)}></div>
  );
}

export default Loader;
