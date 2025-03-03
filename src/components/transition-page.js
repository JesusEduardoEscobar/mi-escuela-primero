"use client";

import { transitionVariantPage } from "@/utils/motion-transition";
import { AnimatePresence, motion } from "framer-motion";

/* In this component we are declaring the function that calls the props to make the 
   transitions of the page */
const TransitionPage = () => {
  return (
    <AnimatePresence mode="wait">
      <div>
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen z-30 bg-white"
          variants={transitionVariantPage}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
        ></motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransitionPage;
