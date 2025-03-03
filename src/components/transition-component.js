"use client";

import { fadeIn } from "@/utils/motion-transition";
import { motion } from "framer-motion";

/* Se está creando un componente que va a llevar algunos argumentos para las animaciones
    de algunos de nuestros componentes */

const MotionTransition = ({ children, position, className }) => {
  return (
    <motion.div
      variants={fadeIn(position)}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MotionTransition;
