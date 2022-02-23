import { useRouter } from 'next/router';
import { MdArrowBack } from 'react-icons/md';
import styles from './styles.module.scss';

export function BackPageButton() {
  const { back } = useRouter();

  return (
    <button className={styles.container} onClick={back}>
      <MdArrowBack size={22} color="#e2e2e6" />
      <span>Back</span>
    </button>
  );
}
