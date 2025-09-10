import { useEffect, useState } from "react";

export function useCSSVar(varName, fallback = "") {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    const root = document.documentElement;

    const updateValue = () => {
      const val = getComputedStyle(root).getPropertyValue(varName).trim();
      setValue(val || fallback);
    };

    updateValue();

    const observer = new MutationObserver(updateValue);
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, [varName, fallback]);

  return value;
}
