import { FC } from 'react';
import styles from './FillCell.module.css';

interface FillCellProps {
  value: number;
}

const FillCell: FC<FillCellProps> = ({ value }) => {
  const percentage = value * 4;
  let threeColor;
  if (value < 10) {
    threeColor = styles.red;
  } else if ( value >= 10 && value < 15) {
    threeColor = styles.yellow;
  } else {
    threeColor = styles.green;
  }
  
  return (
    <div className={threeColor} style={{maxWidth: `${percentage}%`}}>{value}</div>
  );
};

export default FillCell;