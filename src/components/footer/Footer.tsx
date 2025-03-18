import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { useGetPageDetail } from '@/api/service/page';
import AsyncContent from '@/components/asyncContent/AsyncContent';
import ErrorFallback from '@/components/fallback/ErrorFallback';
import FooterSkeleton from '@/components/skeleton/footer/FooterSkeleton';
import { usePageParams } from '@/hooks/usePageParams';
import styles from './Footer.module.scss';

interface FooterHandle extends HTMLDivElement {}
interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

// const text_link = [
//   {
//     id: '스타고객',
//     link: LINKS.star_customer,
//   },
//   {
//     id: '이벤트',
//     link: LINKS.event,
//   },
//   {
//     id: '고객의 소리',
//     link: LINKS.customer_voice,
//   },
//   {
//     id: '고객님의 아이디어',
//     link: LINKS.customer_idea,
//   },
// ];
// const icons_link = [
//   {
//     id: 'Facebook',
//     link: LINKS.facebook,
//   },
//   {
//     id: 'Instagram',
//     link: LINKS.instagram,
//   },
//   {
//     id: 'Cafe',
//     link: LINKS.cafe,
//   },
//   {
//     id: 'Kakaotalk',
//     link: LINKS.kakaotalk,
//   },
//   {
//     id: 'Youtube',
//     link: LINKS.youtube,
//   },
// ];
const Footer = forwardRef<FooterHandle, FooterProps>((props, ref) => {
  const cx = classNames.bind(styles);
  const { pageParams } = usePageParams();

  const {
    data: footerData,
    isPending,
    isError,
    error,
    refetch,
  } = useGetPageDetail({
    pageNum: pageParams.pageNum,
    options: {
      throwOnError: false,
    },
  });

  return (
    <footer className={cx('container')} {...props} ref={ref}>
      <AsyncContent
        isError={isError}
        isPending={isPending}
        ErrorComponent={
          <ErrorFallback error={error} resetErrorBoundary={refetch} />
        }
        PendingComponent={<FooterSkeleton />}
      >
        {footerData ? (
          <>
            <span className={cx('branch')}>{footerData?.pageBranchName}</span>
            <div className={cx('wrapper')}>
              <div className={cx('footer_top')}>
                <div>
                  <span className={cx('title')}>상담전화</span>
                  <span className={cx('text')}>
                    {footerData?.pageBranchTel} /{' '}
                    {footerData?.pageBranchOperationHours}
                  </span>
                </div>
                {/* <div className={cx('link')}>
            {text_link.map((text) => (
              <a
                key={text.id}
                href={text.link}
                target="_blank"
                rel="noreferrer"
              >
                {text.id}
              </a>
            ))}
          </div> */}
              </div>
              <hr />
              <div className={cx('footer_info')}>
                <div>
                  <div className={cx('info_item')}>
                    <span className={cx('title')}>대표</span>
                    <span className={cx('text')}>
                      {footerData?.pageOwnerName}
                    </span>
                  </div>
                  <div className={cx('info_item')}>
                    <span className={cx('title')}>개인정보관리 책임자</span>
                    <span className={cx('text')}>
                      {footerData?.pageOwnerName}
                    </span>
                  </div>
                  <div className={cx('info_item')}>
                    <span className={cx('title')}>주소</span>
                    <span className={cx('text')}>
                      {footerData?.pageBranchAddr}
                    </span>
                  </div>
                </div>
                {/* <div>
            <div className={cx('info_item')}>
              <span className={cx('title')}>사업자등록번호</span>
              <span className={cx('text')}>211-88-34433</span>
            </div>
            <div className={cx('info_item')}>
              <span className={cx('title')}>Tel</span>
              <span className={cx('text')}>02-469-7007</span>
            </div>
            <div className={cx('info_item')}>
              <span className={cx('title')}>Fax</span>
              <span className={cx('text')}>02-6052-1608</span>
            </div>
          </div>
          <div>
            <span className={cx('text')}>개인정보취급방침</span>
          </div> */}
              </div>
              <div className={cx('footer_bottom')}>
                <span className={cx('copyright')}>
                  COPYRIGHT 2025. YAKSONHEALTHCARE ALL RIGHT RESERVED
                </span>
                {/* <div className={cx('icon_btn_wrapper')}>
            {icons_link.map((icon) => (
              <a
                key={icon.id}
                className={cx('icon_btn')}
                href={icon.link}
                target="_blank"
                rel="noreferrer"
              >
                <Icon name={icon.id as IconNameType} size={40} />
              </a>
            ))}
          </div> */}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </AsyncContent>
    </footer>
  );
});

export default Footer;
