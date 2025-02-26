import { Property } from 'csstype';
import useBreakpoint from '@/hooks/useBreakPoint';
import {
  colors,
  IconColorType,
  IconNameType,
  icons,
} from '@/styles/icons/iconType';

type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;

interface ResponsiveSize {
  mobile?: SizeType;
  tablet?: SizeType;
  desktop?: SizeType;
}

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SizeType | ResponsiveSize;
  color?: Property.Color | IconColorType;
  name: IconNameType;
}

const sizeMap = {
  xs: 14,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 56,
};

const getSize = (size: SizeType) =>
  typeof size === 'string' ? sizeMap[size] : size;

const Icon = ({
  size = 'md',
  color = '#1E1E1E',
  name,
  className,
  ...props
}: IconProps) => {
  const breakPoint = useBreakpoint();
  const IconElement = icons[name];

  const responsiveSize: ResponsiveSize =
    typeof size === 'object' ? size : { desktop: size };

  const breakPointSize = responsiveSize[breakPoint] ?? responsiveSize.desktop;

  const colorValue = colors[color as IconColorType]
    ? `var(${colors[color as IconColorType]})`
    : color;

  return (
    <div
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className={className}
      {...props}
    >
      <IconElement
        fill={colorValue}
        style={{
          width: getSize(breakPointSize ?? 'md'),
          height: getSize(breakPointSize ?? 'md'),
        }}
      />
    </div>
  );
};

export default Icon;
