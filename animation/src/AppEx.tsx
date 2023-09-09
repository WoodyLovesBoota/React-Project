import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e40195, #d0e);
  flex-direction: column;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  font-size: 28px;
  align-items: center;
  position: absolute;
  top: 100px;
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

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 5;
  }
`;

// const boxVariants = {
//   start: { opacity: 0, scale: 0.5 },
//   end: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       duration: 0.5,
//       bounce: 0.5,
//       delayChildren: 0.5,
//       staggerChildren: 0.5,
//     },
//   },
// };

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

const svg = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: { pathLength: 1, fill: "rgba(255,255,255,1)" },
};

// const boxVariants = {
//   initial: {
//     opacity: 0,
//     scale: 0,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     rotateZ: 360,
//   },
//   leaving: { opacity: 0, scale: 0, y: 20 },
// };

const boxVariants = {
  initial: (custom: number) => ({
    x: 500 * custom,
    opacity: 0,
    scale: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: (custom: number) => ({
    x: -500 * custom,
    opacity: 0,
    scale: 0,
    transition: { duration: 0.3 },
  }),
};

function App() {
  /*
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
  */
  const [showing, setShowing] = useState(false);
  const [back, setBack] = useState(1);

  const toggleShowing = () => {
    return setShowing((prev) => !prev);
  };

  const [visible, setVisible] = useState(1);
  const prevPlease = () => {
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    setBack(-1);
  };

  const nextPlease = () => {
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    setBack(1);
  };
  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box
          custom={back}
          variants={boxVariants}
          initial={"initial"}
          animate="visible"
          exit={"exit"}
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPlease}>prev</button>

      <button onClick={nextPlease}>next</button>
    </Wrapper>
    // <Wrapper>
    //   <button onClick={toggleShowing}>Click</button>
    //   <AnimatePresence>
    //     {showing ? (
    //       <Box variants={boxVariants} initial="initial" animate="visible" exit={"leaving"} />
    //     ) : null}
    //   </AnimatePresence>
    // </Wrapper>
    // <Wrapper style={{ background: gradient }}>
    //   {/* <BiggerBox ref={biggerBoxRef}>
    //     <Box
    //       drag
    //       dragSnapToOrigin
    //       dragElastic={1}
    //       dragConstraints={biggerBoxRef}
    //       variants={boxVar}
    //       whileDrag={"drag"}
    //       whileHover={"hover"}
    //       whileTap={"click"}
    //     ></Box>
    //   </BiggerBox> */}
    //   {/* <button onClick={() => x.set(200)}>click me</button> */}
    //   <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin></Box>
    // </Wrapper>
    /*
    <Wrapper>
      <Svg xmlns="http://www.w3.org/2000/svg" height="10em" viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial={"start"}
          animate={"end"}
          transition={{ default: { duration: 5 }, fill: { duration: 2, delay: 3 } }}
          fill="transparent"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg>
    </Wrapper>
    */
  );
}

export default App;
