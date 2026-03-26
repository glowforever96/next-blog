import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

function useTOC() {
  const [headingInfo, setHeadingInfo] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = document.querySelectorAll("h1, h2, h3, h4");
    const headingList: Heading[] = [];

    headingElements.forEach((element) => {
      const id = element.id;
      const text = element.textContent || "";
      const level = parseInt(element.tagName.charAt(1));

      if (id && text) {
        headingList.push({ id, text, level });
      }
    });

    setHeadingInfo(headingList);
  }, []);

  useEffect(() => {
    if (headingInfo.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    headingInfo.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headingInfo]);

  const handleClickHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return { headingInfo, activeId, handleClickHeading };
}

export default useTOC;
