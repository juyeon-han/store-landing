import { Property } from 'csstype';
import ArrowLeft from './svg/arrowLeft.svg?react';
import ArrowRight from './svg/arrowRight.svg?react';
import Clock from './svg/clock.svg?react';
import Close from './svg/close.svg?react';
import Customers from './svg/customers.svg?react';
import Location from './svg/location.svg?react';
import Phone from './svg/phone.svg?react';
import Sessions from './svg/sessions.svg?react';
import Year from './svg/year.svg?react';

export const icons = {
  ArrowLeft,
  ArrowRight,
  Clock,
  Close,
  Customers,
  Location,
  Phone,
  Sessions,
  Year,
};

export type IconNameType = keyof typeof icons;

interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: Property.Color;
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
        fill={color}
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
        }}
      />
    </div>
  );
};

export default Icon;
