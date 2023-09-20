import NextImage from '../nextimage';
import Logo from '../../../assets/images/Logo_Lateksil.png';

const LogoSidebar = ({ multiplySize = 1, responsive = false }) => {
  const baseWidth = 90 * multiplySize;
  const baseHeight = 90 * multiplySize;
  return (
    <NextImage
      src={Logo}
      width={baseWidth}
      height={baseHeight}
      layout={responsive ? 'responsive' : undefined}
      priority
    />
  );
};

export default LogoSidebar;
