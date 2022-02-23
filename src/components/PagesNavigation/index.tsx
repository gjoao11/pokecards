import Link from 'next/link';
import styles from './styles.module.scss';

interface PagesNavigationProps {
  noHome?: boolean;
  pages?: {
    link: string;
    text: string;
  }[];
  actualPageName: string;
}

export function PagesNavigation({
  noHome,
  pages,
  actualPageName,
}: PagesNavigationProps) {
  return (
    <nav className={styles.pagesNavigation}>
      {!noHome && (
        <>
          <Link href="/">
            <a>
              <span>Home</span>
            </a>
          </Link>

          <span>/</span>
        </>
      )}

      {pages?.map((page, index) => (
        <div key={index}>
          <Link href={page.link}>
            <a>
              <span>{page.text}</span>
            </a>
          </Link>

          <span>/</span>
        </div>
      ))}

      <span>{actualPageName}</span>
    </nav>
  );
}
