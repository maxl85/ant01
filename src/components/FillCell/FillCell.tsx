import { FC } from 'react';
import styles from './FillCell.module.css';

interface FillCellProps {
  value: number;
}

const FillCell: FC<FillCellProps> = ({ value }) => {
  const percentage = value * 10;
  let threeColor;
  if (value < 5) {
    // threeColor = styles.red;
    threeColor = styles.gray;
  } else if ( value >= 5 && value < 10) {
    // threeColor = styles.yellow;
    threeColor = styles.gray;
  } else {
    // threeColor = styles.green;
    threeColor = styles.gray;
  }
  
  return (
    <div className={threeColor} style={{maxWidth: `${percentage}%`}}>{value}</div>
  );
};

export default FillCell;