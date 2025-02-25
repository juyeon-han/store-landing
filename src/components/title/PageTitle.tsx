import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import styles from './PageTitle.module.scss';

interface PageTitleHandle extends HTMLDivElement {}
interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string;
  title: string;
  isStore?: boolean;
}

const PageTitle = forwardRef<PageTitleHandle, PageTitleProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { category, title, isStore, ...otherProps } = props;
  return (
    <div
      className={cx('wrapper', { store: isStore })}
      {...otherProps}
      ref={ref}
    >
      <p className={cx('category')} aria-label="category">
        {category}
      </p>
      <h2 className={cx('title')}>{title}</h2>
    </div>
  );
});

export default PageTitle;
