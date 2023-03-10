import React from "react";
import Space from "./Space";

function AuthTextSectionFooter() {
  return (
    <div className="flex items-end font-montserrat-alt font-light text-app-light text-[16px] leading-5">
      <div>
        Share your project and find <br /> new friends on the
        <span className="font-semibold"> new SMART</span> platform
      </div>
      <Space />
      <div>
        <a
          href="#signup"
          className="no-underline text-app-light flex items-center"
        >
          Create a profile
          <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}

export default AuthTextSectionFooter;
