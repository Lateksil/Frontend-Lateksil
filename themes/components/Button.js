const sizeLg = {
  lg: {
    fontSize: 'md',
  },
};

const sizesMd = {
  md: {
    fontSize: 'sm',
  },
};

const baseVariantSolid = {
  color: 'white',
};

const variantSolid = {
  'lateksil-solid': () => ({
    ...baseVariantSolid,
    bg: 'lateksil-main',
    _hover: {
      bg: 'lateksil-main-2',
    },
    _loading: {
      bg: 'lateksil-main',
    },
  }),
};

const Button = {
  sizes: {
    ...sizeLg,
    ...sizesMd,
  },
  variants: {
    ...variantSolid,
  },
};

export default Button;
