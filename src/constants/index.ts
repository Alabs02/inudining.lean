export const ImgPaths = {
  BRAND_LOGO: "/images/brand-logo.webp"
}

export const whileTapOptions = {
  whileTap: { scale: 0.9 },
  initial: { scale: 1 },
  transition: {
    scale: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.2,
      ease: "easeInOut"
    },
    duration: 0.03,
  },
};
