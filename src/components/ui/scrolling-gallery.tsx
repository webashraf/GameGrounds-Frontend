import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

export const HeroParallax = ({
  products,
}: {
  products: {
    name: string;
    _id: string;
    photoUrl: string;
  }[];
}) => {
  const firstRow = products?.slice(0, 4);
  const secondRow = products?.slice(4, 8);
  //   const thirdRow = products?.slice(8, 12);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.name}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.name}
            />
          ))}
        </motion.div>
        {/* <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow?.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.name}
            />
          ))}
        </motion.div> */}
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold dark:text-white">
        Explore our top fields
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Our expertise spans across various fields, ensuring we deliver tailored
        solutions that meet your unique needs. From web development and mobile
        applications to UX/UI design and cloud solutions, we are equipped to
        take on any challenge.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    name: string;
    _id: string;
    photoUrl: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.name}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        to={`/single-facility/${product._id}`}
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.photoUrl}
          alt={product.name}
          className="object-cover size-[600px] object-left-top absolute h-full w-full inset-0"
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.name}
      </h2>
    </motion.div>
  );
};
