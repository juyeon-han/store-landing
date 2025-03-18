import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import ErrorImage from '@/assets/images/error_image.png';
import styles from './ProgramCard.module.scss';

interface ProgramCardHandle extends HTMLDivElement {}
interface ProgramCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgUrl?: string;
  title: string;
  text: string;
}

const ProgramCard = forwardRef<ProgramCardHandle, ProgramCardProps>(
  (props, ref) => {
    const cx = classNames.bind(styles);
    const { imgUrl, title, text, ...otherProps } = props;
    return (
      <div
        ref={ref}
        className={cx('program_card')}
        style={{
          backgroundImage: `url(${imgUrl ?? ErrorImage})`,
        }}
        {...otherProps}
      >
        <p className={cx('title')}>{title}</p>
        <p className={cx('text')}>{text}</p>
      </div>
    );
  }
);

export default ProgramCard;
