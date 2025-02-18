import { Property } from 'csstype';
import {
  colors,
  IconColorType,
  IconNameType,
  icons,
} from '@/styles/icons/iconType';

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: Property.Color | IconColorType;
  name: IconNameType;
  // onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Icon = (props: IconProps) => {
  const { size = 'md', color = '#1E1E1E', name, ...otherProps } = props;
  const IconElement = icons[name];
  const sizeMap = {
    xs: 14,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
  };
  const colorValue = colors[color as IconColorType]
    ? `var(${colors[color as IconColorType]})`
    : color;

  return (
    <div
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...otherProps}
    >
      <IconElement
        fill={colorValue}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
        }}
      />
    </div>
  );
};

export default Icon;
