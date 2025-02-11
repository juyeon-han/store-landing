import { forwardRef } from 'react';
import styles from './PromotionCard.module.scss';

interface PromotionCardHandle extends HTMLDivElement {}
export interface PromotionType {
  tag: string;
  condition: string;
  product: string;
  imgUrl: string;
}

interface PromotionCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    PromotionType {}

const PromotionCard = forwardRef<PromotionCardHandle, PromotionCardProps>(
  (props, ref) => {
    const { tag, condition, product, imgUrl, ...otherProps } = props;
    return (
      <div className={styles.wrapper} ref={ref} {...otherProps}>
        <div className={styles.tag}>{tag}</div>
        <div className={styles.content}>
          <p aria-label="promotion-condition" className={styles.condition}>
            {condition}
          </p>
          <p aria-label="promotion-condition" className={styles.product}>
            {product}
          </p>
          <img src={imgUrl} alt="promotion" className={styles.image} />
        </div>
      </div>
    );
  }
);

export default PromotionCard;
