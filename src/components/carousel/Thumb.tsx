import React from 'react';

type PropType = {
  selected: boolean;
  src: string;
  onClick: () => void;
};

const CarouselThumb: React.FC<PropType> = (props) => {
  const { selected, src, onClick } = props;

  return (
    <div
      className={'embla-thumbs__slide'.concat(
        selected ? ' embla-thumbs__slide--selected' : ''
      )}
    >
      <button
        onClick={onClick}
        type="button"
        style={{ backgroundImage: `url(${src})` }}
        className="embla-thumbs__slide__img"
      ></button>
    </div>
  );
};

export default CarouselThumb;
