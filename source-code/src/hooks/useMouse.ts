import { MutableRefObject, useEffect, useRef } from "react";

export function useOutsideClick(
  ref: MutableRefObject<any>,
  callback: (e?: MouseEvent) => void
) {
  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target)) {
        callback(e);
      }
    }

    document.addEventListener("mousedown", onOutsideClick);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
    };
  }, [ref]);
}
