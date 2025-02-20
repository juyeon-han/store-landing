import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { TabsType } from '@/components/tab/scroll-tab/ScrollTab';
import styles from './BasisTab.module.scss';

interface BasisTabHandle extends HTMLDivElement {}
interface BasisTabProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabsType[];
  activeTabId?: TabsType['id'];
  handleActiveTab: (id: string) => void;
}

const BasisTab = forwardRef<BasisTabHandle, BasisTabProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { tabs, activeTabId, handleActiveTab, className, ...otherProps } =
    props;

  return (
    <div ref={ref} {...otherProps} className={cx('container', className)}>
      {tabs.map((tab) => (
        <button
          className={cx('tab_btn', { active: activeTabId === tab.id })}
          key={tab.id}
          onClick={() => handleActiveTab(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
});

export default BasisTab;
