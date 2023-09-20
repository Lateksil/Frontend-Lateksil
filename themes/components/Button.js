const sizeLg = {
  lg: {
    fontSize: 'xs',
  },
};

const sizesMd = {
  md: {
    fontSize: 'xs',
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
    fontSize: 'xx-small',
    _loading: {
      bg: 'lateksil-main',
    },
  }),
};

const variantDanger = {
  'lateksil-danger': () => ({
    ...baseVariantSolid,
    bg: 'lateksil-red',
    fontSize: 'xx-small',
    _hover: {
      bg: 'lateksil-red',
    },
    _loading: {
      bg: 'lateksil-red',
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
    ...variantDanger,
  },
};

export default Button;
