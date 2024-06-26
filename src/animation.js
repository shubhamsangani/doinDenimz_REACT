export const PopUPBox = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, staggerChildren: 1, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

export const FadeIn = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 1, ease: "easeInOut" },
  },
};

export const FadeInDelay = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1,
      staggerChildren: 1,
      ease: "easeInOut",
    },
  },
};

export const ZoomOut = {
  hidden: {
    scale: 1.1,
  },
  show: {
    scale: 1,
    transition: { duration: 0.5, ease: "linear" },
  },
};

export const DropDown = {
  hidden: { y: -200 },
  show: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },

  exit: {
    y: -200,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
