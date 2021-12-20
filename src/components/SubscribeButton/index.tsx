import styles from './styles.module.scss'

interface SubsicribeButtonProps{
    priceId: string;
}


export function SubsicribeButton({priceId}:SubsicribeButtonProps){
  return (

    <button
    className={styles.subsicribeButton}
    type="button"
    >
      Subsicribe Now
    </button>

  );
}