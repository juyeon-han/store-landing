import { Property } from 'csstype';
import {
  colors,
  IconColorType,
  IconNameType,
  icons,
} from '@/styles/icons/iconType';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | number;
  color?: Property.Color | IconColorType;
  name: IconNameType;
  // onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Icon = (props: IconProps) => {
  const {
    size = 'md',
    color = '#1E1E1E',
    name,
    className,
    ...otherProps
  } = props;
  const IconElement = icons[name];

  const sizeMap = {
    xs: 14,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 56,
  };
  const getSize = (size: string | number) => {
    if (typeof size === 'string') {
      return sizeMap[size as keyof typeof sizeMap]; // keyof 사용
    }
    return size;
  };
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
      {...otherProps}
    >
      <IconElement
        fill={colorValue}
        style={{
          width: getSize(size),
          height: getSize(size),
        }}
      />
    </div>
  );
};

export default Icon;
