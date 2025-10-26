import { useEffect } from "react";

export function useAutoDismiss(onClose?: () => void, duration = 3000) {
  useEffect(() => {
    if (!onClose) return;

    const t = setTimeout(onClose, duration);

    return () => clearTimeout(t);
  }, [onClose, duration]);
}
