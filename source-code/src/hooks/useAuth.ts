import { useEffect, useState } from "react";

export function useAuthDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [currentDialogName, setCurrentDialogName] = useState<null | string>(
    null
  );

  function canShowDialog() {
    return /^#(signin|signup)$/.test(window.location.hash);
  }

  function onHashChange() {
    setShowDialog(canShowDialog);
    setCurrentDialogName(window.location.hash.replace(/^#/, "") || null);
  }

  useEffect(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange);

    return () => {
      setShowDialog(false);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return {
    showDialog,
    currentDialogName,
  };
}
