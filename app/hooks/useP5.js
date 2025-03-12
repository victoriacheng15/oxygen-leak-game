import { useEffect, useRef } from "react";
import p5 from "p5";

const useP5 = (sketch) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    let p5Instance;

    if (sketchRef.current) {
      p5Instance = new p5(sketch, sketchRef.current);
    }

    return () => {
      p5Instance?.remove(); // Clean up p5 instance
    };
  }, [sketch]);

  return sketchRef;
};

export default useP5;
