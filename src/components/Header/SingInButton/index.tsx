import styles from './styles.module.scss'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SingInButton() {
  const isUserLoggedIn = true;
  return isUserLoggedIn ? (

    <button
      className={styles.SingInButton}
      type="button"
    >
      <FaGithub color='#04d361' />
      Filipe Souza
      <FiX color='#737380' className={styles.closeIcon}/>
    </button>

  ) : (

    <button 
      className={styles.SingInButton}
      type="button"
      >
      <FaGithub color='#EBA417'/>
      Sing In With GitHub
    </button>

  )
}