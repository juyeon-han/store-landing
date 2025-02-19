import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';
import Icon from '@/styles/icons/icons';
import styles from './Accordion.module.scss';

export interface AccordionType {
  question: string;
  answer: React.ReactNode;
}
interface AccordionHandle extends HTMLUListElement {}
interface AccordionProps extends React.HTMLAttributes<HTMLUListElement> {
  data: AccordionType[];
}

const Accordion = forwardRef<AccordionHandle, AccordionProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { data, ...otherProps } = props;
  const [openIds, setOpenIds] = useState<number[]>([]);

  const handleToggle = (idx: number) => {
    if (openIds.includes(idx)) {
      setOpenIds(openIds.filter((id) => id !== idx));
    } else {
      setOpenIds([...openIds, idx]);
    }
  };

  return (
    <ul ref={ref} {...otherProps} className={cx('container')}>
      {data.map((item, idx) => {
        const isActive = openIds.includes(idx);

        return (
          <li key={idx} className={cx('wrapper')}>
            <button
              className={cx('question')}
              onClick={() => handleToggle(idx)}
              aria-expanded={isActive}
              aria-controls={`answer-${idx}`}
            >
              <Icon
                name="Plus"
                size="sm"
                className={cx('icon', { active: isActive })}
              />
              <span>{item.question}</span>
            </button>
            <p
              id={`answer-${idx}`}
              className={cx('answer', { active: isActive })}
              aria-hidden={!isActive}
            >
              {item.answer}
            </p>
          </li>
        );
      })}
    </ul>
  );
});

export default Accordion;
