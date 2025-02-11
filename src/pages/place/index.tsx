import Carousel from '@/components/carousel/Carousel';
import PageTitle from '@/components/title/PageTitle';
import styles from './index.module.scss';

const PlacePage = () => {
  const imgArr = [
    {
      url: 'https://images.unsplash.com/photo-1732565277341-ebb37d748a87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8aVVJc25WdGpCMFl8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1673288195579-c1ebd71eedff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8aVVJc25WdGpCMFl8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1589739253612-886a3481d88b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1737822896964-30bcf56a2e94?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDJ8TThqVmJMYlRSd3N8fGVufDB8fHx8fA%3D%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1738168601630-1c1f3ef5a95a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1737972970322-cc2e255021bd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1738230077816-fbab6232c545?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://plus.unsplash.com/premium_photo-1672362977605-466f3addce82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
    {
      url: 'https://images.unsplash.com/photo-1583418007992-a8e33a92e7ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGlVSXNuVnRqQjBZfHxlbnwwfHx8fHw%3D',
      alt: 'test',
    },
  ];

  return (
    <div
      data-page="intro"
      className={styles.container}
      style={{ height: '200vh', background: 'orange' }}
    >
      <PageTitle category="Place" title="약손명가 건대점" />
      <Carousel imgArr={imgArr} />
    </div>
  );
};

export default PlacePage;
