import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubsicribeButtonProps{
    priceId: string;
}


export function SubsicribeButton({priceId}:SubsicribeButtonProps){
  
  const {data:session} = useSession();

  async function handleSubsicribe(){
    if(!session){
      signIn('github')
      return
    }

    try{
      const response = await api.post('/subscribe')

      const{ sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({sessionId})

    }catch (err) { 
      alert(err.message);
    }

  }
  
  return (

    <button
    className={styles.subsicribeButton}
    type="button"
    onClick={handleSubsicribe}
    >
      Subscribe Now
    </button>

  );
}