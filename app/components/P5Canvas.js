"use client";

import useP5 from "../hooks/useP5";
import sketch from "./P5Sketch";

const P5Canvas = () => {
  const sketchRef = useP5(sketch);
  return <div ref={sketchRef} />;
};

export default P5Canvas;
