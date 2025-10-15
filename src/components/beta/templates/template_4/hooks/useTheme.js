import { useEffect } from "react";

export const useTheme = (styles) => {
  useEffect(() => {
    if (!styles) return;

    const root = document.documentElement;

    root.style.setProperty("--color-primary", styles.color_primary);
    root.style.setProperty("--color-secondary", styles.color_secondary);
    root.style.setProperty("--color-tertiary", styles.color_tertiary);

    if (styles.font_family) {
      root.style.setProperty("--font-family", styles.font_family);

      const linkId = "dynamic-font";
      let link = document.getElementById(linkId);

      if (!link) {
        link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }

      link.href = `https://fonts.googleapis.com/css2?family=${styles.font_family.replace(
        / /g,
        "+"
      )}:wght@400;500;700;900&display=swap`;
    }
  }, [styles]);
};