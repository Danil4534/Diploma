import { Link } from "react-router-dom";
import { Image } from "./ui/Image";
import { motion } from "motion/react";
import LogoIconBlack from "../assets/icons/LogoIconBlack.svg";
export const Logo = () => {
  return (
    <Link
      to="/homepage"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={LogoIconBlack} className="animate-rotate" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl whitespace-pre text-black dark:text-white font-k2d"
      >
        UNICHUB
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <Image src={LogoIconBlack} className="animate-rotate" />
    </Link>
  );
};
