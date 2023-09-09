import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e40195, #d0e);
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
};

const circleVariants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};

const rotateVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 0.5 } },
};

const boxVar = {
  hover: {
    scale: 1.5,
    rotateZ: 90,
  },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 203, 113)" },
};

function App() {
  // const biggerBoxRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  // const scale = useTransform(x, [-300, 0, 300], [2, 1, 0.1]);
  const rotateZ = useTransform(x, [-300, 300], [-360, 360]);
  const gradient = useTransform(
    x,
    [-300, 0, 300],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollY, scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  useMotionValueEvent(scrollY, "change", () => {
    console.log(scrollY.get(), scrollYProgress.get());
  });
  useMotionValueEvent(x, "change", () => {
    // console.log(scale.get());
  });
  return (
    <Wrapper style={{ background: gradient }}>
      {/* <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={1}
          dragConstraints={biggerBoxRef}
          variants={boxVar}
          whileDrag={"drag"}
          whileHover={"hover"}
          whileTap={"click"}
        ></Box>
      </BiggerBox> */}
      {/* <button onClick={() => x.set(200)}>click me</button> */}
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin></Box>
    </Wrapper>
  );
}

export default App;
