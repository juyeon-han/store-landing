import { useNavigate } from 'react-router-dom';
import ReservationSheet from '@/reservation_sheet/components/ReservationSheet/ReservationSheet';
import styles from './index.module.scss';

const ReservationPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <ReservationSheet handleClose={() => navigate('/')} isMobile={true} />
    </div>
  );
};

export default ReservationPage;
