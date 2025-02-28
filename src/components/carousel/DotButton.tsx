import React, { ComponentPropsWithRef } from 'react';

interface DotButtonProps extends ComponentPropsWithRef<'div'> {
  isSelected: boolean;
  onClick?: () => void;
}

const DotButton: React.FC<DotButtonProps> = (props) => {
  const { isSelected, onClick, ...otherProps } = props;

  return (
    <div
      className={'embla__dot'.concat(isSelected ? ' embla__dot--selected' : '')}
      onClick={onClick}
      {...otherProps}
    ></div>
  );
};

export default DotButton;
