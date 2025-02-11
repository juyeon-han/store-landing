import { Property } from 'csstype';
import ArrowLeft from './svg/arrowLeft.svg?react';
import ArrowRight from './svg/arrowRight.svg?react';

export const icons = {
  ArrowLeft,
  ArrowRight,
};

export type IconNameType = keyof typeof icons;

interface IconProps {
  size?: 'sm' | 'md' | 'lg';
  color?: Property.Color;
  name: IconNameType;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Icon = ({ size = 'md', color = '#1E1E1E', name, onClick }: IconProps) => {
  const IconElement = icons[name];
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  };

  return (
    <div
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <IconElement fill={color} />
    </div>
  );
};

export default Icon;
