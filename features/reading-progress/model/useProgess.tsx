import { useEffect, useState, useRef } from "react";

function useProgress() {
  const [progress, setProgress] = useState(0);
  const lastProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const percentage =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      const roundedProgress = Math.floor(
        Math.min(100, Math.max(0, percentage))
      );

      if (roundedProgress !== lastProgressRef.current) {
        lastProgressRef.current = roundedProgress;
        setProgress(roundedProgress);
      }
    };

    calculateProgress();

    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        calculateProgress();
        rafIdRef.current = null;
      });
    };

    const handleResize = () => {
      calculateProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return progress;
}

export default useProgress;
