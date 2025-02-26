import { forwardRef, useState } from 'react';
import classNames from 'classnames/bind';
import useBreakpoint from '@/hooks/useBreakPoint';
import Icon from '@/styles/icons/icons';
import styles from './Accordion.module.scss';

export interface AccordionType {
  id: string;
  question: string;
  answer: React.ReactNode;
}
interface AccordionHandle extends HTMLUListElement {}
interface AccordionProps extends React.HTMLAttributes<HTMLUListElement> {
  data: AccordionType[];
}

const Accordion = forwardRef<AccordionHandle, AccordionProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { data, className, ...otherProps } = props;
  const [openIds, setOpenIds] = useState<string[]>([]);
  const breakpoint = useBreakpoint();

  const handleToggle = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setOpenIds((prev) => [...prev, id]);
    }
  };

  return (
    <ul ref={ref} {...otherProps} className={cx('container', className)}>
      {data.map((item, idx) => {
        const isActive = openIds.includes(item.id);

        return (
          <li key={idx} className={cx('wrapper')}>
            <button
              className={cx('question')}
              onClick={() => handleToggle(item.id)}
              aria-expanded={isActive}
              aria-controls={`answer-${idx}`}
            >
              <Icon
                name="Plus"
                size={breakpoint === 'mobile' ? 'xs' : 'sm'}
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
