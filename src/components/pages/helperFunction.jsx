import { useState, useEffect } from "react";

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Run the function once to get the initial window size
    handleResize();

    // Subscribe to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      // Unsubscribe from window resize events
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this effect will only run once, like componentDidMount

  return windowSize;
}
