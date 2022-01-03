import { SetItem } from '../SetItem'
import styles from './styles.module.scss'

interface Set {
  id: string;
  name: string;
  series: string;
  total: number;
  images: {
    symbol: string;
  }
}

interface SetListProps {
  sets: Set[];
}

export function SetList({ sets }: SetListProps) {
  return (
    <div className={styles.setListContainer}>
      {sets.map(set => (
        <SetItem key={set.id} set={set} />
      ))}
    </div>
  )
}
