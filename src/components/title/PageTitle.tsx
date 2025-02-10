import { forwardRef } from 'react';
import styles from './PageTitle.module.scss';

interface PageTitleHandle extends HTMLDivElement {}
interface PageTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string;
  title: string;
}

const PageTitle = forwardRef<PageTitleHandle, PageTitleProps>((props, ref) => {
  const { category, title, ...otherProps } = props;
  return (
    <div className={styles.wrapper} {...otherProps} ref={ref}>
      <p className={styles.category} aria-label="category">
        {category}
      </p>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
});

export default PageTitle;
