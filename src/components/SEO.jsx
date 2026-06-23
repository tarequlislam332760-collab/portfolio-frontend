import React, { useEffect } from "react";

/**
 * Lightweight SEO component — updates document title & meta description
 * per page without extra dependencies (good for Core Web Vitals).
 */
export default function SEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
  return null;
}
